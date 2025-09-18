"use client"

import { useState, useCallback, useRef } from 'react'
import { useMapCamera } from './use-map-camera'

interface TourStop {
  id: number
  title: string
  coordinates: { lat: number; lng: number }
  zoom: number
  duration: number // tiempo en esta parada
  angle: number // ángulo de vista
}

export const useCinematicTour = (map: google.maps.Map | null, terrains: any[]) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStop, setCurrentStop] = useState(0)
  const [tourProgress, setTourProgress] = useState(0)
  const tourRef = useRef<NodeJS.Timeout | null>(null)
  const { flyToLocation } = useMapCamera(map)

  // Crear paradas del tour basadas en los terrenos
  const createTourStops = useCallback((): TourStop[] => {
    return terrains.map((terrain, index) => ({
      id: terrain.id,
      title: terrain.title,
      coordinates: terrain.coordinates,
      zoom: terrain.polygonCoords ? 17 : 16, // Más zoom si tiene polígono
      duration: 4000, // 4 segundos en cada parada
      angle: index * 45 // Diferentes ángulos para cada parada
    }))
  }, [terrains])

  const startTour = useCallback(() => {
    if (!map || terrains.length === 0) return
    
    setIsPlaying(true)
    setCurrentStop(0)
    setTourProgress(0)
    
    const stops = createTourStops()
    
    const executeTour = (stopIndex: number) => {
      if (stopIndex >= stops.length) {
        // Tour terminado, volver al inicio
        setIsPlaying(false)
        setCurrentStop(0)
        setTourProgress(100)
        return
      }

      const stop = stops[stopIndex]
      setCurrentStop(stopIndex)
      setTourProgress((stopIndex / stops.length) * 100)

      // Volar a la ubicación con animación cinematográfica
      flyToLocation({
        lat: stop.coordinates.lat,
        lng: stop.coordinates.lng,
        zoom: stop.zoom,
        tilt: 45, // Vista oblicua para efecto cinematográfico
        heading: stop.angle
      }, 2000) // 2 segundos de transición

      // Programar siguiente parada
      tourRef.current = setTimeout(() => {
        executeTour(stopIndex + 1)
      }, stop.duration)
    }

    // Empezar tour
    executeTour(0)
  }, [map, terrains, createTourStops, flyToLocation])

  const stopTour = useCallback(() => {
    if (tourRef.current) {
      clearTimeout(tourRef.current)
      tourRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const pauseTour = useCallback(() => {
    if (tourRef.current) {
      clearTimeout(tourRef.current)
      tourRef.current = null
    }
    setIsPlaying(false)
  }, [])

  const resumeTour = useCallback(() => {
    if (!isPlaying && currentStop < terrains.length) {
      startTour()
    }
  }, [isPlaying, currentStop, terrains.length, startTour])

  const jumpToStop = useCallback((stopIndex: number) => {
    const stops = createTourStops()
    if (stopIndex >= 0 && stopIndex < stops.length) {
      const stop = stops[stopIndex]
      setCurrentStop(stopIndex)
      
      flyToLocation({
        lat: stop.coordinates.lat,
        lng: stop.coordinates.lng,
        zoom: stop.zoom,
        tilt: 45,
        heading: stop.angle
      })
    }
  }, [createTourStops, flyToLocation])

  // Cleanup al desmontar
  const cleanup = useCallback(() => {
    if (tourRef.current) {
      clearTimeout(tourRef.current)
    }
  }, [])

  return {
    isPlaying,
    currentStop,
    tourProgress,
    startTour,
    stopTour,
    pauseTour,
    resumeTour,
    jumpToStop,
    cleanup,
    totalStops: terrains.length
  }
}