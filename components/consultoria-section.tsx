"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { CalendarCheck, Lightbulb, MessagesSquare } from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function ConsultoriaSection() {
  const { t } = useTranslation() // Use the translation hook

  return (
    <section id="consulting" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-3xl md:text-4xl mb-5">{t("consulting.title")}</h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto font-satoshi">
            {t("consulting.subtitle")}
          </p>
          <Link href="#contact" className="angular-button">
            <span>{t("consulting.cta")}</span>
            <div className="angular-button-overlay" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-14 md:mt-16"
        >
          <h3 className="text-2xl font-bold font-space mb-7">{t("consulting.howToStartTitle")}</h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-zinc-950 p-6 service-card">
              <Lightbulb className="w-10 h-10 mb-4 stroke-1 text-white" />
              <h4 className="text-xl font-bold font-space mb-2">{t("consulting.step1Title")}</h4>
              <p className="text-gray-400 text-sm font-satoshi">{t("consulting.step1Text")}</p>
            </div>
            <div className="bg-zinc-950 p-6 service-card">
              <CalendarCheck className="w-10 h-10 mb-4 stroke-1 text-white" />
              <h4 className="text-xl font-bold font-space mb-2">{t("consulting.step2Title")}</h4>
              <p className="text-gray-400 text-sm font-satoshi">{t("consulting.step2Text")}</p>
            </div>
            <div className="bg-zinc-950 p-6 service-card">
              <MessagesSquare className="w-10 h-10 mb-4 stroke-1 text-white" />
              <h4 className="text-xl font-bold font-space mb-2">{t("consulting.step3Title")}</h4>
              <p className="text-gray-400 text-sm font-satoshi">{t("consulting.step3Text")}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
