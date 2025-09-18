"use client"

import { motion } from "framer-motion"
import { Satellite, Mountain, Layers } from "lucide-react"
import { ViewMode } from "@/hooks/use-view-modes"

interface ViewModeSwitchProps {
  currentMode: ViewMode
  isTransitioning: boolean
  onModeChange: (mode: ViewMode) => void
}

export default function ViewModeSwitch({ 
  currentMode, 
  isTransitioning, 
  onModeChange 
}: ViewModeSwitchProps) {
  const modes = [
    { id: 'satellite' as ViewMode, icon: Satellite, label: 'Satélite' },
    { id: 'terrain' as ViewMode, icon: Mountain, label: 'Relieve' },
    { id: 'hybrid' as ViewMode, icon: Layers, label: 'Calles' }
  ]

  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 p-2">
      <div className="flex gap-1">
        {modes.map(({ id, icon: Icon, label }) => (
          <motion.button
            key={id}
            onClick={() => onModeChange(id)}
            disabled={isTransitioning}
            className={`relative p-3 rounded-lg transition-colors group ${
              currentMode === id 
                ? 'bg-white/20 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Icon className="w-5 h-5" />
            
            {/* Active indicator */}
            {currentMode === id && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                layoutId="activeMode"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
            
            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 
                           bg-black/80 text-white px-2 py-1 rounded text-xs
                           opacity-0 group-hover:opacity-100 transition-opacity
                           pointer-events-none whitespace-nowrap z-10">
              {label}
            </div>
          </motion.button>
        ))}
      </div>
      
      {isTransitioning && (
        <motion.div 
          className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </motion.div>
      )}
    </div>
  )
}