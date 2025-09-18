import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/lib/i18n"

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
      <head>
        {/* Suprimir warnings específicos de React */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Suprimir warnings específicos que no podemos controlar
              const originalWarn = console.warn;
              console.warn = function(...args) {
                // Filtrar warnings específicos que no son críticos
                const message = args.join(' ');
                if (
                  message.includes('Skipping auto-scroll behavior due to') ||
                  message.includes('google.maps.Marker is deprecated') ||
                  message.includes('position: sticky') ||
                  message.includes('position: fixed')
                ) {
                  return; // No mostrar estos warnings
                }
                // Mostrar todos los otros warnings
                originalWarn.apply(console, args);
              };

              // También limpiar algunos console.error específicos de Google Maps
              const originalError = console.error;
              console.error = function(...args) {
                const message = args.join(' ');
                if (
                  message.includes('google.maps.Marker is deprecated') ||
                  message.includes('At this time, google.maps.Marker is not')
                ) {
                  return; // No mostrar estos errors
                }
                originalError.apply(console, args);
              };
            `,
          }}
        />
      </head>
      <body className="bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          <TranslationProvider>
            {children}
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}