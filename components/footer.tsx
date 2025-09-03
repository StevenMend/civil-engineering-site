"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin } from "lucide-react"
import { useTranslation } from "@/lib/i18n" // Import useTranslation

export default function Footer() {
  const { t } = useTranslation() // Use the translation hook

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

  return (
    <footer className="py-12 px-4 bg-zinc-950 border-t border-zinc-800">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/BOX LOGO BLANCO.png"
                  alt={t("header.boxArchitects")}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold font-micro tracking-wider text-white">{t("header.boxArchitects")}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md font-satoshi">{t("footer.description")}</p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/boxarchitects_cr/?igsh=MWhkbWJkMWozcGFxaA%3D%3D#" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors" aria-label="LinkedIn">
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
