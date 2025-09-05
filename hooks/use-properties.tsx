"use client"

import { useState, useEffect } from 'react'
import { propertyService } from '@/lib/supabase'

export function useProperties() {
  const [properties, setProperties] = useState([])
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true)
        
        // Obtener todas las propiedades
        const allProperties = await propertyService.getAllProperties()
        
        // Obtener propiedades destacadas
        const featured = await propertyService.getFeaturedProperties()
        
        // Usar solo datos de Supabase
        setProperties(allProperties || [])
        setFeaturedProperties(featured || [])
        
      } catch (err) {
        console.error('Error fetching properties:', err)
        setError(err.message)
        // Mantener arrays vacíos en caso de error
        setProperties([])
        setFeaturedProperties([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchProperties()
  }, [])

  // Función para refrescar datos (útil después de agregar/eliminar)
  const refetchProperties = async () => {
    try {
      const allProperties = await propertyService.getAllProperties()
      const featured = await propertyService.getFeaturedProperties()
      
      setProperties(allProperties || [])
      setFeaturedProperties(featured || [])
    } catch (err) {
      console.error('Error refetching properties:', err)
    }
  }

  return { 
    properties, 
    featuredProperties, 
    loading, 
    error,
    refetchProperties 
  }
}