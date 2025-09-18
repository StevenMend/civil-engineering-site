"use client"

import { useEffect } from "react"

interface MapLayersProps {
  map: google.maps.Map | null
  viewMode: string
  activeLayers: {
    legal: boolean
    services: boolean
    investment: boolean
  }
}

export default function MapLayers({ map, viewMode, activeLayers }: MapLayersProps) {
  
  // Configurar capas especiales basadas en el modo de vista
  useEffect(() => {
    if (!map) return

    // Habilitar/deshabilitar capas específicas
    if (viewMode === '3d') {
      // Forzar vista 3D más agresiva
      map.setTilt(65) // Más inclinado
      map.setZoom(Math.max(map.getZoom() || 15, 16)) // Zoom mínimo para 3D
      
      // Intentar habilitar configuraciones 3D mejoradas
      // (Google Maps 3D buildings availability varies by location)
      
      // Estilos más dramáticos para simular 3D
      const enhanced3DStyles = [
        {
          featureType: "landscape.natural.terrain",
          elementType: "geometry",
          stylers: [
            { saturation: 30 },
            { lightness: -40 },
            { gamma: 1.5 }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            { color: "#004d7a" },
            { lightness: -20 }
          ]
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.fill",
          stylers: [
            { color: "#2c5234" },
            { lightness: -10 }
          ]
        },
        // Sombras más pronunciadas para efecto 3D
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            { visibility: "on" },
            { lightness: -30 }
          ]
        }
      ]
      
      map.setOptions({ styles: enhanced3DStyles })
      
    } else {
      // Resetear estilos para otros modos
      const basicStyles = [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
      
      map.setOptions({ styles: basicStyles })
    }
    
  }, [map, viewMode])

  // Manejar capas de información adicional
  useEffect(() => {
    if (!map) return

    // TODO: Implementar capas de servicios e inversión cuando sea necesario
    // Por ahora solo manejamos la capa legal que ya está en el componente principal
    
  }, [map, activeLayers])

  return null // Este componente no renderiza nada visible
}