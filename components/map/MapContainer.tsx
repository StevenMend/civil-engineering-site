"use client"

import { motion } from "framer-motion"
import ViewModeSwitch from "./ViewModeSwitch"
import CinematicControls from "./CinematicControls"
import { useViewModes } from "@/hooks/use-view-modes"
import { useMapCamera } from "@/hooks/use-map-camera"
import { useTranslation } from "@/lib/i18n"

interface MapContainerProps {
  map: google.maps.Map | null
  loading: boolean
  error: string | null
  children: React.ReactNode
}

export default function MapContainer({ 
  map, 
  loading, 
  error, 
  children
}: MapContainerProps) {
  const { t } = useTranslation()
  const { viewMode, isTransitioning, changeViewMode } = useViewModes()
  const { resetView } = useMapCamera(map)

  const getViewModeLabel = (mode: string) => {
    switch(mode) {
      case 'hybrid': return t('terrainMap.viewModes.streets')
      case 'terrain': return t('terrainMap.viewModes.terrain')
      default: return t('terrainMap.viewModes.satellite')
    }
  }

  return (
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
        
        {/* Animated glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 
                       animate-pulse rounded-3xl pointer-events-none" />
        
        {/* Controls */}
        <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
          <ViewModeSwitch 
            currentMode={viewMode}
            isTransitioning={isTransitioning}
            onModeChange={(mode) => changeViewMode(mode, map)}
          />
          
          <CinematicControls 
            onReset={resetView}
          />
        </div>

        {/* Mode indicator */}
        <div className="absolute top-6 left-6 z-20">
          <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
            <span className="text-white text-sm font-medium">
              {getViewModeLabel(viewMode)}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
            <div className="text-white text-lg">{t('terrainMap.loading')}</div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
            <div className="text-red-400 text-lg">{error}</div>
          </div>
        )}

        {children}
      </div>
    </motion.div>
  )
}








// "use client"

// import { motion } from "framer-motion"
// import ViewModeSwitch from "./ViewModeSwitch"
// import CinematicControls from "./CinematicControls"
// import { useViewModes } from "@/hooks/use-view-modes"
// import { useMapCamera } from "@/hooks/use-map-camera"

// interface MapContainerProps {
//   map: google.maps.Map | null
//   loading: boolean
//   error: string | null
//   children: React.ReactNode
// }

// export default function MapContainer({ 
//   map, 
//   loading, 
//   error, 
//   children
// }: MapContainerProps) {
//   const { viewMode, isTransitioning, changeViewMode } = useViewModes()
//   const { resetView } = useMapCamera(map)

//   return (
//     <motion.div
//       className="relative"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.5, duration: 0.8 }}
//       viewport={{ once: true }}
//     >
//       <div className="relative bg-gradient-to-br from-zinc-900/90 via-zinc-800/80 to-zinc-900/90 
//                      backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden
//                      shadow-[0_0_80px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.1)]">
        
//         {/* Animated glow */}
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 
//                        animate-pulse rounded-3xl pointer-events-none" />
        
//         {/* Controls */}
//         <div className="absolute top-6 right-6 z-20 flex flex-col gap-3">
//           <ViewModeSwitch 
//             currentMode={viewMode}
//             isTransitioning={isTransitioning}
//             onModeChange={(mode) => changeViewMode(mode, map)}
//           />
          
//           <CinematicControls 
//             onReset={resetView}
//           />
//         </div>

//         {/* Mode indicator */}
//         <div className="absolute top-6 left-6 z-20">
//           <div className="bg-black/40 backdrop-blur-md rounded-lg px-3 py-2 border border-white/10">
//             <span className="text-white text-sm font-medium">
//               {viewMode === 'hybrid' ? 'Calles' : 
//                viewMode === 'terrain' ? 'Relieve' : 'Satélite'}
//             </span>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
//             <div className="text-white text-lg">Cargando mapa...</div>
//           </div>
//         )}

//         {error && (
//           <div className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/80 backdrop-blur-sm rounded-3xl">
//             <div className="text-red-400 text-lg">{error}</div>
//           </div>
//         )}

//         {children}
//       </div>
//     </motion.div>
//   )
// }