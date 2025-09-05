"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Home, Building2, MapPin, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import PropertyCard from "./property-card"
import AdminButtons from "./admin-buttons"
import PropertyAdminModal from "./property-admin-modal"
import { useProperties } from "@/hooks/use-properties"
import { useAdmin } from "@/hooks/use-admin"

export default function InmobiliariaSection() {
  const { t } = useTranslation()
  const { featuredProperties, properties, loading, refetchProperties } = useProperties()
  const { isAdmin } = useAdmin()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  // Usar solo propiedades de Supabase
  const displayProperties = featuredProperties.length > 0 ? featuredProperties : []
  const totalProperties = properties.length
  const uniqueLocations = new Set(properties.map(property => property.location)).size

  const handleAddProperty = () => {
    setEditingProperty(null)
    setModalOpen(true)
  }

  const handleEditProperty = (property: any) => {
    setEditingProperty(property)
    setModalOpen(true)
  }

  const handleModalSuccess = () => {
    refetchProperties()
  }

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
            <h3 className="text-2xl font-bold text-white font-space">{totalProperties}</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.properties")}</p>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-lg">
            <Building2 className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-bold text-white font-space">7</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.provinces")}</p>
          </div>
          <div className="text-center p-6 border border-white/10 rounded-lg">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
            <h3 className="text-2xl font-bold text-white font-space">{uniqueLocations}</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t("inmobiliaria.stats.locations")}</p>
          </div>
        </motion.div>

        {/* Featured Properties */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <motion.h3
              className="text-xl font-bold font-space text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {t("inmobiliaria.featuredProperties")}
            </motion.h3>

            {/* Admin Add Button - Solo aparece si isAdmin */}
            {isAdmin && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <AdminButtons
                  variant="add"
                  onAddProperty={handleAddProperty}
                />
              </motion.div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              // Skeleton loading
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-800 animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-700 rounded animate-pulse w-1/2"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                </div>
              ))
            ) : displayProperties.length > 0 ? (
              displayProperties.map((property, index) => (
                <PropertyCard
                  key={property.id}
                  {...property}
                  index={index}
                  onEdit={isAdmin ? () => handleEditProperty(property) : undefined}
                  onDelete={isAdmin ? () => {
                    // TODO: Implementar confirmación de eliminación
                    console.log('Delete property:', property.id)
                  } : undefined}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-gray-400">No featured properties available</p>
              </div>
            )}
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

      {/* Admin Modal - Solo aparece si isAdmin */}
      {isAdmin && (
        <PropertyAdminModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={handleModalSuccess}
          property={editingProperty}
        />
      )}
    </section>
  )
}