"use client"

import { useEffect, useState, useRef } from "react"
import { Loader } from "@googlemaps/js-api-loader"

interface TerrainData {
  id: number
  title: string
  price: string
  location: string
  area: string
  coordinates: { lat: number; lng: number }
}

interface UseGoogleMapsProps {
  apiKey: string
  terrains: TerrainData[]
}

export function useGoogleMaps({ apiKey, terrains }: UseGoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey,
        version: "weekly",
        libraries: ["places"]
      })

      try {
        await loader.load()
        
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 9.7489, lng: -83.7534 }, // Centro de Costa Rica
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            styles: [
              {
                featureType: "all",
                elementType: "labels",
                stylers: [{ visibility: "on" }]
              }
            ],
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true,
            zoomControl: true
          })

          setMap(mapInstance)

          // Agregar markers de terrenos
          terrains.forEach((terrain) => {
            const marker = new google.maps.Marker({
              position: terrain.coordinates,
              map: mapInstance,
              title: terrain.title,
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="#ffffff" stroke="#000000" stroke-width="2"/>
                    <circle cx="20" cy="20" r="8" fill="#000000"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
              }
            })

            // Info window para cada marker
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div style="padding: 12px; max-width: 250px; font-family: system-ui, -apple-system, sans-serif;">
                  <h3 style="margin: 0 0 8px 0; color: #000; font-size: 16px; font-weight: bold;">${terrain.title}</h3>
                  <p style="margin: 4px 0; color: #666; font-size: 14px;">${terrain.location}</p>
                  <p style="margin: 4px 0; color: #000; font-size: 18px; font-weight: bold;">${terrain.price}</p>
                  <p style="margin: 4px 0; color: #666; font-size: 14px;">${terrain.area}</p>
                </div>
              `
            })

            marker.addListener("click", () => {
              infoWindow.open(mapInstance, marker)
            })
          })

          setLoading(false)
        }
      } catch (err) {
        console.error("Error loading Google Maps:", err)
        setError("Error cargando el mapa")
        setLoading(false)
      }
    }

    if (terrains.length > 0) {
      initMap()
    }
  }, [apiKey, terrains])

  return {
    mapRef,
    map,
    loading,
    error
  }
}