"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { t } = useTranslation() // Use the translation hook

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { key: "header.aboutUs", href: "#about-us" },
    { key: "header.consulting", href: "#consulting" },
    { key: "header.reviews", href: "#reviews" },
    { key: "header.contact", href: "#contact" },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "py-3 bg-black/90 backdrop-blur-sm border-b border-white/10" : "py-5 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 z-50">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/images/BOX LOGO BLANCO.png"
                alt={t("header.boxArchitects")}
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm md:text-base font-micro uppercase tracking-wider text-white">
              {/* {t("header.boxArchitects")} */}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5 lg:space-x-7">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-xs lg:text-sm uppercase tracking-wider text-white hover:text-gray-300 transition-colors duration-200 relative group font-micro"
              >
                {t(item.key)}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white z-50" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8 pt-16">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-2xl font-bold uppercase tracking-wider text-white hover:text-gray-300 transition-colors font-micro"
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
              <LanguageSwitcher />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
