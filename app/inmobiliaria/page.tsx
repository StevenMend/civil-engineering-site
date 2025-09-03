"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "@/lib/i18n"
import PropertyCard from "@/components/property-card"
import PropertyFilters from "@/components/property-filters"

// Datos de ejemplo - después los conectas con tu base de datos
const allProperties = [
  {
    id: "1",
    title: "Casa Moderna en Escazú",
    price: "$485,000",
    location: "Escazú, San José",
    type: "house" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: "280 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "2",
    title: "Terreno Vista al Valle",
    price: "$125,000",
    location: "Santa Ana, San José",
    type: "land" as const,
    area: "1,200 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "3",
    title: "Apartamento en el Centro",
    price: "$195,000",
    location: "San José Centro",
    type: "apartment" as const,
    bedrooms: 2,
    bathrooms: 1,
    area: "85 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "4",
    title: "Casa de Playa en Guanacaste",
    price: "$650,000",
    location: "Tamarindo, Guanacaste",
    type: "house" as const,
    bedrooms: 4,
    bathrooms: 3,
    area: "350 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "5",
    title: "Terreno Comercial",
    price: "$275,000",
    location: "Cartago Centro",
    type: "commercial" as const,
    area: "800 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "6",
    title: "Apartamento Vista Montaña",
    price: "$165,000",
    location: "Heredia Centro",
    type: "apartment" as const,
    bedrooms: 1,
    bathrooms: 1,
    area: "65 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "7",
    title: "Casa Estilo Colonial",
    price: "$380,000",
    location: "Alajuela Centro",
    type: "house" as const,
    bedrooms: 3,
    bathrooms: 2,
    area: "220 m²",
    images: ["/placeholder.jpg"],
  },
  {
    id: "8",
    title: "Terreno en Montaña",
    price: "$95,000",
    location: "San Ramón, Alajuela",
    type: "land" as const,
    area: "2,500 m²",
    images: ["/placeholder.jpg"],
  }
]

export default function InmobiliariaPage() {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [location, setLocation] = useState("all")

  // Filtrar propiedades
  const filteredProperties = allProperties.filter((property) => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === "all" || property.type === selectedType
    const matchesLocation = location === "all" || 
                           property.location.toLowerCase().includes(location.replace("-", " "))
    
    // Filtro básico de precio (necesitarías convertir strings a números para un filtro real)
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

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-5xl font-bold font-space mb-4">
            {t("inmobiliaria.pageTitle")}
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("inmobiliaria.pageSubtitle")}
          </p>
        </motion.div>

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
            {t("inmobiliaria.resultsFound", { count: filteredProperties.length })}
          </p>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              {...property}
              index={index}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-space font-bold mb-4">{t("inmobiliaria.noResults")}</h3>
            <p className="text-gray-400">{t("inmobiliaria.tryDifferentFilters")}</p>
          </motion.div>
        )}

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
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-white text-black font-micro uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors duration-300 rounded"
          >
            {t("inmobiliaria.contactCTA.button")}
          </a>
        </motion.div>
      </div>
    </div>
  )
}