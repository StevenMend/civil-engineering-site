"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  X, 
  FileText, 
  Shield, 
  MapPin, 
  TrendingUp, 
  Eye,
  DollarSign,
  Leaf,
  CheckCircle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  Phone,
  Send
} from "lucide-react"
import { terrainTranslations } from '@/lib/terrain-translations'
import { useTranslation } from "@/lib/i18n"

interface DueDiligenceGuideProps {
  isOpen: boolean
  onClose: () => void
  selectedTerrain?: any
}

export default function DueDiligenceGuide({ 
  isOpen, 
  onClose, 
  selectedTerrain 
}: DueDiligenceGuideProps) {
  const { language } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '+',
    terrain: selectedTerrain?.title || '',
    message: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [focusedField, setFocusedField] = useState(null)
  const [expandedSection, setExpandedSection] = useState<number | null>(0)

  // Helper function to get terrain translations
  const getTerrainTranslation = (key: string) => {
    const lang = language as 'es' | 'en'
    const keys = key.split('.')
    let value = terrainTranslations[lang]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }, [])

  const handleWhatsAppChange = useCallback((e) => {
    e.preventDefault()
    let value = e.target.value
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/^\+/, '')
    }
    if (value === '') {
      value = '+'
    }
    handleInputChange('whatsapp', value)
  }, [handleInputChange])

  const handleEasyChat = async () => {
  const whatsappNumber = "+50661681784"  // Va a Box ✅
  const terrainInfo = selectedTerrain ? `${selectedTerrain.title} (${selectedTerrain.location})` : "Consulta general"
  const message = `Hola! Me interesa una asesoría de Due Diligence para: ${terrainInfo}${formData.fullName ? `. Mi nombre es ${formData.fullName}` : ''}${formData.email ? ` y mi email es ${formData.email}` : ''}.`
  
  // TRACKING SILENCIOSO - Solo a ti ✅
  try {
    const notificationPayload = {
      type: 'easy_chat_used',
      terrain: terrainInfo,
      user_name: formData.fullName || 'No proporcionado',
      user_email: formData.email || 'No proporcionado',
      user_whatsapp: formData.whatsapp || 'No proporcionado',
      timestamp: new Date().toISOString(),
      _subject: `🟢 Easy Chat usado - ${terrainInfo}`,
      _replyto: 'noreply@boxarchitects.com'
    }

    fetch('https://formspree.io/f/mrbqbqbj', {  // Solo a ti ✅
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notificationPayload)
    }).catch(err => console.log('Notification error:', err))
  } catch (error) {
    console.log('Silent notification failed:', error)
  }
  
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`
  window.open(whatsappUrl, '_blank')
}

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus({
        type: 'error',
        message: 'Por favor completa todos los campos requeridos'
      })
      return
    }
    
    setIsLoading(true)
    setStatus({ type: '', message: '' })
    
    const formPayload = {
      name: formData.fullName,
      email: formData.email,
      whatsapp: formData.whatsapp,
      terrain: formData.terrain,
      message: formData.message,
      _subject: `Nueva consulta de Due Diligence - ${formData.fullName}`,
      _replyto: formData.email
    }
    
    try {
      const [response1, response2] = await Promise.all([
        fetch('https://formspree.io/f/mjkrpapq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        }),
        fetch('https://formspree.io/f/mrbqbqbj', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formPayload)
        })
      ])
      
      if (response1.ok || response2.ok) {
        setStatus({
          type: 'success',
          message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
        })
        
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '+',
          terrain: '',
          message: ''
        })
      } else {
        throw new Error('Error en ambos envíos')
      }
    } catch (error) {
      console.error('Error:', error)
      setStatus({
        type: 'error',
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(() => {
        setStatus({ type: "", message: "" })
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [status.message])

  const sections = [
    {
      icon: Shield,
      title: getTerrainTranslation('dueDiligenceGuide.sections.legalVerification.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.legalVerification.content'),
      color: 'text-green-400'
    },
    {
      icon: MapPin,
      title: getTerrainTranslation('dueDiligenceGuide.sections.municipalPermits.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.municipalPermits.content'),
      color: 'text-blue-400'
    },
    {
      icon: Eye,
      title: getTerrainTranslation('dueDiligenceGuide.sections.physicalInspection.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.physicalInspection.content'),
      color: 'text-purple-400'
    },
    {
      icon: DollarSign,
      title: getTerrainTranslation('dueDiligenceGuide.sections.financialAnalysis.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.financialAnalysis.content'),
      color: 'text-yellow-400'
    },
    {
      icon: Leaf,
      title: getTerrainTranslation('dueDiligenceGuide.sections.environmentalChecks.title'),
      content: getTerrainTranslation('dueDiligenceGuide.sections.environmentalChecks.content'),
      color: 'text-emerald-400'
    }
  ]

  // Generate terrain-specific proposal content
  const getTerrainProposal = () => {
    if (!selectedTerrain) return null

    const baseContent = {
      propertyNumber: selectedTerrain.registryData?.fincaNumber || "En proceso",
      province: selectedTerrain.registryData?.province || "Guanacaste",
      owner: selectedTerrain.registryData?.owner || "Disponible",
      area: selectedTerrain.area,
      legalStatus: selectedTerrain.registryData?.status || "Título limpio",
      zoning: selectedTerrain.investmentData?.zoning || "Residencial / Comercial",
      access: selectedTerrain.investmentData?.access || "Acceso directo",
      potential: selectedTerrain.investmentData?.potential || "Alto potencial"
    }

    const pricing = selectedTerrain.id === 2 ? {
      basePrice: "$95,000",
      suggestedPrice: "$110,000",
      commission: "$15,000",
      deposit: "$11,000"
    } : selectedTerrain.id === 3 ? {
      basePrice: "$45,000", 
      suggestedPrice: "$52,000",
      commission: "$7,000",
      deposit: "$5,200"
    } : {
      basePrice: "Consultar",
      suggestedPrice: "Consultar", 
      commission: "Consultar",
      deposit: "Consultar"
    }

    return { ...baseContent, ...pricing }
  }

  const proposalData = getTerrainProposal()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="h-full overflow-y-auto">
            <motion.div
              className="min-h-screen flex items-start justify-center p-2 md:p-4 md:items-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full max-w-6xl bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-700 overflow-hidden mt-4 md:mt-0">
                
                {/* Toast - Fixed positioning */}
                <AnimatePresence>
                  {status.message && (
                    <div className="fixed top-4 left-4 right-4 z-[60] flex justify-center">
                      <motion.div
                        initial={{ opacity: 0, y: -30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -30, scale: 0.9 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={`px-4 py-3 rounded-xl text-sm font-medium text-center backdrop-blur-md border shadow-2xl max-w-sm ${
                          status.type === 'success' 
                            ? 'bg-emerald-500/90 text-white border-emerald-500/50' 
                            : 'bg-red-500/90 text-white border-red-500/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {status.type === 'success' && <CheckCircle className="w-4 h-4" />}
                          <span className="break-words">{status.message}</span>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>

                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-zinc-700 bg-zinc-800/50">
                  <div>
                    <h1 className="text-lg md:text-2xl font-semibold text-white">
                      {getTerrainTranslation('dueDiligenceGuide.title')}
                    </h1>
                    <p className="text-gray-300 text-sm mt-1">
                      {getTerrainTranslation('dueDiligenceGuide.subtitle')}
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-xl hover:bg-white/10 flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Layout - Stack vertically */}
                <div className="block md:hidden">
                  {/* Due Diligence Sections - Mobile */}
                  <div className="p-4 space-y-3 bg-zinc-900 border-b border-zinc-700">
                    {sections.map((section, index) => {
                      const IconComponent = section.icon
                      const isExpanded = expandedSection === index
                      
                      return (
                        <motion.div
                          key={index}
                          className="bg-zinc-800/40 border border-zinc-700 rounded-lg overflow-hidden"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <button
                            onClick={() => setExpandedSection(isExpanded ? null : index)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-zinc-700/30 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-1.5 rounded-lg bg-zinc-700/50 ${section.color}`}>
                                <IconComponent className="w-4 h-4" />
                              </div>
                              <h3 className="font-medium text-white text-sm">
                                {section.title}
                              </h3>
                            </div>
                            {isExpanded ? 
                              <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : 
                              <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            }
                          </button>
                          
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="p-3 pt-0 space-y-2 border-t border-zinc-700/50">
                                  {Array.isArray(section.content) ? 
                                    section.content.map((item, idx) => (
                                      <div key={idx} className="flex items-start gap-2 text-gray-300 text-xs">
                                        <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>{item}</span>
                                      </div>
                                    )) :
                                    <p className="text-gray-300 text-xs">{section.content}</p>
                                  }
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Contact Form - Mobile */}
                  <div className="p-4 bg-zinc-800/30">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      <div className="mb-4">
                        <h3 className="text-base font-medium text-white mb-1">
                          {getTerrainTranslation('dueDiligenceGuide.contactForm.title')}
                        </h3>
                        <p className="text-gray-300 text-xs mb-3">
                          {getTerrainTranslation('dueDiligenceGuide.contactForm.subtitle')}
                        </p>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3">
                        {/* Name */}
                        <div>
                          <Label htmlFor="fullName" className="text-white font-medium flex items-center text-sm mb-2">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            Nombre completo *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            onFocus={() => setFocusedField('fullName')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Tu nombre completo"
                            className={`bg-zinc-800 border-zinc-600 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
                              focusedField === 'fullName' ? 'ring-2 ring-white/20' : ''
                            }`}
                            required
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <Label htmlFor="email" className="text-white font-medium flex items-center text-sm mb-2">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            onFocus={() => setFocusedField('email')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="tu@correo.com"
                            className={`bg-zinc-800 border-zinc-600 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
                              focusedField === 'email' ? 'ring-2 ring-white/20' : ''
                            }`}
                            required
                          />
                        </div>

                        {/* WhatsApp */}
                        <div>
                          <Label htmlFor="whatsapp" className="text-white font-medium flex items-center text-sm mb-2">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            WhatsApp
                          </Label>
                          <Input
                            id="whatsapp"
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handleWhatsAppChange}
                            onFocus={() => setFocusedField('whatsapp')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="+506 8888 8888"
                            className={`bg-zinc-800 border-zinc-600 focus:border-white transition-all duration-300 pl-4 h-11 text-sm ${
                              focusedField === 'whatsapp' ? 'ring-2 ring-white/20' : ''
                            }`}
                          />
                        </div>

                        {/* Terrain Selection */}
                        <div>
                          <Label className="text-white font-medium flex items-center text-sm mb-2">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            Propiedad seleccionada
                          </Label>
                          <div className="bg-zinc-800 border border-zinc-600 rounded-lg p-3 text-sm">
                            <div className="text-white font-medium">{selectedTerrain?.title || 'Consulta general'}</div>
                            <div className="text-gray-400 text-xs mt-1">
                              {selectedTerrain?.location || 'Múltiples ubicaciones disponibles'} • {selectedTerrain?.area || 'Varias opciones'}
                            </div>
                            {selectedTerrain?.price && (
                              <div className="text-blue-400 text-xs mt-1 font-medium">{selectedTerrain.price}</div>
                            )}
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <Label htmlFor="message" className="text-white font-medium flex items-center text-sm mb-2">
                            <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                            Mensaje *
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            placeholder="Cuéntanos sobre tu proyecto o dudas específicas..."
                            rows={3}
                            className={`bg-zinc-800 border-zinc-600 focus:border-white resize-none transition-all duration-300 text-sm ${
                              focusedField === 'message' ? 'ring-2 ring-white/20' : ''
                            }`}
                            required
                          />
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="pt-2 space-y-3">
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full angular-button disabled:opacity-50 disabled:cursor-not-allowed h-11 !flex !items-center !justify-center text-sm"
                        >
                          <Send className="mr-2 w-4 h-4" />
                          {isLoading ? 'Enviando...' : 'Solicitar Asesoría'}
                          <div className="angular-button-overlay" />
                        </Button>
                        
                        <button
                          type="button"
                          onClick={handleEasyChat}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm border border-green-500/30 hover:border-green-500/50"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Easy Chat - WhatsApp
                        </button>
                      </div>

                      {/* Proposal Section */}
                      {proposalData && (
                        <div className="bg-zinc-700/30 border border-zinc-600 rounded-lg p-3 mt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <h4 className="font-medium text-white text-sm">
                              {selectedTerrain?.title} - Propuesta
                            </h4>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-gray-400">Finca:</span>
                                <div className="text-gray-200 font-medium">{proposalData.propertyNumber}</div>
                              </div>
                              <div>
                                <span className="text-gray-400">Área:</span>
                                <div className="text-gray-200 font-medium">{proposalData.area}</div>
                              </div>
                            </div>

                            <div>
                              <span className="text-gray-400">Estado Legal:</span>
                              <div className="text-green-400 font-medium">{proposalData.legalStatus}</div>
                            </div>

                            <div className="border-t border-zinc-600 pt-2">
                              <h5 className="text-gray-200 font-medium mb-1 text-xs">Proyección Financiera</h5>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Precio:</span>
                                  <span className="text-gray-200 font-medium">{proposalData.basePrice}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Depósito:</span>
                                  <span className="text-blue-400 font-medium">{proposalData.deposit}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Desktop Layout - Side by side */}
                <div className="hidden md:flex">
                  {/* Left Side - Guide Content */}
                  <div className="flex-1 overflow-y-auto p-6 max-h-[80vh]">
                    <div className="space-y-4">
                      {sections.map((section, index) => {
                        const IconComponent = section.icon
                        const isExpanded = expandedSection === index
                        
                        return (
                          <motion.div
                            key={index}
                            className="bg-zinc-800/30 border border-zinc-700 rounded-xl overflow-hidden hover:border-zinc-600 transition-all duration-300"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <button
                              onClick={() => setExpandedSection(isExpanded ? null : index)}
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-zinc-800/50 ${section.color}`}>
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <h3 className="font-medium text-white text-base">
                                  {section.title}
                                </h3>
                              </div>
                              {isExpanded ? 
                                <ChevronUp className="w-4 h-4 text-gray-400" /> : 
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                              }
                            </button>
                            
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="p-4 pt-0 space-y-2 border-t border-white/5">
                                    {Array.isArray(section.content) ? 
                                      section.content.map((item, idx) => (
                                        <div key={idx} className="flex items-start gap-2 text-gray-300 text-sm">
                                          <CheckCircle className="w-3 h-3 text-green-400 mt-1 flex-shrink-0" />
                                          <span>{item}</span>
                                        </div>
                                      )) :
                                      <p className="text-gray-300 text-sm">{section.content}</p>
                                    }
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        )
                      })}

                      {/* Why Choose Us - Desktop */}
                      <motion.div
                        className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="font-medium text-white mb-3 text-sm">
                          {getTerrainTranslation('dueDiligenceGuide.whyChooseUs.title')}
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {(getTerrainTranslation('dueDiligenceGuide.whyChooseUs.points') as string[]).slice(0, 3).map((point, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-gray-300 text-xs">
                              <CheckCircle className="w-3 h-3 text-blue-400 mt-0.5 flex-shrink-0" />
                              <span>{point}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Side - Contact Form - Desktop */}
                  <div className="w-80 border-l border-zinc-700 overflow-y-auto max-h-[80vh] bg-zinc-800/20">
                    <form onSubmit={handleSubmit} className="space-y-6 p-6" noValidate>
                      <div>
                        <h3 className="text-lg font-medium text-white mb-2">
                          {getTerrainTranslation('dueDiligenceGuide.contactForm.title')}
                        </h3>
                        <p className="text-gray-200 text-sm mb-4">
                          {getTerrainTranslation('dueDiligenceGuide.contactForm.subtitle')}
                        </p>
                      </div>

                      {/* Desktop Form Fields - Same as mobile but with larger spacing */}
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="fullName" className="text-white font-medium flex items-center text-sm">
                            <User className="w-4 h-4 mr-2 text-gray-400" />
                            Nombre completo *
                          </Label>
                          <Input
                            id="fullName"
                            value={formData.fullName}
                            onChange={(e) => handleInputChange('fullName', e.target.value)}
                            placeholder="Tu nombre completo"
                            className="bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="email" className="text-white font-medium flex items-center text-sm">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            Email *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="tu@correo.com"
                            className="bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 text-sm"
                            required
                          />
                        </div>

                        <div>
                          <Label htmlFor="whatsapp" className="text-white font-medium flex items-center text-sm">
                            <Phone className="w-4 h-4 mr-2 text-gray-400" />
                            WhatsApp
                          </Label>
                          <Input
                            id="whatsapp"
                            type="tel"
                            value={formData.whatsapp}
                            onChange={handleWhatsAppChange}
                            placeholder="+506 8888 8888"
                            className="bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 text-sm"
                          />
                        </div>

                        <div>
                          <Label className="text-white font-medium flex items-center text-sm">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            Propiedad seleccionada
                          </Label>
                          <div className="bg-zinc-800/50 border border-white/10 rounded-lg p-3 text-sm">
                            <div className="text-white font-medium text-sm">{selectedTerrain?.title || 'Consulta general'}</div>
                            <div className="text-gray-400 text-xs mt-1">
                              {selectedTerrain?.location || 'Múltiples ubicaciones disponibles'} • {selectedTerrain?.area || 'Varias opciones'}
                            </div>
                            {selectedTerrain?.price && (
                              <div className="text-blue-400 text-xs mt-1 font-medium">{selectedTerrain.price}</div>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message" className="text-white font-medium flex items-center text-sm">
                            <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                            Mensaje *
                          </Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleInputChange('message', e.target.value)}
                            placeholder="Cuéntanos sobre tu proyecto o dudas específicas..."
                            rows={3}
                            className="bg-zinc-900 border-zinc-700 focus:border-white resize-none transition-all duration-300 text-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Button 
                          type="submit" 
                          disabled={isLoading}
                          className="w-full angular-button disabled:opacity-50 disabled:cursor-not-allowed h-12 !flex !items-center !justify-center text-sm"
                        >
                          <Send className="mr-2 w-4 h-4" />
                          {isLoading ? 'Enviando...' : 'Solicitar Asesoría'}
                          <div className="angular-button-overlay" />
                        </Button>
                        
                        <button
                          type="button"
                          onClick={handleEasyChat}
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm border border-green-500/30 hover:border-green-500/50"
                        >
                          <MessageSquare className="w-4 h-4" />
                          Easy Chat - WhatsApp
                        </button>
                      </div>

                      {proposalData && (
                        <div className="bg-zinc-800/30 border border-white/10 rounded-lg p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <h4 className="font-medium text-white text-sm">
                              {selectedTerrain?.title} - Propuesta
                            </h4>
                          </div>

                          <div className="space-y-2 text-xs">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <span className="text-gray-500">Finca:</span>
                                <div className="text-gray-300 font-medium">{proposalData.propertyNumber}</div>
                              </div>
                              <div>
                                <span className="text-gray-500">Área:</span>
                                <div className="text-gray-300 font-medium">{proposalData.area}</div>
                              </div>
                            </div>

                            <div>
                              <span className="text-gray-500">Estado Legal:</span>
                              <div className="text-green-400 font-medium">{proposalData.legalStatus}</div>
                            </div>

                            <div className="border-t border-white/10 pt-2">
                              <h5 className="text-gray-300 font-medium mb-1 text-xs">Proyección Financiera</h5>
                              <div className="space-y-1">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Precio:</span>
                                  <span className="text-gray-300 font-medium">{proposalData.basePrice}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Depósito:</span>
                                  <span className="text-blue-400 font-medium">{proposalData.deposit}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}