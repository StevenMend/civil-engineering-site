"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import ShineButton from "./shine-button" // Import the new ShineButton
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function StaticHero() {
  const { t } = useTranslation() // Use the translation hook

  const titleVariants = {
    initial: { y: "110%" },
    animate: {
      y: "0%",
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
  }

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/main-hero-background.jpeg"
          alt="Architectural corridor with jungle view"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 px-4 text-left max-w-4xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-micro text-white leading-tight drop-shadow-lg hero-title"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block" variants={titleVariants}>
              {t("hero.title1")}
            </motion.span>
          </div>
          <div className="overflow-hidden py-1">
            <motion.span className="inline-block text-gray-300" variants={titleVariants}>
              {t("hero.title2")}
            </motion.span>
          </div>
        </motion.h1>

        {/* Discreet Contact Us Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mt-8"
        >
          <ShineButton href="#contact" text={t("hero.contactUs")} />
        </motion.div>
      </div>
    </section>
  )
}
