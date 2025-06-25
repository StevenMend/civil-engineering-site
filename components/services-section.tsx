"use client"

import { motion } from "framer-motion"
import { Building2, Building, Landmark, PenTool } from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

const servicesData = [
  {
    icon: Building2,
    titleKey: "services.tropicalResidential.title",
    descriptionKey: "services.tropicalResidential.description",
  },
  {
    icon: Building,
    titleKey: "services.commercial.title",
    descriptionKey: "services.commercial.description",
  },
  {
    icon: Landmark,
    titleKey: "services.institutional.title",
    descriptionKey: "services.institutional.description",
  },
  {
    icon: PenTool,
    titleKey: "services.bioclimatic.title",
    descriptionKey: "services.bioclimatic.description",
  },
]

export default function ServicesSection() {
  const { t } = useTranslation() // Use the translation hook

  return (
    <section id="services" className="py-16 px-4 bg-zinc-950 section-reveal">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-4xl font-bold font-space mb-12 text-center">{t("services.title")}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <service.icon className="w-8 h-8 mb-4 stroke-1" />
              <h3 className="text-lg font-bold font-space mb-3">{t(service.titleKey)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{t(service.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
