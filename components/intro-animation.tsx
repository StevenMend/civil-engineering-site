"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export default function IntroAnimation() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    // Paso 1: Punto inicial
    // Paso 2: Círculo que crece
    // Paso 3: Transformación a logo
    // Paso 4: Texto aparece
    const timer1 = setTimeout(() => setStep(2), 800)
    const timer2 = setTimeout(() => setStep(3), 1600)
    const timer3 = setTimeout(() => setStep(4), 2400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [])

  return (
    <motion.div
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Paso 1: Punto inicial */}
        {step === 1 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-2 h-2 bg-white rounded-full"
            style={{ filter: "drop-shadow(0 0 5px white)" }}
          />
        )}

        {/* Paso 2: Círculo que crece */}
        {step === 2 && (
          <motion.div
            initial={{ scale: 0.1 }}
            animate={{ scale: [0.1, 1, 1.1, 1] }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="w-32 h-32 border-2 border-white rounded-full"
            style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))" }}
          />
        )}

        {/* Paso 3: Transformación a logo */}
        {step >= 3 && (
          <motion.div
            initial={step === 3 ? { scale: 1, opacity: 0 } : { scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="stroke-white fill-none stroke-2"
              initial={{ opacity: step === 3 ? 0 : 1 }}
              animate={{ opacity: 1 }}
            >
              {/* Forma angular del logo - simplificada */}
              <motion.path
                d="M60 20 L100 40 L80 100 L20 80 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              <motion.path
                d="M60 40 L80 50 L70 80 L40 70 Z"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
              />
            </motion.svg>
          </motion.div>
        )}

        {/* Paso 4: Texto aparece */}
        {step >= 4 && (
          <motion.div
            className="absolute top-full mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 className="text-4xl font-bold tracking-wider text-white font-micro">BOX</motion.h1>
            <motion.h2 className="text-2xl font-bold tracking-wider text-white font-micro mt-2">ARCHITECTS</motion.h2>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
