"use client"

import { useState, useEffect, useMemo } from 'react'
import { terrainTranslations } from '@/lib/terrain-translations'

interface TerrainCoordinate {
  lat: number
  lng: number
}

interface TerrainData {
  id: number
  title: string
  price: string
  location: string
  area: string
  coordinates: TerrainCoordinate
  registryData: {
    fincaNumber: string
    province: string
    owner: string
    status: string
    inscriptionDate: string
    legalStatus: 'clean' | 'pending' | 'complex'
  }
  investmentData: {
    potential: string
    zoning: string
    access: string
  }
  amenities: {
    security: string
    beachAccess: string
    utilities: string
    infrastructure: string
  }
  boxGuarantee: string[]
  polygonCoords: TerrainCoordinate[]
}

// KML Parser utility
const parseKMLCoordinates = (kmlContent: string): TerrainCoordinate[] => {
  try {
    // Extract coordinates from KML
    const coordinatesMatch = kmlContent.match(/<coordinates>(.*?)<\/coordinates>/s)
    if (!coordinatesMatch) return []

    const coordString = coordinatesMatch[1].trim()
    const coords = coordString.split(/\s+/).map(coord => {
      const [lng, lat] = coord.split(',').map(Number)
      return { lat, lng }
    }).filter(coord => !isNaN(coord.lat) && !isNaN(coord.lng))

    return coords
  } catch (error) {
    console.error('Error parsing KML coordinates:', error)
    return []
  }
}

// Terrain metadata - combines with KML data
const terrainMetadata = {
  'LOTE NANGU': {
    id: 1,
    registryData: {
      fincaNumber: "En proceso",
      province: "Guanacaste", 
      owner: "Disponible",
      inscriptionDate: "En proceso",
      legalStatus: "pending" as const
    },
    pricing: {
      basePrice: "Consultar",
      suggestedPrice: "Consultar",
      deposit: "Consultar"
    }
  },
  'FINCA YADIRA': {
    id: 2,
    registryData: {
      fincaNumber: "210845",
      province: "Guanacaste",
      owner: "Yadira Gómez Vallejos", 
      inscriptionDate: "24 Nov 2008",
      legalStatus: "clean" as const
    },
    pricing: {
      basePrice: "$95,000",
      suggestedPrice: "$110,000", 
      deposit: "$11,000"
    }
  },
  'LOTE AGROPECUARIA SAN MARCO': {
    id: 3,
    registryData: {
      fincaNumber: "213794",
      province: "Guanacaste",
      owner: "Agropecuaria San Marcos Sociedad Anónima",
      inscriptionDate: "22 Sep 2015", 
      legalStatus: "clean" as const
    },
    pricing: {
      basePrice: "$45,000",
      suggestedPrice: "$52,000",
      deposit: "$5,200"
    }
  },
  // NUEVOS TERRENOS
  'FINCA CARLOS': {
    id: 4,
    registryData: {
      fincaNumber: "86474",
      province: "Guanacaste",
      owner: "Carlos Benito Matarrita Matarrita", 
      inscriptionDate: "1991",
      legalStatus: "clean" as const
    },
    pricing: {
      basePrice: "$1,054,900",
      suggestedPrice: "$1,200,000",
      deposit: "$120,000"
    }
  },
  'LOTE AQUATUR': {
    id: 5,
    registryData: {
      fincaNumber: "111830",
      province: "Guanacaste",
      owner: "AQUATUR S.A.",
      inscriptionDate: "07 Oct 2004", 
      legalStatus: "clean" as const
    },
    pricing: {
      basePrice: "$880,000",
      suggestedPrice: "$1,000,000",
      deposit: "$100,000"
    }
  }
}

export function useTerrainData(language: 'es' | 'en') {
  const [kmlData, setKmlData] = useState<{[key: string]: TerrainCoordinate[]}>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Helper function to get terrain translations
  const getTerrainTranslation = (key: string) => {
    const keys = key.split('.')
    let value = terrainTranslations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  // Load KML files
  useEffect(() => {
    const loadKMLFiles = async () => {
      try {
        setLoading(true)
        const kmlFiles = [
          'LOTE NANGU.kml',
          'FINCA YADIRA.kml', 
          'LOTE AGROPECUARIA SAN MARCO.kml',
          'FINCA CARLOS.kml',        // NUEVO
          'LOTE AQUATUR.kml'         // NUEVO
        ]

        const kmlPromises = kmlFiles.map(async (filename) => {
          const response = await fetch(`/data/${filename}`)
          if (!response.ok) {
            throw new Error(`Failed to load ${filename}`)
          }
          const content = await response.text()
          const coords = parseKMLCoordinates(content)
          return { filename: filename.replace('.kml', ''), coords }
        })

        const results = await Promise.all(kmlPromises)
        const kmlDataMap: {[key: string]: TerrainCoordinate[]} = {}
        
        results.forEach(({ filename, coords }) => {
          kmlDataMap[filename] = coords
        })

        setKmlData(kmlDataMap)
        setError(null)
      } catch (err) {
        console.error('Error loading KML files:', err)
        setError('Error loading terrain data')
      } finally {
        setLoading(false)
      }
    }

    loadKMLFiles()
  }, [])

  // Generate terrain data combining KML + metadata + translations
  const terrains = useMemo((): TerrainData[] => {
    if (Object.keys(kmlData).length === 0) return []

    return Object.entries(terrainMetadata).map(([filename, metadata]) => {
      const coords = kmlData[filename] || []
      const centerCoord = coords.length > 0 ? 
        coords.reduce((acc, coord) => ({
          lat: acc.lat + coord.lat / coords.length,
          lng: acc.lng + coord.lng / coords.length  
        }), { lat: 0, lng: 0 }) :
        { lat: 0, lng: 0 }

      // Map filename to translation keys
      const translationKey = filename === 'LOTE NANGU' ? 'nahua' :
                           filename === 'FINCA YADIRA' ? 'yadira' : 
                           filename === 'LOTE AGROPECUARIA SAN MARCO' ? 'sanMarco' :
                           filename === 'FINCA CARLOS' ? 'carlos' : 'aquatur'

      return {
        id: metadata.id,
        title: getTerrainTranslation(`terrains.${translationKey}.title`),
        price: metadata.pricing.basePrice,
        location: getTerrainTranslation(`terrains.${translationKey}.location`),
        area: getTerrainTranslation(`terrains.${translationKey}.area`),
        coordinates: centerCoord,
        registryData: {
          ...metadata.registryData,
          status: getTerrainTranslation(`terrains.${translationKey}.status`)
        },
        investmentData: {
          potential: getTerrainTranslation(`terrains.${translationKey}.investmentData.potential`),
          zoning: getTerrainTranslation(`terrains.${translationKey}.investmentData.zoning`),
          access: getTerrainTranslation(`terrains.${translationKey}.investmentData.access`)
        },
        amenities: {
          security: getTerrainTranslation(`terrains.${translationKey}.amenities.security`),
          beachAccess: getTerrainTranslation(`terrains.${translationKey}.amenities.beachAccess`),
          utilities: getTerrainTranslation(`terrains.${translationKey}.amenities.utilities`),
          infrastructure: getTerrainTranslation(`terrains.${translationKey}.amenities.infrastructure`)
        },
        boxGuarantee: [
          getTerrainTranslation('terrainModal.guarantee1'),
          getTerrainTranslation('terrainModal.guarantee2'), 
          getTerrainTranslation('terrainModal.guarantee3'),
          ...(metadata.id > 1 ? [getTerrainTranslation('terrainModal.guarantee4')] : [])
        ],
        polygonCoords: coords,
        // Add pricing for proposals
        pricing: metadata.pricing
      } as TerrainData & { pricing: typeof metadata.pricing }
    })
  }, [kmlData, language])

  return {
    terrains,
    loading,
    error,
    getTerrainTranslation
  }
}