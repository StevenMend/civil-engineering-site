"use client"

import { useState, useEffect } from "react"

export interface Review {
  id: string
  name: string
  project: string
  location: string
  rating: number
  text: string
  createdAt: string
  isUserGenerated?: boolean
}

// Reseñas hardcodeadas originales
const defaultReviews: Review[] = [
  {
    id: "default-1",
    name: "Ana Rodríguez",
    project: "Residencia Tropical",
    location: "Heredia",
    rating: 5,
    text: "Bryner y su equipo entendieron a la perfección lo que buscábamos. El resultado es una casa que respira con el paisaje costarricense.",
    createdAt: "2024-01-15",
    isUserGenerated: false
  },
  {
    id: "default-2", 
    name: "Luis Fernández",
    project: "Concepto Hotel Boutique",
    location: "Guanacaste",
    rating: 5,
    text: "La visión de BOX para nuestro hotel boutique fue innovadora y se alineó perfectamente con el entorno natural. Su profesionalismo es sobresaliente.",
    createdAt: "2024-02-20",
    isUserGenerated: false
  }
]

export function useReviews() {
  const [userReviews, setUserReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Cargar reseñas de localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('box-architects-reviews')
      if (stored) {
        const parsed = JSON.parse(stored)
        setUserReviews(parsed)
      }
    } catch (error) {
      console.error('Error loading reviews from localStorage:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Guardar reseñas en localStorage cuando cambien
  const saveToStorage = (reviews: Review[]) => {
    try {
      localStorage.setItem('box-architects-reviews', JSON.stringify(reviews))
    } catch (error) {
      console.error('Error saving reviews to localStorage:', error)
    }
  }

  // Agregar nueva reseña
  const addReview = (reviewData: {
    name: string
    project: string
    location: string
    rating: number
    text: string
  }) => {
    const newReview: Review = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...reviewData,
      createdAt: new Date().toISOString(),
      isUserGenerated: true
    }

    const updatedReviews = [...userReviews, newReview]
    setUserReviews(updatedReviews)
    saveToStorage(updatedReviews)
    
    return newReview
  }

  // Eliminar reseña (solo las generadas por usuarios)
  const deleteReview = (reviewId: string) => {
    const updatedReviews = userReviews.filter(review => review.id !== reviewId)
    setUserReviews(updatedReviews)
    saveToStorage(updatedReviews)
  }

  // Combinar reseñas default + user, ordenadas por fecha
  const allReviews = [...defaultReviews, ...userReviews].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return {
    reviews: allReviews,
    userReviews,
    isLoading,
    addReview,
    deleteReview
  }
}