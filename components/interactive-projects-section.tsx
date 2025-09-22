"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const projectsData = [
  {
    id: 1,
    titleKey: "projects.valleyRefuge.title",
    subtitleKey: "projects.valleyRefuge.subtitle",
    image: "/images/project-jungle-walkway.jpeg",
    locationKey: "projects.valleyRefuge.location",
    ctaTextKey: "projects.valleyRefuge.cta",
  },
  {
    id: 2,
    titleKey: "projects.coastalSanctuary.title",
    subtitleKey: "projects.coastalSanctuary.subtitle",
    image: "/images/project-coffee-house.jpeg",
    locationKey: "projects.coastalSanctuary.location",
    ctaTextKey: "projects.coastalSanctuary.cta",
  },
  {
    id: 3,
    titleKey: "projects.jungleNest.title",
    subtitleKey: "projects.jungleNest.subtitle",
    image: "/images/project-perforated-wall.jpeg",
    locationKey: "projects.jungleNest.location",
    ctaTextKey: "projects.jungleNest.cta",
  },
]

export default function InteractiveProjectsSection() {
  const { t } = useTranslation()
  const [currentProject, setCurrentProject] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % projectsData.length)
    }, 7000)

    return () => clearInterval(timer)
  }, [currentProject]) // Resetear el timer cada vez que currentProject cambia

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projectsData.length)
  }

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projectsData.length) % projectsData.length)
  }

  const goToProject = (index: number) => {
    setCurrentProject(index)
  }

  return (
    <section className="relative bg-black overflow-hidden py-16 md:py-24" id="projects">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-3xl md:text-4xl">{t("projects.featuredTitle")}</h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto font-satoshi">{t("projects.featuredSubtitle")}</p>
        </motion.div>

        <div className="relative h-[65vh] max-h-[700px] min-h-[450px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={projectsData[currentProject].image || "/placeholder.svg"}
                alt={t(projectsData[currentProject].titleKey)}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevProject}
            className="absolute left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-sm bg-black/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextProject}
            className="absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 backdrop-blur-sm bg-black/20 flex items-center justify-center hover:bg-white/10 transition-all duration-300 group"
            aria-label="Next project"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="p-6 md:p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  className="max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <h3 className="text-2xl md:text-3xl font-bold font-micro text-white mb-1">
                    {t(projectsData[currentProject].titleKey)}
                  </h3>
                  <p className="text-md md:text-lg text-gray-300 mb-3 font-satoshi">
                    {t(projectsData[currentProject].subtitleKey)}
                  </p>
                  <div className="text-xs text-gray-400 mb-4 font-mono uppercase tracking-wider">
                    {t(projectsData[currentProject].locationKey)}
                  </div>
                  <motion.button className="group relative overflow-hidden" whileHover={{ y: -2 }}>
                    <div className="px-6 py-2.5 border border-white/60 backdrop-blur-sm bg-black/20 hover:bg-white/10 transition-all duration-300 clip-path-angular">
                      <span className="text-white font-micro text-xs uppercase tracking-wider">
                        {t(projectsData[currentProject].ctaTextKey)}
                      </span>
                    </div>
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-2.5">
              {projectsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                    index === currentProject ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
