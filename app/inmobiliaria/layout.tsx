import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata: Metadata = {
  title: "Inmobiliaria | BOX ARCHITECTS - Propiedades en Costa Rica",
  description: "Descubre propiedades únicas en Costa Rica. Casas, terrenos, apartamentos y locales comerciales diseñados con visión arquitectónica.",
}

export default function InmobiliariaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}