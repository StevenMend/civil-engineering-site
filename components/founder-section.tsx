"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function FounderSection() {
  const { t } = useTranslation() // Use the translation hook

  const founderItems = [t("founder.item1"), t("founder.item2"), t("founder.item3")]

  return (
    <section id="founder" className="py-16 px-4 section-reveal">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden">
              <Image
                src="/images/bryner-portrait-cr.png"
                alt={t("founder.name")}
                fill
                className="object-cover filter grayscale"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Geometric frame overlay */}
              <motion.div
                className="absolute inset-0 border-2 border-white/20"
                animate={{
                  borderColor: ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.4)", "rgba(255,255,255,0.2)"],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              {/* Corner geometric elements */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/30" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/30" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/30" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl md:text-4xl font-bold font-space mb-4">{t("founder.title")}</h2>
              <h3 className="text-xl font-bold font-space mb-6">{t("founder.name")}</h3>
            </div>

            <motion.blockquote
              className="text-lg italic text-gray-300 border-l-4 border-white pl-6 relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              viewport={{ once: true }}
            >
              {`"${t("founder.quote")}"`}
              {/* Geometric quote accent */}
              <motion.div
                className="absolute -left-2 top-0 w-2 h-2 bg-white"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </motion.blockquote>

            <div className="space-y-4">
              {founderItems.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-8 h-px bg-white mr-4 group-hover:w-12 transition-all duration-300"
                    whileHover={{ scaleX: 1.5 }}
                  />
                  <span className="text-sm uppercase tracking-wider group-hover:text-gray-300 transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
