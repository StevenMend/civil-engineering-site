"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Thermometer, Mountain, Users, Heart } from "lucide-react"
import { ProvinceData } from "@/hooks/use-province-data"
import Image from "next/image"

interface ProvinceCarouselModalProps {
  isOpen: boolean
  onClose: () => void
  province: ProvinceData | undefined
}

const categoryIcons = {
  climate: Thermometer,
  geography: Mountain,
  culture: Heart,
  social: Users
}

const categoryColors = {
  climate: "bg-blue-500",
  geography: "bg-green-500", 
  culture: "bg-purple-500",
  social: "bg-orange-500"
}

export default function ProvinceCarouselModal({ isOpen, onClose, province }: ProvinceCarouselModalProps) {
  if (!province) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 overflow-hidden bg-black border-zinc-800">
        {/* Header */}
        <div className="relative p-6 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">{province.name}</h2>
                <p className="text-gray-400 text-sm">{province.description}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-zinc-800"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="flex-1 p-6">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {province.photos.map((photo) => {
                const IconComponent = categoryIcons[photo.category]
                return (
                  <CarouselItem key={photo.id} className="h-full">
                    <div className="flex flex-col h-full space-y-4">
                      {/* Image */}
                      <div className="relative flex-1 rounded-lg overflow-hidden bg-zinc-900">
                        <Image
                          src={photo.url}
                          alt={photo.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            // Fallback placeholder
                            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                              <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100%" height="100%" fill="#27272a"/>
                                <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" 
                                      fill="#71717a" text-anchor="middle" dy=".3em">
                                  ${photo.title}
                                </text>
                              </svg>
                            `)}`
                          }}
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <Badge className={`${categoryColors[photo.category]} text-white border-0 flex items-center space-x-1`}>
                            <IconComponent className="w-3 h-3" />
                            <span className="capitalize">{photo.category}</span>
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">{photo.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{photo.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            
            <CarouselPrevious className="left-4 bg-black/50 border-zinc-700 text-white hover:bg-black/70" />
            <CarouselNext className="right-4 bg-black/50 border-zinc-700 text-white hover:bg-black/70" />
          </Carousel>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-zinc-800">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-400">
              {province.photos.length} fotos disponibles
            </div>
            <Button 
              onClick={onClose}
              className="bg-white text-black hover:bg-gray-200"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}