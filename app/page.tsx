"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SimpleLogoIntro from "@/components/simple-logo-intro"
import Header from "@/components/header"
import StaticHero from "@/components/static-hero"
import InteractiveProjectsSection from "@/components/interactive-projects-section"
import NosotrosSection from "@/components/nosotros-section"
import ConsultoriaSection from "@/components/consultoria-section"
import ReseñasSection from "@/components/reseñas-section"
import InmobiliariaSection from "@/components/inmobiliaria-section"
// Removed AprenderSection import
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <AnimatePresence>
        {loading ? (
          <SimpleLogoIntro key="intro" />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-black text-white"
          >
            <Header />
            <main>
              <StaticHero />
              <InteractiveProjectsSection />
              <NosotrosSection />
              <ConsultoriaSection />
              <ReseñasSection />
              <InmobiliariaSection />
              {/* Removed AprenderSection */}
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}