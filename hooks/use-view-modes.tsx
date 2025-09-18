"use client"

import { useState, useCallback } from 'react'

export type ViewMode = 'satellite' | 'terrain' | 'hybrid'

export const useViewModes = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('satellite')
  const [isTransitioning, setIsTransitioning] = useState(false)

  const changeViewMode = useCallback((
    newMode: ViewMode,
    map: google.maps.Map | null
  ) => {
    if (!map || isTransitioning) return

    setIsTransitioning(true)
    
    const modeConfig = {
      satellite: {
        mapTypeId: google.maps.MapTypeId.SATELLITE,
        tilt: 0,
        heading: 0,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      },
      terrain: {
        mapTypeId: google.maps.MapTypeId.TERRAIN,
        tilt: 0,
        heading: 0,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
          }
        ]
      },
      hybrid: {
        mapTypeId: google.maps.MapTypeId.HYBRID,
        tilt: 0,
        heading: 0,
        styles: []
      }
    }

    const config = modeConfig[newMode]
    
    // Transición suave
    setTimeout(() => {
      map.setMapTypeId(config.mapTypeId)
      map.setOptions({ styles: config.styles })
      map.setTilt(config.tilt)
      map.setHeading(config.heading)
      setViewMode(newMode)
      setIsTransitioning(false)
    }, 300)

  }, [isTransitioning])

  return {
    viewMode,
    isTransitioning,
    changeViewMode
  }
}