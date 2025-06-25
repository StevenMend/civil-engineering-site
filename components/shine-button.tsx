"use client"
import { motion } from "framer-motion"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface ShineButtonProps {
  href: string
  text: string
}

export default function ShineButton({ href, text }: ShineButtonProps) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center text-white text-sm uppercase tracking-wider font-micro overflow-hidden group"
    >
      <span className="relative z-10 flex items-center">
        {text}
        <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      {/* Shine effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {/* Underline effect */}
      <motion.span
        className="absolute bottom-0 left-0 h-px bg-white w-full"
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </Link>
  )
}
