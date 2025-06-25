"use client"

import { useTranslation } from "@/lib/i18n"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <h1 className="text-4xl md:text-5xl font-bold font-micro mb-8 text-center section-title">
            {t("privacyPolicy.title")}
          </h1>
          <div className="space-y-6 text-gray-300 font-satoshi leading-relaxed">
            <p>{t("privacyPolicy.paragraph1")}</p>
            <p>{t("privacyPolicy.paragraph2")}</p>
            <p>{t("privacyPolicy.paragraph3")}</p>
            <p>{t("privacyPolicy.paragraph4")}</p>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
