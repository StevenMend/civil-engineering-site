"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function NosotrosSection() {
  const { t } = useTranslation() // Use the translation hook

  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  }

  return (
    <section id="about-us" ref={sectionRef} className="relative bg-black py-16 md:py-24 px-4 overflow-hidden">
      <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
        <Image
          src="/images/nosotros-background.jpeg"
          alt="Tropical architecture BOX ARQUITECH"
          fill
          className="object-cover"
          quality={90}
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </motion.div>
      <div className="container mx-auto max-w-5xl relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.3 }}
        >
          <motion.div
            variants={cardVariants}
            className="bg-black/50 backdrop-blur-md p-6 md:p-7 shadow-2xl border border-white/10"
          >
            <h2 className="section-title text-2xl md:text-3xl mb-3 text-white">{t("aboutUs.missionTitle")}</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-satoshi">
              {t("aboutUs.missionText")}
            </p>
          </motion.div>

          <motion.div
            variants={cardVariants}
            className="bg-black/50 backdrop-blur-md p-6 md:p-7 shadow-2xl border border-white/10"
          >
            <h2 className="section-title text-2xl md:text-3xl mb-3 text-white">{t("aboutUs.visionTitle")}</h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed font-satoshi">{t("aboutUs.visionText")}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
