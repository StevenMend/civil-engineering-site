import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n" // Import TranslationProvider

export const metadata: Metadata = {
  title: "BOX ARCHITECTS | Architecture with Intention and Purpose",
  description:
    "We design spaces that breathe with you. Architecture in Costa Rica with soul, adapted to the environment and honoring history.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>
            {" "}
            {/* Wrap children with TranslationProvider */}
            {children}
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
