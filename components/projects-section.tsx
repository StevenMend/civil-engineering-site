"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

const projects = [
  {
    id: 1,
    titleKey: "projects.valleyRefuge.title",
    locationKey: "projects.valleyRefuge.location",
    year: "2023",
    image: "/images/casa-tropical-escazu.png",
    descriptionKey: "projects.valleyRefuge.subtitle", // Reusing subtitle as description for this component
  },
  {
    id: 2,
    titleKey: "projects.coastalSanctuary.title",
    locationKey: "projects.coastalSanctuary.location",
    year: "2022",
    image: "/images/torre-santa-ana.png",
    descriptionKey: "projects.coastalSanctuary.subtitle", // Reusing subtitle as description for this component
  },
]

export default function ProjectsSection() {
  const { t } = useTranslation() // Use the translation hook

  return (
    <section id="projects" className="py-16 px-4 section-reveal">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-end mb-12">
          <motion.h2
            className="text-2xl md:text-4xl font-bold font-space"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {t("projects.featuredTitle")}
          </motion.h2>
          <motion.button
            className="flex items-center text-sm uppercase tracking-wider hover:text-gray-300 transition-colors"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ x: 5 }}
          >
            {t("learn.exploreMore")} {/* Reusing "Explore More" for "View All" */}
            <ArrowRight className="ml-2 w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative aspect-square overflow-hidden mb-6">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={t(project.titleKey)}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500"></div>

                {/* Geometric overlay on hover */}
                <motion.div
                  className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 transition-all duration-500"
                  whileHover={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  }}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold font-space group-hover:text-gray-300 transition-colors">
                  {t(project.titleKey)}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{t(project.descriptionKey)}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{t(project.locationKey)}</span>
                  <span className="font-mono">{project.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
