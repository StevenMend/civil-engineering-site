"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Building2, MapPin, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import PropertyCard from "./property-card"

// Datos de ejemplo - después los puedes conectar con tu base de datos
const featuredProperties = [
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
]

export default function InmobiliariaSection() {
  const { t } = useTranslation()

  return (
    <section id="inmobiliaria" className="py-16 px-4 bg-zinc-950 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="text-2xl md:text-4xl font-bold font-space mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("inmobiliaria.title")}
          </motion.h2>
          <motion.p
            className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("inmobiliaria.subtitle")}
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 border border-white/10 rounded-lg">
            <Home className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-bold text-white font-space">10+</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.properties")}</p>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-lg">
            <Building2 className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-bold text-white font-space">7</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.provinces")}</p>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-lg">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-bold text-white font-space">15+</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.locations")}</p>
          </div>
        </motion.div>

        {/* Featured Properties */}
        <div className="mb-12">
          <motion.h3
            className="text-xl font-bold font-space mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {t("inmobiliaria.featuredProperties")}
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                {...property}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/inmobiliaria"
            className="inline-flex items-center px-8 py-3 bg-white text-black font-micro uppercase text-sm tracking-wider hover:bg-gray-200 transition-colors duration-300 rounded group"
          >
            {t("inmobiliaria.viewAllProperties")}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}