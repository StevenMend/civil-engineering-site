"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SimpleLogoIntro() {
  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }} // Show for 1.5s, then fade out
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative w-32 h-32 md:w-40 md:h-40" // Slightly larger for better presence
      >
        <Image
          src="/images/BOX LOGO BLANCO.png" // Using the new logo mark
          alt="BOX ARQUITECH Logo Mark"
          fill
          className="object-contain"
          priority
        />
      </motion.div>
    </motion.div>
  )
}
