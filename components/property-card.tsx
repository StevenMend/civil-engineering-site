"use client"

import { motion } from "framer-motion"
import { MapPin, Bed, Bath, Square, Eye } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n"

interface PropertyCardProps {
  id: string
  title: string
  price: string
  location: string
  type: "house" | "land" | "apartment" | "commercial"
  bedrooms?: number
  bathrooms?: number
  area: string
  images: string[]
  index: number
  onClick?: () => void
}

export default function PropertyCard({
  id,
  title,
  price,
  location,
  type,
  bedrooms,
  bathrooms,
  area,
  images,
  index,
  onClick
}: PropertyCardProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      className="property-card group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      onClick={onClick}
    >
      <div className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden hover:border-white/20 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={images[0] || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-3 right-3">
            <span className="bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded uppercase font-micro">
              {t(`inmobiliaria.propertyTypes.${type}`)}
            </span>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-space text-lg font-bold mb-1 line-clamp-1">
              {title}
            </h3>
            <p className="text-white/80 text-sm font-micro flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="mb-3">
            <p className="text-2xl font-bold text-white font-space">{price}</p>
          </div>

          {/* Property Details */}
          <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="flex items-center space-x-4">
              {bedrooms && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  <span>{bedrooms}</span>
                </div>
              )}
              {bathrooms && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  <span>{bathrooms}</span>
                </div>
              )}
              <div className="flex items-center">
                <Square className="w-4 h-4 mr-1" />
                <span>{area}</span>
              </div>
            </div>
            <div className="flex items-center text-white/60 group-hover:text-white transition-colors">
              <Eye className="w-4 h-4 mr-1" />
              <span className="text-xs uppercase font-micro">{t("inmobiliaria.viewDetails")}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}