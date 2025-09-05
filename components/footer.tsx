"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useAdmin } from "@/hooks/use-admin"

export default function Footer() {
  const { t } = useTranslation()
  const { isAdmin, validateEmail, logout } = useAdmin()
  const [showAdminInput, setShowAdminInput] = useState(false)
  const [email, setEmail] = useState("")

  const navItems = [
    { key: "header.aboutUs", href: "#about-us" },
    { key: "header.consulting", href: "#consulting" },
    { key: "header.reviews", href: "#reviews" },
    { key: "header.contact", href: "#contact" },
  ]

  const legalItems = [
    { key: "footer.terms", href: "/terms" },
    { key: "footer.privacyPolicy", href: "/privacy" },
  ]

  const handleLogoDoubleClick = () => {
    if (!isAdmin) {
      setShowAdminInput(!showAdminInput)
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const success = validateEmail(email)
    if (success) {
      setShowAdminInput(false)
      setEmail("")
    } else {
      // Simple feedback - could be more subtle
      setEmail("")
    }
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <footer className="py-12 px-4 bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div 
                className="relative w-10 h-10 cursor-pointer" 
                onDoubleClick={handleLogoDoubleClick}
                title={isAdmin ? "Admin Mode Active" : ""}
              >
                <Image
                  src="/images/BOX LOGO BLANCO.png"
                  alt={t("header.boxArchitects")}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold font-micro tracking-wider text-white">
                  {t("header.boxArchitects")}
                </span>
                
                {/* Admin Input - Solo desktop */}
                {showAdminInput && !isAdmin && (
                  <form onSubmit={handleEmailSubmit} className="hidden md:block mt-1">
                    <input
                      type="email"
                      placeholder="Admin email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-xs bg-zinc-800 text-white border border-zinc-700 rounded px-2 py-1 w-40"
                      autoFocus
                      onBlur={() => setShowAdminInput(false)}
                    />
                  </form>
                )}
                
                {/* Admin Status - Solo si está activo */}
                {isAdmin && (
                  <button
                    onClick={handleLogout}
                    className="hidden md:block text-xs text-green-400 hover:text-green-300 text-left"
                  >
                    Admin Mode (click to exit)
                  </button>
                )}
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-satoshi">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/boxarchitects_cr/?igsh=MWhkbWJkMWozcGFxaA%3D%3D#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/brayner-guti%C3%A9rrez-652441284?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold text-white">{t("footer.navigation")}</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-satoshi"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 font-bold text-white">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              {legalItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm font-satoshi"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-zinc-800 text-center">
          <p className="text-gray-500 text-sm font-satoshi">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}