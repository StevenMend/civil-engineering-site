"use client"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { propertyService } from "@/lib/supabase"
import { Upload, X, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface PropertyAdminModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  property?: any
}

export default function PropertyAdminModal({ isOpen, onClose, onSuccess, property }: PropertyAdminModalProps) {
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadedImages, setUploadedImages] = useState<string[]>(property?.images || [])
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    title: property?.title || "",
    price: property?.price || "",
    location: property?.location || "",
    type: property?.type || "house",
    bedrooms: property?.bedrooms || "",
    bathrooms: property?.bathrooms || "",
    area: property?.area || "",
    description: property?.description || "",
    featured: property?.featured || false
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    const newImages: string[] = []

    try {
      for (const file of Array.from(files)) {
        // Validar tipo de archivo
        if (!file.type.startsWith('image/')) {
          alert('Solo se permiten archivos de imagen')
          continue
        }

        // Validar tamaño (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          alert('La imagen debe ser menor a 5MB')
          continue
        }

        // Generar nombre único
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        // Subir a Supabase Storage
        const publicUrl = await propertyService.uploadImage(file, fileName)
        newImages.push(publicUrl)
      }

      setUploadedImages([...uploadedImages, ...newImages])
    } catch (error) {
      console.error('Error uploading images:', error)
      alert('Error subiendo imágenes. Inténtalo de nuevo.')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (indexToRemove: number) => {
    setUploadedImages(uploadedImages.filter((_, index) => index !== indexToRemove))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (uploadedImages.length === 0) {
      alert('Debes subir al menos una imagen')
      return
    }

    setLoading(true)

    try {
      const propertyData = {
        ...formData,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        images: uploadedImages
      }

      if (property) {
        await propertyService.updateProperty(property.id, propertyData)
      } else {
        await propertyService.createProperty(propertyData)
      }

      onSuccess()
      onClose()
      
      // Reset form
      setFormData({
        title: "", price: "", location: "", type: "house",
        bedrooms: "", bathrooms: "", area: "", description: "", featured: false
      })
      setUploadedImages([])
      
    } catch (error) {
      console.error('Error saving property:', error)
      alert('Error guardando la propiedad. Verifica todos los campos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-white/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-space text-white">
            {property ? "Editar Propiedad" : "Nueva Propiedad"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Subir Imágenes */}
          <div className="space-y-4">
            <Label className="text-white">Imágenes de la Propiedad</Label>
            
            <div className="border border-white/20 rounded-lg p-4 bg-zinc-900">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                multiple
                accept="image/*"
                className="hidden"
              />
              
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                {uploading ? (
                  "Subiendo..."
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Subir Imágenes
                  </>
                )}
              </Button>
              
              {/* Preview de imágenes */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {uploadedImages.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={imageUrl}
                        alt={`Preview ${index + 1}`}
                        width={150}
                        height={100}
                        className="object-cover rounded border border-white/20"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Información básica */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">Título</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="price" className="text-white">Precio</Label>
              <Input
                id="price"
                placeholder="$485,000"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location" className="text-white">Ubicación</Label>
              <Input
                id="location"
                placeholder="Escazú, San José"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="type" className="text-white">Tipo</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                <SelectTrigger className="bg-zinc-900 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-white/20 text-white">
                  <SelectItem value="house">Casa</SelectItem>
                  <SelectItem value="apartment">Apartamento</SelectItem>
                  <SelectItem value="land">Terreno</SelectItem>
                  <SelectItem value="commercial">Comercial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="bedrooms" className="text-white">Habitaciones</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="bathrooms" className="text-white">Baños</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
            <div>
              <Label htmlFor="area" className="text-white">Área</Label>
              <Input
                id="area"
                placeholder="280 m²"
                value={formData.area}
                onChange={(e) => setFormData({...formData, area: e.target.value})}
                required
                className="bg-zinc-900 border-white/20 text-white"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description" className="text-white">Descripción</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="bg-zinc-900 border-white/20 text-white"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData({...formData, featured: e.target.checked})}
              className="rounded border-white/20"
            />
            <Label htmlFor="featured" className="text-white">Propiedad destacada</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t border-white/20">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={loading || uploading}
              className="bg-white text-black hover:bg-gray-200"
            >
              {loading ? "Guardando..." : (property ? "Actualizar" : "Crear")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
