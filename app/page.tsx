"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import SimpleLogoIntro from "@/components/simple-logo-intro"
import Header from "@/components/header"
import StaticHero from "@/components/static-hero"
import InteractiveProjectsSection from "@/components/interactive-projects-section"
import NosotrosSection from "@/components/nosotros-section"
import ConsultoriaSection from "@/components/consultoria-section"
import ReseñasSection from "@/components/reseñas-section"
import InmobiliariaSection from "@/components/inmobiliaria-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

function HomeContent() {
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const shouldGoToContact = searchParams.get('contact') === 'true'

  useEffect(() => {
    if (shouldGoToContact) {
      // Si viene con ?contact=true, saltar la intro
      setLoading(false)
    } else {
      // Comportamiento normal con intro
      const timer = setTimeout(() => {
        setLoading(false)
      }, 2300)
      return () => clearTimeout(timer)
    }
  }, [shouldGoToContact])

  useEffect(() => {
    // Hacer scroll al formulario después de que cargue la página
    if (!loading && shouldGoToContact) {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById('contact')
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' })
          console.log('Scroll to contact executed successfully')
          // NO limpiar URL para evitar scroll hacia arriba
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [loading, shouldGoToContact])

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
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}