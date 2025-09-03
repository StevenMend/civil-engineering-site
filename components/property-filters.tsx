"use client"

import { motion } from "framer-motion"
import { Search, SlidersHorizontal } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface PropertyFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedType: string
  setSelectedType: (type: string) => void
  priceRange: string
  setPriceRange: (range: string) => void
  location: string
  setLocation: (location: string) => void
}

export default function PropertyFilters({
  searchTerm,
  setSearchTerm,
  selectedType,
  setSelectedType,
  priceRange,
  setPriceRange,
  location,
  setLocation
}: PropertyFiltersProps) {
  const { t } = useTranslation()

  const propertyTypes = [
    { value: "all", label: t("inmobiliaria.filters.all") },
    { value: "house", label: t("inmobiliaria.propertyTypes.house") },
    { value: "land", label: t("inmobiliaria.propertyTypes.land") },
    { value: "apartment", label: t("inmobiliaria.propertyTypes.apartment") },
    { value: "commercial", label: t("inmobiliaria.propertyTypes.commercial") },
  ]

  const priceRanges = [
    { value: "all", label: t("inmobiliaria.filters.allPrices") },
    { value: "0-100k", label: "$0 - $100k" },
    { value: "100k-250k", label: "$100k - $250k" },
    { value: "250k-500k", label: "$250k - $500k" },
    { value: "500k+", label: "$500k+" },
  ]

  const locations = [
    { value: "all", label: t("inmobiliaria.filters.allLocations") },
    { value: "san-jose", label: "San José" },
    { value: "alajuela", label: "Alajuela" },
    { value: "heredia", label: "Heredia" },
    { value: "cartago", label: "Cartago" },
    { value: "guanacaste", label: "Guanacaste" },
    { value: "puntarenas", label: "Puntarenas" },
    { value: "limon", label: "Limón" },
  ]

  return (
    <motion.div
      className="bg-zinc-950 border border-white/10 rounded-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center mb-4">
        <SlidersHorizontal className="w-5 h-5 mr-2 text-white" />
        <h3 className="text-white font-space font-bold text-lg">{t("inmobiliaria.filters.title")}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <label className="block text-gray-400 text-sm font-micro uppercase mb-2">
            {t("inmobiliaria.filters.search")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("inmobiliaria.filters.searchPlaceholder")}
              className="w-full pl-10 pr-4 py-2 bg-black/50 border border-white/20 rounded text-white placeholder-gray-500 focus:outline-none focus:border-white/40 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Property Type */}
        <div>
          <label className="block text-gray-400 text-sm font-micro uppercase mb-2">
            {t("inmobiliaria.filters.propertyType")}
          </label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white focus:outline-none focus:border-white/40 transition-colors text-sm"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value} className="bg-black">
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-gray-400 text-sm font-micro uppercase mb-2">
            {t("inmobiliaria.filters.priceRange")}
          </label>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white focus:outline-none focus:border-white/40 transition-colors text-sm"
          >
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value} className="bg-black">
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-gray-400 text-sm font-micro uppercase mb-2">
            {t("inmobiliaria.filters.location")}
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded text-white focus:outline-none focus:border-white/40 transition-colors text-sm"
          >
            {locations.map((loc) => (
              <option key={loc.value} value={loc.value} className="bg-black">
                {loc.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </motion.div>
  )
}