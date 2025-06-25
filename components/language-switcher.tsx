"use client"

import { motion } from "framer-motion"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation()

  const toggleLanguage = () => {
    const newLang = language === "en" ? "es" : "en"
    setLanguage(newLang)
  }

  return (
    <motion.button
      onClick={toggleLanguage}
      className="text-xs lg:text-sm uppercase tracking-wider text-white hover:text-gray-300 transition-colors duration-200 relative group font-micro px-2 py-1 rounded-md border border-transparent hover:border-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {language === "en" ? "Español" : "English"}
    </motion.button>
  )
}
