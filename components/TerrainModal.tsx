"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  X,
  FileText,
  MessageCircle,
  PlayCircle,
  Shield,
  TrendingUp
} from "lucide-react"

interface TerrainModalProps {
  selectedTerrain: any
  onClose: () => void
  onDueDiligenceClick: () => void
  onWhatsAppClick: () => void
  onVideoClick: () => void
  getTerrainTranslation: (key: string) => string
}

export default function TerrainModal({
  selectedTerrain,
  onClose,
  onDueDiligenceClick,
  onWhatsAppClick,
  onVideoClick,
  getTerrainTranslation
}: TerrainModalProps) {
  if (!selectedTerrain) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
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
                onClick={onClose}
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
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.areaM2')}</div>
                <div className="text-white font-semibold text-lg">{selectedTerrain.area}</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.areaFt2')}</div>
                <div className="text-white font-semibold text-lg">
                  {selectedTerrain.area === "3,305 m²" ? "35,577 ft²" : 
                   (parseFloat(selectedTerrain.area.replace(/[^\d.]/g, '')) * 10.764).toLocaleString('en-US', {maximumFractionDigits: 0}) + " ft²"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.price')}</div>
                <div className="text-white font-semibold text-lg">{selectedTerrain.price}</div>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">{getTerrainTranslation('terrainModal.status')}</div>
                <div className="text-green-400 font-semibold text-sm">{getTerrainTranslation('terrainModal.readyToBuild')}</div>
              </div>
            </div>

            {/* Amenities */}
            {selectedTerrain.amenities && (
              <div className="bg-zinc-800/30 p-6 rounded-xl">
                <h4 className="text-white font-semibold mb-4">{getTerrainTranslation('terrainModal.premiumAmenities')}</h4>
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
                {getTerrainTranslation('terrainModal.registryInfo')}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.fincaNumber')}</div>
                  <div className="text-white font-medium">{selectedTerrain.registryData.fincaNumber}</div>
                </div>
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.province')}</div>
                  <div className="text-white font-medium">{selectedTerrain.registryData.province}</div>
                </div>
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.currentOwner')}</div>
                  <div className="text-white font-medium">{selectedTerrain.registryData.owner}</div>
                </div>
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.inscriptionDate')}</div>
                  <div className="text-white font-medium">{selectedTerrain.registryData.inscriptionDate}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.legalStatus')}</div>
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
                {getTerrainTranslation('terrainModal.investmentAnalysis')}
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.potential')}</div>
                  <div className="text-white font-medium">{selectedTerrain.investmentData.potential}</div>
                </div>
                <div>
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.zoning')}</div>
                  <div className="text-white font-medium">{selectedTerrain.investmentData.zoning}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-gray-400">{getTerrainTranslation('terrainModal.access')}</div>
                  <div className="text-white font-medium">{selectedTerrain.investmentData.access}</div>
                </div>
              </div>
            </div>

            {/* Box Guarantee */}
            {selectedTerrain.boxGuarantee && (
              <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 p-6 rounded-xl border border-blue-500/20">
                <h4 className="text-white font-semibold mb-4">{getTerrainTranslation('terrainModal.boxGuarantee')}</h4>
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

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Primary Action - Due Diligence Guide */}
              <button 
                onClick={onDueDiligenceClick}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center justify-center gap-3"
              >
                <FileText className="w-5 h-5" />
                {getTerrainTranslation('terrainModal.basicGuide')}
              </button>
              
              {/* Secondary Actions */}
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={onWhatsAppClick}
                  className="bg-green-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {getTerrainTranslation('terrainModal.whatsappAgent')}
                </button>
                <button 
                  onClick={onVideoClick}
                  className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-700 hover:to-red-700 transition-colors flex items-center justify-center gap-2 text-sm"
                >
                  <PlayCircle className="w-4 h-4" />
                  {getTerrainTranslation('terrainModal.videoIntro')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}