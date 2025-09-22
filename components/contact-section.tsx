"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Sparkles, MapPin, MessageSquare, User, Mail, Phone, ArrowRight } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect, useCallback } from "react"

export default function ContactSection() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '+',
    projectType: '',
    projectLocation: '',
    idea: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [focusedField, setFocusedField] = useState(null)

  const projectTypes = [
    { value: 'house', label: 'House' },
    { value: 'restaurant', label: 'Restaurant' },
    { value: 'hotel', label: 'Hotel' },
    { value: 'resort', label: 'Resort' },
    { value: 'park', label: 'Park' },
    { value: 'other', label: 'Other' }
  ]

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!formData.fullName || !formData.email || !formData.idea) {
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
      projectType: formData.projectType,
      projectLocation: formData.projectLocation,
      message: formData.idea,
      _subject: `Nueva consulta de proyecto - ${formData.fullName}`,
      _replyto: formData.email
    }
    
    console.log('Enviando a ambos forms:', formPayload)
    
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
      
      console.log('Response Box (compa):', response1.status)
      console.log('Response Steven (tuyo):', response2.status)
      
      if (response1.ok || response2.ok) {
        setStatus({
          type: 'success',
          message: 'Mensaje enviado exitosamente. Te contactaremos pronto.'
        })
        
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '+',
          projectType: '',
          projectLocation: '',
          idea: ''
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

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-zinc-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/2 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto max-w-4xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-title text-3xl md:text-4xl mb-4 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)] drop-shadow-[0_0_16px_rgba(255,255,255,0.7)] drop-shadow-[0_0_24px_rgba(255,255,255,0.5)] drop-shadow-[0_0_32px_rgba(255,255,255,0.3)]">
            SCHEDULE YOUR FREE CONSULTATION
          </h2>
          <p className="text-gray-200 font-satoshi max-w-2xl mx-auto drop-shadow-[0_0_6px_rgba(255,255,255,0.7)] drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] drop-shadow-[0_0_18px_rgba(255,255,255,0.3)]">
            Please complete the form below. We will respond shortly to schedule a call where
            we can show you how we can help bring your architectural vision to life.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl" />
          
          {/* Neon border effect */}
          <div className="absolute inset-0 rounded-2xl">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20 blur-sm"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
            <div className="absolute bottom-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
          </div>
          
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="relative space-y-6 p-8 md:p-10 rounded-2xl"
            noValidate
          >
            {/* Toast */}
            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className={`absolute -top-6 left-4 right-4 z-20 px-6 py-4 rounded-xl text-sm font-medium text-center backdrop-blur-md border shadow-2xl ${
                    status.type === 'success' 
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                      : 'bg-red-500/20 text-red-300 border-red-500/30'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Contact Info Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-3">
                <Label htmlFor="fullName" className="text-white font-medium flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  Full Name *
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  onFocus={() => setFocusedField('fullName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your full name"
                  className={`bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 relative ${
                    focusedField === 'fullName' ? 'ring-2 ring-white/20 shadow-lg shadow-white/10' : ''
                  }`}
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white font-medium flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  className={`bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 ${
                    focusedField === 'email' ? 'ring-2 ring-white/20 shadow-lg shadow-white/10' : ''
                  }`}
                  required
                />
              </div>
            </div>

            {/* WhatsApp */}
            <div className="space-y-3">
              <Label htmlFor="whatsapp" className="text-white font-medium flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                National or international WhatsApp number
              </Label>
              <Input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                value={formData.whatsapp}
                onChange={handleWhatsAppChange}
                onFocus={() => setFocusedField('whatsapp')}
                onBlur={() => setFocusedField(null)}
                placeholder="+506 8888 8888"
                className={`bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 ${
                  focusedField === 'whatsapp' ? 'ring-2 ring-white/20' : ''
                }`}
              />
            </div>

            {/* Project Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Project Type */}
              <div className="space-y-3">
                <Label htmlFor="projectType" className="text-white font-medium flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 text-gray-400" />
                  Project Type
                </Label>
                <Select 
                  value={formData.projectType} 
                  onValueChange={(value) => handleInputChange('projectType', value)}
                >
                  <SelectTrigger 
                    id="projectType" 
                    className="bg-zinc-900 border-zinc-700 focus:border-white h-12 transition-all duration-300"
                  >
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                    {projectTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Project Location */}
              <div className="space-y-3">
                <Label htmlFor="projectLocation" className="text-white font-medium flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  Project Location
                </Label>
                <Input
                  id="projectLocation"
                  name="projectLocation"
                  type="text"
                  value={formData.projectLocation}
                  onChange={(e) => handleInputChange('projectLocation', e.target.value)}
                  onFocus={() => setFocusedField('projectLocation')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Province, Canton"
                  className={`bg-zinc-900 border-zinc-700 focus:border-white transition-all duration-300 pl-4 h-12 ${
                    focusedField === 'projectLocation' ? 'ring-2 ring-white/20' : ''
                  }`}
                />
              </div>
            </div>

            {/* Project Idea */}
            <div className="space-y-3">
              <Label htmlFor="idea" className="text-white font-medium flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-gray-400" />
                Briefly tell us your idea *
              </Label>
              <Textarea
                id="idea"
                name="idea"
                value={formData.idea}
                onChange={(e) => handleInputChange('idea', e.target.value)}
                onFocus={() => setFocusedField('idea')}
                onBlur={() => setFocusedField(null)}
                placeholder="Ex: I want to build a small house for rent near the beach"
                rows={5}
                className={`bg-zinc-900 border-zinc-700 focus:border-white resize-none transition-all duration-300 ${
                  focusedField === 'idea' ? 'ring-2 ring-white/20' : ''
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full angular-button disabled:opacity-50 disabled:cursor-not-allowed h-14 !flex !items-center !justify-center !py-0"
              >
                <Send className="mr-2 w-4 h-4" />
                {isLoading ? 'Enviando...' : 'Enviar Consulta'}
                <div className="angular-button-overlay" />
              </Button>
            </div>
          </form>
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm tracking-wide">
            Te contactaremos dentro de 24 horas para discutir tu proyecto
          </p>
        </motion.div>
      </div>
    </section>
  )
}
