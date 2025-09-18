"use client"

import { useCallback, useRef } from 'react'

interface CameraPosition {
  lat: number
  lng: number
  zoom: number
  tilt?: number
  heading?: number
}

export const useMapCamera = (map: google.maps.Map | null) => {
  const animationRef = useRef<NodeJS.Timeout | null>(null)

  const flyToLocation = useCallback((
    target: CameraPosition,
    duration: number = 2000
  ) => {
    if (!map) return

    const start = {
      lat: map.getCenter()?.lat() || 0,
      lng: map.getCenter()?.lng() || 0,
      zoom: map.getZoom() || 15,
      tilt: map.getTilt() || 0,
      heading: map.getHeading() || 0
    }

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function para movimiento suave
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

      const easedProgress = easeInOutCubic(progress)

      // Interpolación suave entre start y target
      const current = {
        lat: start.lat + (target.lat - start.lat) * easedProgress,
        lng: start.lng + (target.lng - start.lng) * easedProgress,
        zoom: start.zoom + (target.zoom - start.zoom) * easedProgress,
        tilt: start.tilt + ((target.tilt || 0) - start.tilt) * easedProgress,
        heading: start.heading + ((target.heading || 0) - start.heading) * easedProgress
      }

      map.setCenter({ lat: current.lat, lng: current.lng })
      map.setZoom(current.zoom)
      map.setTilt(current.tilt)
      map.setHeading(current.heading)

      if (progress < 1) {
        animationRef.current = setTimeout(animate, 16) // 60fps
      }
    }

    if (animationRef.current) {
      clearTimeout(animationRef.current)
    }
    animate()
  }, [map])

  const enable3DView = useCallback(() => {
  console.log('🎯 enable3DView ejecutándose...')
  if (!map) {
    console.log('❌ No hay mapa disponible')
    return
  }
  console.log('📍 Posición actual:', map.getCenter()?.lat(), map.getCenter()?.lng())
  flyToLocation({
    lat: map.getCenter()?.lat() || 0,
    lng: map.getCenter()?.lng() || 0,
    zoom: Math.max(map.getZoom() || 15, 18), // Zoom más alto
    tilt: 60, // Más inclinación
    heading: 45 // Más rotación
  })
}, [map, flyToLocation])

  const resetView = useCallback(() => {
    if (!map) return
    flyToLocation({
      lat: map.getCenter()?.lat() || 0,
      lng: map.getCenter()?.lng() || 0,
      zoom: map.getZoom() || 15,
      tilt: 0,
      heading: 0
    })
  }, [map, flyToLocation])

  return {
    flyToLocation,
    enable3DView,
    resetView
  }
}