"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

const testimonialsData = [
  {
    id: 3,
    nameKey: "reviews.testimonial1.name",
    projectKey: "reviews.testimonial1.project",
    rating: 5,
    textKey: "reviews.testimonial1.text",
    locationKey: "reviews.testimonial1.location",
  },
  {
    id: 4,
    nameKey: "reviews.testimonial2.name",
    projectKey: "reviews.testimonial2.project",
    rating: 5,
    textKey: "reviews.testimonial2.text",
    locationKey: "reviews.testimonial2.location",
  },
]

export default function ReseñasSection() {
  const { t } = useTranslation()

  if (testimonialsData.length === 0) {
    return (
      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="section-title text-2xl md:text-4xl mb-4">{t("reviews.title")}</h2>
          <p className="text-gray-400 font-satoshi">{t("reviews.noReviews")}</p>
        </div>
      </section>
    )
  }

  return (
    <section id="reviews" className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-title text-2xl md:text-4xl mb-4">{t("reviews.title")}</h2>
          <p className="text-gray-400 max-w-3xl mx-auto font-satoshi">{t("reviews.subtitle")}</p>
        </motion.div>

        {/* Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-zinc-950 p-6 relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Quote className="w-8 h-8 text-white/20 mb-4" />

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-white text-white" />
                ))}
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-sm font-satoshi">"{t(testimonial.textKey)}"</p>

              <div className="border-t border-white/10 pt-4">
                <h4 className="font-bold text-white">{t(testimonial.nameKey)}</h4>
                <p className="text-sm text-gray-400 font-satoshi">{t(testimonial.projectKey)}</p>
                <p className="text-xs text-gray-500 mt-1 font-satoshi">{t(testimonial.locationKey)}</p>
              </div>

              {/* Geometric accent */}
              <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20" />
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="bg-black p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold font-space mb-4">{t("reviews.ctaTitle")}</h3>
            <p className="text-gray-400 mb-6 font-satoshi">{t("reviews.ctaSubtitle")}</p>
            <motion.a href="#contact" className="angular-button" whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
              <span>{t("reviews.ctaButton")}</span>
              <div className="angular-button-overlay" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}