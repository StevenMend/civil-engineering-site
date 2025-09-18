"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, Quote, Plus } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useReviews } from "@/hooks/use-reviews"
import ReviewFormModal from "@/components/review-form-modal"

export default function ReseñasSection() {
  const { t } = useTranslation()
  const { reviews, isLoading, addReview } = useReviews()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddReview = (reviewData: {
    name: string
    project: string
    location: string
    rating: number
    text: string
  }) => {
    addReview(reviewData)
  }

  // Toggle para mostrar botones de eliminar - REMOVIDO para producción

  if (isLoading) {
    return (
      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-white/10 rounded mb-4 mx-auto max-w-xs"></div>
            <div className="h-4 bg-white/10 rounded mx-auto max-w-md"></div>
          </div>
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

        {/* Admin toggle - REMOVIDO - Solo para control interno */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="text-center mb-6">
            <button
              onClick={handleAdminToggle}
              className="text-xs text-gray-500 hover:text-gray-400 transition-colors"
            >
              {showDeleteButtons ? 'Hide delete buttons' : 'Show delete buttons'}
            </button>
          </div>
        )} */}

        {/* Botón para agregar reseña */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors font-micro"
          >
            <Plus className="w-4 h-4" />
            {t("reviews.addReview.button")}
          </button>
        </motion.div>

        {/* Testimonios */}
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 font-satoshi">{t("reviews.noReviews")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="bg-zinc-950 p-6 relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {/* Delete button - REMOVIDO - Solo para control interno admin */}
                {/* {showDeleteButtons && review.isUserGenerated && (
                  <button
                    onClick={() => deleteReview(review.id)}
                    className="absolute top-2 right-2 p-2 text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Eliminar reseña"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )} */}

                {/* Indicador de reseña nueva - REMOVIDO por interferir con diseño */}
                {/* {review.isUserGenerated && (
                  <div className="absolute top-4 left-4 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded font-micro uppercase tracking-wide">
                    Nueva
                  </div>
                )} */}

                <Quote className="w-8 h-8 text-white/20 mb-4" />

                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed text-sm font-satoshi">
                  "{review.text}"
                </p>

                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-bold text-white font-micro">{review.name}</h4>
                  {review.project && (
                    <p className="text-sm text-gray-400 font-satoshi">{review.project}</p>
                  )}
                  {review.location && (
                    <p className="text-xs text-gray-500 mt-1 font-satoshi">{review.location}</p>
                  )}
                  <p className="text-xs text-gray-600 mt-2 font-satoshi">
                    {new Date(review.createdAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Geometric accent */}
                <div className="absolute top-4 right-4 w-6 h-6 border-r-2 border-t-2 border-white/20" />
              </motion.div>
            ))}
          </div>
        )}

        {/* Call to action original */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <div className="bg-black p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold font-micro mb-4">{t("reviews.ctaTitle")}</h3>
            <p className="text-gray-400 mb-6 font-satoshi">{t("reviews.ctaSubtitle")}</p>
            <motion.a 
              href="#contact" 
              className="angular-button" 
              whileHover={{ y: -2 }} 
              transition={{ duration: 0.2 }}
            >
              <span>{t("reviews.ctaButton")}</span>
              <div className="angular-button-overlay" />
            </motion.a>
          </div>
        </motion.div>

        {/* Modal para agregar reseña */}
        <ReviewFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddReview}
        />
      </div>
    </section>
  )
}
