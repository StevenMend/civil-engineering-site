"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"
import PropertyCard from "@/components/property-card"
import PropertyFilters from "@/components/property-filters"
import PropertyAdminModal from "@/components/property-admin-modal"
import AdminButtons from "@/components/admin-buttons"
import { useProperties } from "@/hooks/use-properties"
import { useAdmin } from "@/hooks/use-admin"
import { propertyService } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function InmobiliariaPage() {
  const { t } = useTranslation()
  const { properties, loading, refetchProperties } = useProperties()
  const { isAdmin } = useAdmin()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [location, setLocation] = useState("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState(null)

  // Usar solo propiedades de Supabase
  const allProperties = properties

  // Filtrar propiedades
  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || property.type === selectedType
    const matchesLocation = location === "all" || 
                           property.location.toLowerCase().includes(location.replace("-", " "))
    
    // Filtro básico de precio
    let matchesPrice = true
    if (priceRange !== "all") {
      const priceNum = parseInt(property.price.replace(/[$,k]/g, ""))
      switch (priceRange) {
        case "0-100k":
          matchesPrice = priceNum <= 100000
          break
        case "100k-250k":
          matchesPrice = priceNum > 100000 && priceNum <= 250000
          break
        case "250k-500k":
          matchesPrice = priceNum > 250000 && priceNum <= 500000
          break
        case "500k+":
          matchesPrice = priceNum > 500000
          break
      }
    }

    return matchesSearch && matchesType && matchesLocation && matchesPrice
  })

  const handleAddProperty = () => {
    setEditingProperty(null)
    setModalOpen(true)
  }

  const handleEditProperty = (property: any) => {
    setEditingProperty(property)
    setModalOpen(true)
  }

  const handleDeleteProperty = (property: any) => {
    setPropertyToDelete(property)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (propertyToDelete) {
      try {
        await propertyService.deleteProperty(propertyToDelete.id)
        refetchProperties()
        setDeleteDialogOpen(false)
        setPropertyToDelete(null)
      } catch (error) {
        console.error('Error deleting property:', error)
      }
    }
  }

  const handleToggleFeatured = async (property: any) => {
    try {
      await propertyService.updateProperty(property.id, {
        featured: !property.featured
      })
      refetchProperties()
    } catch (error) {
      console.error('Error toggling featured:', error)
    }
  }

  const handleModalSuccess = () => {
    refetchProperties()
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-left">
              <h1 className="text-3xl md:text-5xl font-bold font-space mb-4">
                {t("inmobiliaria.pageTitle")}
              </h1>
              <p className="text-gray-400 text-lg max-w-2xl">
                {t("inmobiliaria.pageSubtitle")}
              </p>
            </div>
            
            {/* Admin Add Button - Solo aparece si isAdmin */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <AdminButtons
                  variant="add"
                  onAddProperty={handleAddProperty}
                />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Filters */}
        <PropertyFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          location={location}
          setLocation={setLocation}
        />

        {/* Results Count */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <p className="text-gray-400 font-micro uppercase text-sm">
            {loading ? "Loading properties..." : `${filteredProperties.length} ${t("inmobiliaria.stats.properties").toLowerCase()}`}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {loading ? (
            // Loading skeleton
            [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-800 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))
          ) : filteredProperties.length > 0 ? (
            filteredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                {...property}
                index={index}
                onEdit={isAdmin ? () => handleEditProperty(property) : undefined}
                onDelete={isAdmin ? () => handleDeleteProperty(property) : undefined}
                onToggleFeatured={isAdmin ? () => handleToggleFeatured(property) : undefined}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-xl font-space font-bold mb-4">{t("inmobiliaria.noResults")}</h3>
              <p className="text-gray-400">{t("inmobiliaria.tryDifferentFilters")}</p>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="bg-zinc-950 border border-white/10 rounded-lg p-8 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold font-space mb-4">{t("inmobiliaria.contactCTA.title")}</h3>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {t("inmobiliaria.contactCTA.subtitle")}
          </p>
          <Link
            href="/?contact=true"
            className="inline-flex items-center px-8 py-3 bg-white text-black font-micro uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors duration-300 rounded"
          >
            {t("inmobiliaria.contactCTA.button")}
          </Link>
        </motion.div>
      </div>

      {/* Admin Modal - Solo aparece si isAdmin */}
      {isAdmin && (
        <PropertyAdminModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleModalSuccess}
          property={editingProperty}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar Propiedad</AlertDialogTitle>
            <AlertDialogDescription>
              ¿Estás seguro de que deseas eliminar "{propertyToDelete?.title}"? 
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}