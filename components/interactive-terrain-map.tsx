"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Loader } from "@googlemaps/js-api-loader"
import { MapPin, Shield, TrendingUp } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useTerrainData } from "@/hooks/use-terrain-data"
import MapContainer from "./map/MapContainer"
import TerrainModal from "./TerrainModal"
import DueDiligenceGuide from "./DueDiligenceGuide"

export default function InteractiveTerrainMap() {
  const { language } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [mapLoading, setMapLoading] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [selectedTerrain, setSelectedTerrain] = useState<any>(null)
  const [showDueDiligence, setShowDueDiligence] = useState(false)

  // Load terrain data from KML files
  const { terrains, loading: dataLoading, error: dataError, getTerrainTranslation } = useTerrainData(language)

  const layerStyles = {
    legal: {
      clean: { strokeColor: "#10B981", fillColor: "#10B981", fillOpacity: 0.2 },
      pending: { strokeColor: "#F59E0B", fillColor: "#F59E0B", fillOpacity: 0.2 },
      complex: { strokeColor: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.2 }
    }
  }

  // Handler functions for action buttons
  const handleDueDiligenceClick = () => {
    setShowDueDiligence(true)
  }

  const handleWhatsAppClick = async () => {
    const whatsappNumber = "+50661681784" // Box's WhatsApp
    const message = selectedTerrain 
      ? `Hola! Me interesa el terreno: ${selectedTerrain.title} (${selectedTerrain.location}). ¿Podrías darme más información?`
      : "Hola! Me interesa obtener información sobre los terrenos disponibles."
    
    // Silent notification to YOU only for tracking
    try {
      const notificationPayload = {
        type: 'whatsapp_modal_used',
        terrain: selectedTerrain?.title || 'Consulta general',
        location: selectedTerrain?.location || 'N/A',
        price: selectedTerrain?.price || 'N/A',
        area: selectedTerrain?.area || 'N/A',
        finca: selectedTerrain?.registryData?.fincaNumber || 'N/A',
        timestamp: new Date().toISOString(),
        _subject: `📱 WhatsApp Modal usado - ${selectedTerrain?.title || 'General'}`,
        _replyto: 'noreply@boxarchitects.com'
      }

      fetch('https://formspree.io/f/mrbqbqbj', { // Only to you
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPayload)
      }).catch(err => console.log('Notification error:', err))
    } catch (error) {
      console.log('Silent notification failed:', error)
    }
    
    // Continue with WhatsApp redirect to Box
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  const handleVideoClick = async () => {
    // Silent notification to YOU for video tracking
    try {
      const notificationPayload = {
        type: 'video_modal_used',
        terrain: selectedTerrain?.title || 'Consulta general',
        location: selectedTerrain?.location || 'N/A',
        timestamp: new Date().toISOString(),
        _subject: `🎥 Video Modal usado - ${selectedTerrain?.title || 'General'}`,
        _replyto: 'noreply@boxarchitects.com'
      }

      fetch('https://formspree.io/f/mrbqbqbj', { // Only to you
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationPayload)
      }).catch(err => console.log('Notification error:', err))
    } catch (error) {
      console.log('Silent notification failed:', error)
    }

    // Open video (replace with real video URL)
    const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    window.open(videoUrl, '_blank')
  }

  // Initialize Google Maps
  useEffect(() => {
    let isMounted = true

    const initMap = async () => {
      if (terrains.length === 0) return

      try {
        const loader = new Loader({
          apiKey: "AIzaSyB43q02l5WGOg37weZpzPOdc3a_MEm_fhE",
          version: "weekly",
          libraries: ["places", "geometry", "marker"]
        })

        await loader.load()
        
        if (!isMounted || !mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 10.2461, lng: -85.8097 },
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          tilt: 0,
          heading: 0,
          mapId: "terrain_map",
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        })

        if (!isMounted) return
        setMap(mapInstance)

        // Create markers and polygons for each terrain
        terrains.forEach((terrain) => {
          const markerColor = terrain.registryData.legalStatus === 'clean' ? '#10B981' : 
                             terrain.registryData.legalStatus === 'pending' ? '#F59E0B' : '#EF4444'
          
          // Create HTML element for marker
          const markerElement = document.createElement('div')
          markerElement.innerHTML = `
            <div style="
              width: 40px;
              height: 40px;
              background-color: ${markerColor};
              border: 3px solid white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            ">
              <div style="
                width: 8px;
                height: 8px;
                background-color: white;
                border-radius: 50%;
              "></div>
            </div>
          `

          // Use AdvancedMarkerElement if available
          if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
            const advancedMarker = new google.maps.marker.AdvancedMarkerElement({
              map: mapInstance,
              position: terrain.coordinates,
              content: markerElement,
              title: terrain.title
            })

            advancedMarker.addListener("click", () => {
              setSelectedTerrain(terrain)
            })
          } else {
            // Fallback to traditional marker
            const marker = new google.maps.Marker({
              position: terrain.coordinates,
              map: mapInstance,
              title: terrain.title,
              icon: {
                url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="20" r="18" fill="${markerColor}" stroke="#ffffff" stroke-width="3"/>
                    <circle cx="20" cy="20" r="8" fill="#ffffff"/>
                  </svg>
                `),
                scaledSize: new google.maps.Size(40, 40),
                anchor: new google.maps.Point(20, 20)
              }
            })

            marker.addListener("click", () => {
              setSelectedTerrain(terrain)
            })
          }

          // Create polygons
          if (terrain.polygonCoords && terrain.polygonCoords.length > 0) {
            const style = layerStyles.legal[terrain.registryData.legalStatus as keyof typeof layerStyles.legal]
            
            const terrainPolygon = new google.maps.Polygon({
              paths: terrain.polygonCoords,
              strokeColor: style.strokeColor,
              strokeOpacity: 0.8,
              strokeWeight: 3,
              fillColor: style.fillColor,
              fillOpacity: style.fillOpacity,
              map: mapInstance
            })

            terrainPolygon.addListener("click", () => {
              setSelectedTerrain(terrain)
            })
          }
        })

        if (isMounted) {
          setMapLoading(false)
        }
      } catch (err) {
        console.error("Error loading map:", err)
        if (isMounted) {
          setMapError(getTerrainTranslation('terrainMap.error'))
          setMapLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [terrains])

  // Show loading state while data is loading
  if (dataLoading) {
    return (
      <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex items-center justify-center h-96">
            <div className="text-white text-lg">Cargando datos de terrenos...</div>
          </div>
        </div>
      </section>
    )
  }

  // Show error state if data failed to load
  if (dataError) {
    return (
      <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
        <div className="container mx-auto max-w-7xl relative">
          <div className="flex items-center justify-center h-96">
            <div className="text-red-400 text-lg">{dataError}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
      <div className="container mx-auto max-w-7xl relative">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            {getTerrainTranslation('terrainMap.title')}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            {getTerrainTranslation('terrainMap.subtitle')}
          </p>
        </motion.div>

        {/* Enhanced Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <Shield className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h3 className="text-2xl font-bold text-white font-space">{terrains.length}</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{getTerrainTranslation('terrainMap.stats.verifiedTitles')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <h3 className="text-2xl font-bold text-white font-space">1</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{getTerrainTranslation('terrainMap.stats.provinces')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <h3 className="text-2xl font-bold text-white font-space">100%</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{getTerrainTranslation('terrainMap.stats.premiumLocations')}</p>
          </div>
        </motion.div>

        {/* Map Container */}
        <MapContainer map={map} loading={mapLoading} error={mapError}>
          <div 
            ref={mapRef} 
            className="w-full h-[70vh] min-h-[500px] rounded-3xl scroll-container"
          />
        </MapContainer>

        {/* Enhanced Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-green-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">{getTerrainTranslation('terrainMap.legend.cleanTitle')}</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">{getTerrainTranslation('terrainMap.legend.inProcess')}</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">{getTerrainTranslation('terrainMap.legend.requiresReview')}</span>
            </div>
          </div>
        </div>

        {/* Modular Terrain Modal */}
        {selectedTerrain && (
          <TerrainModal
            selectedTerrain={selectedTerrain}
            onClose={() => setSelectedTerrain(null)}
            onDueDiligenceClick={handleDueDiligenceClick}
            onWhatsAppClick={handleWhatsAppClick}
            onVideoClick={handleVideoClick}
            getTerrainTranslation={getTerrainTranslation}
          />
        )}

        {/* DueDiligenceGuide Component */}
        <DueDiligenceGuide 
          isOpen={showDueDiligence}
          onClose={() => setShowDueDiligence(false)}
          selectedTerrain={selectedTerrain}
        />
      </div>
    </section>
  )
}