"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Star } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface ReviewFormModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (review: {
    name: string
    project: string
    location: string
    rating: number
    text: string
  }) => void
}

export default function ReviewFormModal({ isOpen, onClose, onSubmit }: ReviewFormModalProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    project: "",
    location: "",
    rating: 5,
    text: ""
  })

  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.text.trim()) {
      return
    }
    
    onSubmit(formData)
    setFormData({
      name: "",
      project: "",
      location: "",
      rating: 5,
      text: ""
    })
    onClose()
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-zinc-900 border border-white/20 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-micro">
                  {t("reviews.addReview.title")}
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-400 text-sm mt-2 font-satoshi">
                {t("reviews.addReview.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Rating */}
              <div>
                <label className="block text-white text-sm font-medium mb-3 font-micro">
                  {t("reviews.addReview.rating")}
                </label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingClick(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 transition-transform hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 transition-colors ${
                          star <= (hoveredRating || formData.rating)
                            ? "fill-white text-white" 
                            : "text-gray-600 hover:text-gray-400"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 font-micro">
                  {t("reviews.addReview.name")} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-zinc-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none font-satoshi"
                  placeholder={t("reviews.addReview.namePlaceholder")}
                  required
                />
              </div>

              {/* Project */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 font-micro">
                  {t("reviews.addReview.project")}
                </label>
                <input
                  type="text"
                  value={formData.project}
                  onChange={(e) => setFormData(prev => ({ ...prev, project: e.target.value }))}
                  className="w-full bg-zinc-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none font-satoshi"
                  placeholder={t("reviews.addReview.projectPlaceholder")}
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 font-micro">
                  {t("reviews.addReview.location")}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full bg-zinc-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none font-satoshi"
                  placeholder={t("reviews.addReview.locationPlaceholder")}
                />
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-white text-sm font-medium mb-2 font-micro">
                  {t("reviews.addReview.review")} *
                </label>
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  rows={4}
                  className="w-full bg-zinc-800 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-white/40 focus:outline-none resize-none font-satoshi"
                  placeholder={t("reviews.addReview.reviewPlaceholder")}
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-transparent border border-white/20 text-white py-3 px-4 rounded-lg font-medium hover:bg-white/5 transition-colors font-micro"
                >
                  {t("reviews.addReview.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={!formData.name.trim() || !formData.text.trim()}
                  className="flex-1 bg-white text-black py-3 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-micro"
                >
                  {t("reviews.addReview.submit")}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}