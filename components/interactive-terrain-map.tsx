"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from "@googlemaps/js-api-loader"
import { 
  MapPin, 
  Shield,
  TrendingUp,
  X,
  FileText
} from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import MapContainer from "./map/MapContainer"

export default function InteractiveTerrainMap() {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTerrain, setSelectedTerrain] = useState<any>(null)

  // Enhanced terrain data using translations
  const terrains = useMemo(() => [
    {
      id: 1,
      title: t('terrains.vistaAlMar.title'),
      price: t('terrains.vistaAlMar.price'),
      location: t('terrains.vistaAlMar.location'),
      area: t('terrains.vistaAlMar.area'),
      coordinates: { lat: 10.2989, lng: -85.8377 },
      registryData: {
        fincaNumber: "N/A",
        province: "Guanacaste",
        owner: "Disponible",
        status: t('terrains.vistaAlMar.status'),
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: t('terrains.vistaAlMar.investmentData.potential'),
        zoning: t('terrains.vistaAlMar.investmentData.zoning'),
        access: t('terrains.vistaAlMar.investmentData.access')
      },
      amenities: {
        security: t('terrains.vistaAlMar.amenities.security'),
        beachAccess: t('terrains.vistaAlMar.amenities.beachAccess'),
        utilities: t('terrains.vistaAlMar.amenities.utilities'),
        infrastructure: t('terrains.vistaAlMar.amenities.infrastructure')
      },
      boxGuarantee: [
        t('terrainModal.guarantee1'),
        t('terrainModal.guarantee2'), 
        t('terrainModal.guarantee3')
      ]
    },
    {
      id: 2,
      title: t('terrains.montaña.title'),
      price: t('terrains.montaña.price'), 
      location: t('terrains.montaña.location'),
      area: t('terrains.montaña.area'),
      coordinates: { lat: 10.3181, lng: -84.8066 },
      registryData: {
        fincaNumber: "N/A",
        province: "Puntarenas",
        owner: "Disponible",
        status: t('terrains.montaña.status'),
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: t('terrains.montaña.investmentData.potential'),
        zoning: t('terrains.montaña.investmentData.zoning'),
        access: t('terrains.montaña.investmentData.access')
      },
      amenities: {
        security: t('terrains.montaña.amenities.security'),
        beachAccess: t('terrains.montaña.amenities.beachAccess'),
        utilities: t('terrains.montaña.amenities.utilities'),
        infrastructure: t('terrains.montaña.amenities.infrastructure')
      },
      boxGuarantee: [
        t('terrainModal.guarantee1'),
        t('terrainModal.guarantee2'), 
        t('terrainModal.guarantee3')
      ]
    },
    {
      id: 3,
      title: t('terrains.comercial.title'),
      price: t('terrains.comercial.price'),
      location: t('terrains.comercial.location'), 
      area: t('terrains.comercial.area'),
      coordinates: { lat: 10.6339, lng: -85.4378 },
      registryData: {
        fincaNumber: "N/A",
        province: "Guanacaste",
        owner: "Disponible",
        status: t('terrains.comercial.status'),
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: t('terrains.comercial.investmentData.potential'),
        zoning: t('terrains.comercial.investmentData.zoning'),
        access: t('terrains.comercial.investmentData.access')
      },
      amenities: {
        security: t('terrains.comercial.amenities.security'),
        beachAccess: t('terrains.comercial.amenities.beachAccess'),
        utilities: t('terrains.comercial.amenities.utilities'),
        infrastructure: t('terrains.comercial.amenities.infrastructure')
      },
      boxGuarantee: [
        t('terrainModal.guarantee1'),
        t('terrainModal.guarantee2'), 
        t('terrainModal.guarantee3')
      ]
    },
    {
      id: 4,
      title: t('terrains.nahua.title'),
      price: t('terrains.nahua.price'),
      location: t('terrains.nahua.location'),
      area: t('terrains.nahua.area'),
      coordinates: { lat: 10.188141082943494, lng: -85.48396519145061 },
      registryData: {
        fincaNumber: "En proceso",
        province: "Guanacaste",
        owner: "Disponible",
        status: t('terrains.nahua.status'),
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: t('terrains.nahua.investmentData.potential'),
        zoning: t('terrains.nahua.investmentData.zoning'),
        access: t('terrains.nahua.investmentData.access')
      },
      amenities: {
        security: t('terrains.nahua.amenities.security'),
        beachAccess: t('terrains.nahua.amenities.beachAccess'),
        utilities: t('terrains.nahua.amenities.utilities'),
        infrastructure: t('terrains.nahua.amenities.infrastructure')
      },
      boxGuarantee: [
        t('terrainModal.guarantee1'),
        t('terrainModal.guarantee2'), 
        t('terrainModal.guarantee3')
      ],
      polygonCoords: [
        { lat: 10.18853778755592, lng: -85.48364138223889 },
        { lat: 10.18840043260947, lng: -85.48379575335082 },
        { lat: 10.1883099628453, lng: -85.48391442752035 },
        { lat: 10.18835001032831, lng: -85.483993758708 },
        { lat: 10.18854263164778, lng: -85.48408519199698 },
        { lat: 10.18829737880154, lng: -85.48465345969962 },
        { lat: 10.18762865740657, lng: -85.48437379269657 },
        { lat: 10.1877026494401, lng: -85.48425685558972 },
        { lat: 10.18774405653818, lng: -85.48419558185299 },
        { lat: 10.18778835721122, lng: -85.48413409703647 },
        { lat: 10.18784953309344, lng: -85.48403769810834 },
        { lat: 10.18792664126273, lng: -85.48393624839156 },
        { lat: 10.18798467183115, lng: -85.48386621064941 },
        { lat: 10.18805078657644, lng: -85.48381156027217 },
        { lat: 10.18817254887971, lng: -85.48373846467294 },
        { lat: 10.18829717908861, lng: -85.48366262229905 },
        { lat: 10.18841842031046, lng: -85.48363495878812 },
        { lat: 10.18853778755592, lng: -85.48364138223889 }
      ]
    },
    {
      id: 5,
      title: t('terrains.yadira.title'),
      price: t('terrains.yadira.price'),
      location: t('terrains.yadira.location'),
      area: t('terrains.yadira.area'),
      coordinates: { lat: 10.2460913658528, lng: -85.8097140548287 },
      registryData: {
        fincaNumber: "210845",
        province: "Guanacaste",
        owner: "Yadira Gómez Vallejos",
        status: t('terrains.yadira.status'),
        inscriptionDate: "24 Nov 2008",
        legalStatus: "clean"
      },
      investmentData: {
        potential: t('terrains.yadira.investmentData.potential'),
        zoning: t('terrains.yadira.investmentData.zoning'),
        access: t('terrains.yadira.investmentData.access')
      },
      amenities: {
        security: t('terrains.yadira.amenities.security'),
        beachAccess: t('terrains.yadira.amenities.beachAccess'),
        utilities: t('terrains.yadira.amenities.utilities'),
        infrastructure: t('terrains.yadira.amenities.infrastructure')
      },
      boxGuarantee: [
        t('terrainModal.guarantee1'),
        t('terrainModal.guarantee2'), 
        t('terrainModal.guarantee3'),
        t('terrainModal.guarantee4')
      ],
      polygonCoords: [
        { lat: 10.24166626252567, lng: -85.80850923036705 },
        { lat: 10.24276366413611, lng: -85.80869563071455 },
        { lat: 10.2439559832139, lng: -85.80887616824194 },
        { lat: 10.24424300005094, lng: -85.80892610077787 },
        { lat: 10.24479066468552, lng: -85.80905649299807 },
        { lat: 10.24525747048566, lng: -85.80915668282704 },
        { lat: 10.2458416836334, lng: -85.80922446002668 },
        { lat: 10.24618886601298, lng: -85.80927770074294 },
        { lat: 10.24624877792519, lng: -85.80927712529116 },
        { lat: 10.24623551742512, lng: -85.80932607478478 },
        { lat: 10.24615908976471, lng: -85.80956050973273 },
        { lat: 10.24425442076155, lng: -85.80931817260917 },
        { lat: 10.2439848507644, lng: -85.80928010502841 },
        { lat: 10.2433340664313, lng: -85.80919283809926 },
        { lat: 10.24246514726847, lng: -85.80908397033218 },
        { lat: 10.24162134042225, lng: -85.80894839767413 },
        { lat: 10.24162853811266, lng: -85.80881553666737 },
        { lat: 10.24166626252567, lng: -85.80850923036705 }
      ]
    }
  ], [t])

  const layerStyles = {
    legal: {
      clean: { strokeColor: "#10B981", fillColor: "#10B981", fillOpacity: 0.2 },
      pending: { strokeColor: "#F59E0B", fillColor: "#F59E0B", fillOpacity: 0.2 },
      complex: { strokeColor: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.2 }
    }
  }

  useEffect(() => {
    let isMounted = true

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyB43q02l5WGOg37weZpzPOdc3a_MEm_fhE",
          version: "weekly",
          libraries: ["places", "geometry", "marker"] // Agregar marker library
        })

        await loader.load()
        
        if (!isMounted || !mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 10.2461, lng: -85.8097 },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
          tilt: 0,
          heading: 0,
          mapId: "terrain_map", // Necesario para la nueva API
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

        // Usar la nueva Advanced Markers API (sin warnings)
        terrains.forEach((terrain) => {
          const markerColor = terrain.registryData.legalStatus === 'clean' ? '#10B981' : 
                             terrain.registryData.legalStatus === 'pending' ? '#F59E0B' : '#EF4444'
          
          // Crear elemento HTML para el marcador
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

          // Usar AdvancedMarkerElement si está disponible, sino fallback a Marker normal
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
            // Fallback a marker tradicional si AdvancedMarkerElement no está disponible
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

          // Polygons remain the same
          if (terrain.polygonCoords) {
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
          setLoading(false)
        }
      } catch (err) {
        console.error("Error loading map:", err)
        if (isMounted) {
          setError(t('terrainMap.error'))
          setLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [terrains, t])

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
            {t('terrainMap.title')}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            {t('terrainMap.subtitle')}
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
            <p className="text-gray-400 text-sm font-micro uppercase">{t('terrainMap.stats.verifiedTitles')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <h3 className="text-2xl font-bold text-white font-space">2</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t('terrainMap.stats.provinces')}</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <h3 className="text-2xl font-bold text-white font-space">100%</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">{t('terrainMap.stats.premiumLocations')}</p>
          </div>
        </motion.div>

        {/* Modular Map Container with Cinematic Controls */}
        <MapContainer map={map} loading={loading} error={error}>
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
              <span className="text-gray-300 text-sm">{t('terrainMap.legend.cleanTitle')}</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">{t('terrainMap.legend.inProcess')}</span>
            </div>
          </div>
          <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-red-400 rounded-full"></div>
              <span className="text-gray-300 text-sm">{t('terrainMap.legend.requiresReview')}</span>
            </div>
          </div>
        </div>

        {/* Enhanced Side Panel Modal - COMPLETE WITH TRANSLATIONS */}
        <AnimatePresence>
          {selectedTerrain && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTerrain(null)}
            >
              <motion.div
                className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-white/20 rounded-2xl 
                          max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">{selectedTerrain.title}</h3>
                    <button
                      onClick={() => setSelectedTerrain(null)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <p className="text-gray-300 mt-2">{selectedTerrain.location}</p>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">{t('terrainModal.areaM2')}</div>
                      <div className="text-white font-semibold text-lg">{selectedTerrain.area}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">{t('terrainModal.areaFt2')}</div>
                      <div className="text-white font-semibold text-lg">
                        {selectedTerrain.area === "3,305 m²" ? "35,577 ft²" : 
                         (parseFloat(selectedTerrain.area.replace(/[^\d.]/g, '')) * 10.764).toLocaleString('en-US', {maximumFractionDigits: 0}) + " ft²"}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">{t('terrainModal.price')}</div>
                      <div className="text-white font-semibold text-lg">{selectedTerrain.price}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">{t('terrainModal.status')}</div>
                      <div className="text-green-400 font-semibold text-sm">{t('terrainModal.readyToBuild')}</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {selectedTerrain.amenities && (
                    <div className="bg-zinc-800/30 p-6 rounded-xl">
                      <h4 className="text-white font-semibold mb-4">{t('terrainModal.premiumAmenities')}</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(selectedTerrain.amenities).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registry Data */}
                  <div className="bg-zinc-800/30 p-6 rounded-xl">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      {t('terrainModal.registryInfo')}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">{t('terrainModal.fincaNumber')}</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.fincaNumber}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">{t('terrainModal.province')}</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.province}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">{t('terrainModal.currentOwner')}</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.owner}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">{t('terrainModal.inscriptionDate')}</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.inscriptionDate}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400">{t('terrainModal.legalStatus')}</div>
                        <div className={`font-medium inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                          selectedTerrain.registryData.legalStatus === 'clean' 
                            ? 'bg-green-500/20 text-green-300' 
                            : selectedTerrain.registryData.legalStatus === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          <Shield className="w-4 h-4" />
                          {selectedTerrain.registryData.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Investment Data */}
                  <div className="bg-zinc-800/30 p-6 rounded-xl">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      {t('terrainModal.investmentAnalysis')}
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">{t('terrainModal.potential')}</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.potential}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">{t('terrainModal.zoning')}</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.zoning}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400">{t('terrainModal.access')}</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.access}</div>
                      </div>
                    </div>
                  </div>

                  {/* Box Guarantee */}
                  {selectedTerrain.boxGuarantee && (
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/20">
                      <h4 className="text-white font-semibold mb-4">{t('terrainModal.boxGuarantee')}</h4>
                      <div className="space-y-2">
                        {selectedTerrain.boxGuarantee.map((guarantee, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <div className="text-green-400">✓</div>
                            <span className="text-gray-300">{guarantee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-2">
                      {t('terrainModal.requestPDF')}
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        {t('terrainModal.whatsappConcierge')}
                      </button>
                      <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        {t('terrainModal.securePurchase')}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}