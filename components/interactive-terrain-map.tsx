"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader } from "@googlemaps/js-api-loader"
import { 
  MapPin, 
  DollarSign, 
  ZoomIn, 
  ZoomOut, 
  Shield,
  TrendingUp,
  X,
  FileText
} from "lucide-react"
import { useTranslation } from "@/lib/i18n"

export default function InteractiveTerrainMap() {
  const { t } = useTranslation()
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedTerrain, setSelectedTerrain] = useState<any>(null)
  const [activeLayers, setActiveLayers] = useState({
    legal: true,
    services: false,
    investment: false
  })

  // Enhanced terrain data with premium metadata
  const terrains = [
    {
      id: 1,
      title: "Terreno Vista al Mar",
      price: "$180,000 USD",
      location: "Tamarindo, Guanacaste",
      area: "2,500 m²",
      coordinates: { lat: 10.2989, lng: -85.8377 },
      registryData: {
        fincaNumber: "N/A",
        province: "Guanacaste",
        owner: "Disponible",
        status: "VERIFICANDO",
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: "Alto",
        zoning: "Residencial",
        access: "Vía pública"
      },
      amenities: {
        security: "Zona segura",
        beachAccess: "5 min a playa",
        utilities: "Servicios disponibles",
        infrastructure: "Vías pavimentadas"
      },
      boxGuarantee: [
        "Estudio legal completo",
        "Firma digital desde tu país", 
        "Seguimiento de obra en plataforma online",
        "Concierge personal (desde tu llegada al aeropuerto)"
      ]
    },
    {
      id: 2,
      title: "Lote Montaña",
      price: "$95,000 USD", 
      location: "Monteverde, Puntarenas",
      area: "1,800 m²",
      coordinates: { lat: 10.3181, lng: -84.8066 },
      registryData: {
        fincaNumber: "N/A",
        province: "Puntarenas",
        owner: "Disponible",
        status: "VERIFICANDO",
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: "Medio",
        zoning: "Residencial",
        access: "Vía secundaria"
      },
      amenities: {
        security: "Comunidad privada",
        beachAccess: "Vista panorámica",
        utilities: "Electricidad disponible",
        infrastructure: "Acceso 4x4"
      },
      boxGuarantee: [
        "Estudio legal completo",
        "Firma digital desde tu país", 
        "Seguimiento de obra en plataforma online",
        "Concierge personal (desde tu llegada al aeropuerto)"
      ]
    },
    {
      id: 3,
      title: "Terreno Comercial",
      price: "$280,000 USD",
      location: "Liberia, Guanacaste", 
      area: "3,200 m²",
      coordinates: { lat: 10.6339, lng: -85.4378 },
      registryData: {
        fincaNumber: "N/A",
        province: "Guanacaste",
        owner: "Disponible",
        status: "VERIFICANDO",
        inscriptionDate: "En proceso",
        legalStatus: "pending"
      },
      investmentData: {
        potential: "Muy Alto",
        zoning: "Comercial",
        access: "Vía principal"
      },
      amenities: {
        security: "Zona comercial activa",
        beachAccess: "20 min al aeropuerto",
        utilities: "Servicios completos",
        infrastructure: "Frente a carretera"
      },
      boxGuarantee: [
        "Estudio legal completo",
        "Firma digital desde tu país", 
        "Seguimiento de obra en plataforma online",
        "Concierge personal (desde tu llegada al aeropuerto)"
      ]
    },
    {
      id: 4,
      title: "FINCA YADIRA - Reserva Box",
      price: "Consultar precio",
      location: "Santa Cruz, Guanacaste",
      area: "20,885 m²",
      coordinates: { lat: 10.2460913658528, lng: -85.8097140548287 },
      registryData: {
        fincaNumber: "210845",
        province: "Guanacaste",
        owner: "Yadira Gómez Vallejos",
        status: "INSCRITO",
        inscriptionDate: "24 Nov 2008",
        legalStatus: "clean"
      },
      investmentData: {
        potential: "Alto",
        zoning: "Residencial/Comercial",
        access: "Vía pública directa"
      },
      amenities: {
        security: "Zona residencial tranquila",
        beachAccess: "15 min a playa",
        utilities: "Agua, electricidad disponible",
        infrastructure: "Acceso pavimentado"
      },
      boxGuarantee: [
        "Estudio legal completo",
        "Firma digital desde tu país", 
        "Seguimiento de obra en plataforma online",
        "Concierge personal (desde tu llegada al aeropuerto)"
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
  ]

  const layerStyles = {
    legal: {
      clean: { strokeColor: "#10B981", fillColor: "#10B981", fillOpacity: 0.2 },
      pending: { strokeColor: "#F59E0B", fillColor: "#F59E0B", fillOpacity: 0.2 },
      complex: { strokeColor: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.2 }
    }
  }

  const handleZoom = (direction: 'in' | 'out') => {
    if (!map) return
    const currentZoom = map.getZoom() || 15
    map.setZoom(currentZoom + (direction === 'in' ? 1 : -1))
  }

  const toggleLayer = (layer: keyof typeof activeLayers) => {
    setActiveLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }

  useEffect(() => {
    let isMounted = true

    const initMap = async () => {
      try {
        const loader = new Loader({
          apiKey: "AIzaSyB43q02l5WGOg37weZpzPOdc3a_MEm_fhE",
          version: "weekly",
          libraries: ["places"]
        })

        await loader.load()
        
        if (!isMounted || !mapRef.current) return

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat: 10.2461, lng: -85.8097 },
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          disableDefaultUI: true,
          gestureHandling: "cooperative",
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

        // Enhanced markers and polygons with registry data
        terrains.forEach((terrain) => {
          // Dynamic marker color based on legal status
          const markerColor = terrain.registryData.legalStatus === 'clean' ? '#10B981' : 
                             terrain.registryData.legalStatus === 'pending' ? '#F59E0B' : '#EF4444'
          
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

          // Enhanced polygon with legal status styling
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

            marker.addListener("click", () => {
              setSelectedTerrain(terrain)
            })

            terrainPolygon.addListener("click", () => {
              setSelectedTerrain(terrain)
            })
          } else {
            marker.addListener("click", () => {
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
          setError("Error cargando el mapa")
          setLoading(false)
        }
      }
    }

    initMap()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
      <div className="container mx-auto max-w-7xl">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
            Explora Terrenos Premium
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            Cada propiedad verificada legalmente con datos del Registro Nacional y análisis completo de inversión.
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
            <p className="text-gray-400 text-sm font-micro uppercase">Títulos Verificados</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-blue-400" />
            <h3 className="text-2xl font-bold text-white font-space">3</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">Provincias</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 backdrop-blur-sm border border-white/10 rounded-xl">
            <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <h3 className="text-2xl font-bold text-white font-space">100%</h3>
            <p className="text-gray-400 text-sm font-micro uppercase">Ubicaciones Premium</p>
          </div>
        </motion.div>

        {/* Premium Map Container */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/80 to-zinc-900/90 
                         backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden
                         shadow-[0_0_80px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]">
            
            {/* Subtle animated glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 
                           animate-pulse rounded-3xl pointer-events-none" />
            
            {/* Custom Controls */}
            <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
              {/* Zoom Controls */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => handleZoom('in')}
                  className="p-3 text-white hover:bg-white/10 transition-colors border-b border-white/10"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleZoom('out')}
                  className="p-3 text-white hover:bg-white/10 transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
              </div>

              {/* Layer Controls */}
              <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-4 min-w-48">
                <h4 className="text-white font-medium mb-3 text-sm">Capas de Información</h4>
                <div className="space-y-2">
                  <button
                    onClick={() => toggleLayer('legal')}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeLayers.legal 
                        ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    Status Legal
                  </button>
                  <button
                    onClick={() => toggleLayer('services')}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeLayers.services 
                        ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <MapPin className="w-4 h-4" />
                    Servicios
                  </button>
                  <button
                    onClick={() => toggleLayer('investment')}
                    className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm transition-colors ${
                      activeLayers.investment 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Inversión
                  </button>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
                <div className="text-white text-lg">Cargando mapa inteligente...</div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
                <div className="text-red-400 text-lg">{error}</div>
              </div>
            )}

            {/* Map */}
            <div 
              ref={mapRef} 
              className="w-full h-[70vh] min-h-[500px] rounded-3xl"
            />
          </div>

          {/* Enhanced Legend */}
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Título Limpio</span>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">En Proceso</span>
              </div>
            </div>
            <div className="bg-black/30 backdrop-blur-md p-4 border border-white/10 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-red-400 rounded-full"></div>
                <span className="text-gray-300 text-sm">Requiere Revisión</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Side Panel Modal */}
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
                      <div className="text-gray-400 text-sm mb-1">Área en m²</div>
                      <div className="text-white font-semibold text-lg">{selectedTerrain.area}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Área en pies²</div>
                      <div className="text-white font-semibold text-lg">
                        {(parseFloat(selectedTerrain.area.replace(/[^\d.]/g, '')) * 10.764).toLocaleString('en-US', {maximumFractionDigits: 0})} ft²
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Precio</div>
                      <div className="text-white font-semibold text-lg">{selectedTerrain.price}</div>
                    </div>
                    <div className="bg-zinc-800/50 p-4 rounded-xl">
                      <div className="text-gray-400 text-sm mb-1">Estado</div>
                      <div className="text-green-400 font-semibold text-sm">Listo para construir</div>
                    </div>
                  </div>

                  {/* Amenities */}
                  {selectedTerrain.amenities && (
                    <div className="bg-zinc-800/30 p-6 rounded-xl">
                      <h4 className="text-white font-semibold mb-4">Amenidades Premium</h4>
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
                      Información Registral
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Número de Finca</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.fincaNumber}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Provincia</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.province}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Propietario Actual</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.owner}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Fecha Inscripción</div>
                        <div className="text-white font-medium">{selectedTerrain.registryData.inscriptionDate}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400">Estado Legal</div>
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
                      Análisis de Inversión
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-gray-400">Potencial</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.potential}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Zonificación</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.zoning}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400">Acceso</div>
                        <div className="text-white font-medium">{selectedTerrain.investmentData.access}</div>
                      </div>
                    </div>
                  </div>

                  {/* Box Guarantee */}
                  {selectedTerrain.boxGuarantee && (
                    <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/20">
                      <h4 className="text-white font-semibold mb-4">Garantía Box Architects</h4>
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
                      Solicitar Propuesta Personalizada PDF
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm">
                        WhatsApp Concierge
                      </button>
                      <button className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2 text-sm">
                       🖊️ Compra Segura
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




// "use client"

// import { useEffect, useRef, useState } from "react"
// import { motion } from "framer-motion"
// import { Loader } from "@googlemaps/js-api-loader"
// import { MapPin, DollarSign } from "lucide-react"
// import { useTranslation } from "@/lib/i18n"

// export default function InteractiveTerrainMap() {
//   const { t } = useTranslation()
//   const mapRef = useRef<HTMLDivElement>(null)
//   const [map, setMap] = useState<google.maps.Map | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   // Terrenos con datos reales del KML
//   const terrains = [
//     {
//       id: 1,
//       title: "Terreno Vista al Mar",
//       price: "₡85,000,000",
//       location: "Tamarindo, Guanacaste",
//       area: "2,500 m²",
//       coordinates: { lat: 10.2989, lng: -85.8377 }
//     },
//     {
//       id: 2,
//       title: "Lote Montaña",
//       price: "₡45,000,000", 
//       location: "Monteverde, Puntarenas",
//       area: "1,800 m²",
//       coordinates: { lat: 10.3181, lng: -84.8066 }
//     },
//     {
//       id: 3,
//       title: "Terreno Comercial",
//       price: "₡120,000,000",
//       location: "Liberia, Guanacaste", 
//       area: "3,200 m²",
//       coordinates: { lat: 10.6339, lng: -85.4378 }
//     },
//     {
//       id: 4,
//       title: "FINCA YADIRA",
//       price: "Consultar precio",
//       location: "Finca Yadira, Guanacaste",
//       area: "Terreno delimitado",
//       coordinates: { lat: 10.2460913658528, lng: -85.8097140548287 },
//       polygon: [
//         { lat: 10.24166626252567, lng: -85.80850923036705 },
//         { lat: 10.24276366413611, lng: -85.80869563071455 },
//         { lat: 10.2439559832139, lng: -85.80887616824194 },
//         { lat: 10.24424300005094, lng: -85.80892610077787 },
//         { lat: 10.24479066468552, lng: -85.80905649299807 },
//         { lat: 10.24525747048566, lng: -85.80915668282704 },
//         { lat: 10.2458416836334, lng: -85.80922446002668 },
//         { lat: 10.24618886601298, lng: -85.80927770074294 },
//         { lat: 10.24624877792519, lng: -85.80927712529116 },
//         { lat: 10.24623551742512, lng: -85.80932607478478 },
//         { lat: 10.24615908976471, lng: -85.80956050973273 },
//         { lat: 10.24425442076155, lng: -85.80931817260917 },
//         { lat: 10.2439848507644, lng: -85.80928010502841 },
//         { lat: 10.2433340664313, lng: -85.80919283809926 },
//         { lat: 10.24246514726847, lng: -85.80908397033218 },
//         { lat: 10.24162134042225, lng: -85.80894839767413 },
//         { lat: 10.24162853811266, lng: -85.80881553666737 },
//         { lat: 10.24166626252567, lng: -85.80850923036705 }
//       ]
//     }
//   ]

//   useEffect(() => {
//     let isMounted = true

//     const initMap = async () => {
//       try {
//         const loader = new Loader({
//           apiKey: "AIzaSyB43q02l5WGOg37weZpzPOdc3a_MEm_fhE",
//           version: "weekly",
//           libraries: ["places"]
//         })

//         await loader.load()
        
//         if (!isMounted || !mapRef.current) return

//         const mapInstance = new google.maps.Map(mapRef.current, {
//           center: { lat: 10.2461, lng: -85.8097 }, // Centrado en Finca Yadira
//           zoom: 12,
//           mapTypeId: google.maps.MapTypeId.SATELLITE,
//           mapTypeControl: true,
//           streetViewControl: false,
//           fullscreenControl: true,
//           zoomControl: true
//         })

//         if (!isMounted) return
//         setMap(mapInstance)

//         // Agregar markers y polígonos
//         terrains.forEach((terrain) => {
//           // Crear marker
//           const marker = new google.maps.Marker({
//             position: terrain.coordinates,
//             map: mapInstance,
//             title: terrain.title,
//             icon: {
//               url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`
//                 <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
//                   <circle cx="16" cy="16" r="14" fill="#ffffff" stroke="#000000" stroke-width="2"/>
//                   <circle cx="16" cy="16" r="6" fill="#000000"/>
//                 </svg>
//               `),
//               scaledSize: new google.maps.Size(32, 32),
//               anchor: new google.maps.Point(16, 16)
//             }
//           })

//           // Si tiene polígono (como Finca Yadira), dibujarlo
//           if (terrain.polygon) {
//             const polygon = new google.maps.Polygon({
//               paths: terrain.polygon,
//               strokeColor: "#FFD700", // Amarillo como en Google Earth
//               strokeOpacity: 0.8,
//               strokeWeight: 3,
//               fillColor: "#FFD700",
//               fillOpacity: 0.4,
//               map: mapInstance
//             })

//             // Click en polígono también abre info
//             polygon.addListener("click", () => {
//               infoWindow.open(mapInstance, marker)
//             })
//           }

//           // Info window
//           const infoWindow = new google.maps.InfoWindow({
//             content: `
//               <div style="padding: 12px; max-width: 250px; font-family: system-ui, sans-serif;">
//                 <h3 style="margin: 0 0 8px 0; color: #000; font-size: 16px; font-weight: bold;">${terrain.title}</h3>
//                 <p style="margin: 4px 0; color: #666; font-size: 14px;">${terrain.location}</p>
//                 <p style="margin: 4px 0; color: #000; font-size: 18px; font-weight: bold;">${terrain.price}</p>
//                 <p style="margin: 4px 0; color: #666; font-size: 14px;">${terrain.area}</p>
//                 ${terrain.polygon ? '<p style="margin: 4px 0; color: #DAA520; font-size: 12px;">Área delimitada visible</p>' : ''}
//               </div>
//             `
//           })

//           marker.addListener("click", () => {
//             infoWindow.open(mapInstance, marker)
//           })
//         })

//         if (isMounted) {
//           setLoading(false)
//         }
//       } catch (err) {
//         if (isMounted) {
//           setError("Error cargando el mapa")
//           setLoading(false)
//         }
//       }
//     }

//     initMap()

//     return () => {
//       isMounted = false
//     }
//   }, [])

//   return (
//     <section id="terrain-map" className="py-16 md:py-24 px-4 bg-zinc-950">
//       <div className="container mx-auto max-w-6xl">
//         {/* Header */}
//         <motion.div
//           className="text-center mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="section-title text-3xl md:text-4xl mb-5">Explora Terrenos Disponibles</h2>
//           <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto font-satoshi">
//             Descubre ubicaciones premium en Costa Rica. Haz clic en los marcadores para ver detalles de cada terreno.
//           </p>
//         </motion.div>

//         {/* Stats */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           viewport={{ once: true }}
//         >
//           <div className="text-center p-6 border border-white/10 rounded-lg">
//             <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
//             <h3 className="text-2xl font-bold text-white font-space">{terrains.length}</h3>
//             <p className="text-gray-400 text-sm font-micro uppercase">Terrenos Disponibles</p>
//           </div>
//           <div className="text-center p-6 border border-white/10 rounded-lg">
//             <DollarSign className="w-8 h-8 mx-auto mb-3 text-white" />
//             <h3 className="text-2xl font-bold text-white font-space">3</h3>
//             <p className="text-gray-400 text-sm font-micro uppercase">Provincias</p>
//           </div>
//           <div className="text-center p-6 border border-white/10 rounded-lg">
//             <MapPin className="w-8 h-8 mx-auto mb-3 text-white" />
//             <h3 className="text-2xl font-bold text-white font-space">100%</h3>
//             <p className="text-gray-400 text-sm font-micro uppercase">Ubicaciones Premium</p>
//           </div>
//         </motion.div>

//         {/* Map Container */}
//         <motion.div
//           className="relative"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
//             {loading && (
//               <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900">
//                 <div className="text-white">Cargando mapa...</div>
//               </div>
//             )}
//             {error && (
//               <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900">
//                 <div className="text-red-400">{error}</div>
//               </div>
//             )}
//             <div 
//               ref={mapRef} 
//               className="w-full h-96 md:h-[500px] lg:h-[600px]"
//             />
//           </div>
          
//           {/* Map Legend */}
//           <div className="mt-6 flex justify-center gap-6">
//             <div className="bg-black/50 backdrop-blur-md p-4 border border-white/10 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-white rounded-full border-2 border-black"></div>
//                 <span className="text-gray-300 text-sm font-satoshi">Terrenos Disponibles</span>
//               </div>
//             </div>
//             <div className="bg-black/50 backdrop-blur-md p-4 border border-white/10 rounded-lg">
//               <div className="flex items-center gap-3">
//                 <div className="w-4 h-4 bg-yellow-400 border-2 border-yellow-600"></div>
//                 <span className="text-gray-300 text-sm font-satoshi">Área Delimitada</span>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   )
// }