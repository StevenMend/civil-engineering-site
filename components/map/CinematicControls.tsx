"use client"

import { motion } from "framer-motion"
import { RotateCcw } from "lucide-react"
import { useTranslation } from "@/lib/i18n"

interface CinematicControlsProps {
  onReset: () => void
}

export default function CinematicControls({ 
  onReset
}: CinematicControlsProps) {
  const { t } = useTranslation()
  
  return (
    <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
      <div className="p-2">
        <motion.button
          onClick={onReset}
          className="w-full p-3 text-white hover:bg-white/10 transition-colors 
                     flex items-center justify-center gap-2 text-sm rounded-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <RotateCcw className="w-4 h-4" />
          {t('terrainMap.controls.resetView')}
        </motion.button>
      </div>
    </div>
  )
}








// "use client"

// import { motion } from "framer-motion"
// import { RotateCcw } from "lucide-react"

// interface CinematicControlsProps {
//   onReset: () => void
// }

// export default function CinematicControls({ 
//   onReset
// }: CinematicControlsProps) {
//   return (
//     <div className="bg-black/30 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
//       <div className="p-2">
//         <motion.button
//           onClick={onReset}
//           className="w-full p-3 text-white hover:bg-white/10 transition-colors 
//                      flex items-center justify-center gap-2 text-sm rounded-lg"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <RotateCcw className="w-4 h-4" />
//           Reset Vista
//         </motion.button>
//       </div>
//     </div>
//   )
// }