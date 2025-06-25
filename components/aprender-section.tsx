"use client"

import { motion } from "framer-motion"
import { BookOpen, Lightbulb, Sparkles } from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function AprenderSection() {
  const { t } = useTranslation() // Use the translation hook

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  const items = [
    {
      icon: BookOpen,
      titleKey: "learn.articles.title",
      descriptionKey: "learn.articles.description",
    },
    {
      icon: Lightbulb,
      titleKey: "learn.ideas.title",
      descriptionKey: "learn.ideas.description",
    },
    {
      icon: Sparkles,
      titleKey: "learn.creativeProcesses.title",
      descriptionKey: "learn.creativeProcesses.description",
    },
  ]

  return (
    <section id="learn" className="py-16 md:py-24 px-4 bg-zinc-950">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-title text-3xl md:text-4xl mb-4">{t("learn.title")}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto font-satoshi">{t("learn.subtitle")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black p-6 md:p-7 border border-white/10 shadow-lg"
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: index * 0.15 }}
            >
              <item.icon className="w-10 h-10 mb-4 text-white stroke-1" />
              <h3 className="text-xl font-bold font-micro mb-3">{t(item.titleKey)}</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-satoshi">{t(item.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <motion.a href="#" className="angular-button" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
            <span>{t("learn.exploreMore")}</span>
            <div className="angular-button-overlay" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
