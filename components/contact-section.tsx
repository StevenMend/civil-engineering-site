"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send } from "lucide-react"
import { useTranslation } from "@/lib/i18n"
import { useState, useEffect } from "react"

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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleWhatsAppChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
    
    // Asegurar que siempre empiece con +
    if (!value.startsWith('+')) {
      value = '+' + value.replace(/^\+/, '')
    }
    
    // Si el usuario intenta borrar el +, mantenerlo
    if (value === '') {
      value = '+'
    }
    
    handleInputChange('whatsapp', value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('https://formspree.io/f/mjkrpapq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          whatsapp: formData.whatsapp,
          projectType: formData.projectType,
          projectLocation: formData.projectLocation,
          message: formData.idea,
          _subject: `Nueva consulta de proyecto - ${formData.fullName}`,
          _replyto: formData.email
        })
      })

      if (response.ok) {
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
        throw new Error('Error en el envío')
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
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [status.message])

  return (
    <section id="contact" className="py-16 md:py-24 px-4 bg-zinc-950">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="section-title text-3xl md:text-4xl mb-4">{t("contact.title")}</h2>
          <p className="text-gray-400 font-satoshi">{t("contact.subtitle")}</p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative space-y-6 bg-black p-8 md:p-9"
        >
          {/* Toast discreto encima del formulario */}
          <AnimatePresence>
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="absolute top-3 left-3 right-3 z-20 
                  px-4 py-2 rounded-md text-xs font-medium text-center
                  bg-zinc-700/60 text-zinc-300 border border-zinc-600/20 backdrop-blur-sm"
              >
                {status.message}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">{t("contact.fullName")}</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder={t("contact.fullNamePlaceholder")}
                className="bg-zinc-900 border-zinc-700 focus:border-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("contact.email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t("contact.emailPlaceholder")}
                className="bg-zinc-900 border-zinc-700 focus:border-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="whatsapp">{t("contact.whatsapp")}</Label>
            <Input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleWhatsAppChange}
              placeholder="+506 8888 8888"
              className="bg-zinc-900 border-zinc-700 focus:border-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="projectType">{t("contact.projectType")}</Label>
              <Select 
                name="projectType"
                value={formData.projectType} 
                onValueChange={(value) => handleInputChange('projectType', value)}
              >
                <SelectTrigger id="projectType" className="bg-zinc-900 border-zinc-700 focus:border-white">
                  <SelectValue placeholder={t("contact.selectOption")} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                  <SelectItem value="house">{t("contact.projectType.house")}</SelectItem>
                  <SelectItem value="restaurant">{t("contact.projectType.restaurant")}</SelectItem>
                  <SelectItem value="hotel">{t("contact.projectType.hotel")}</SelectItem>
                  <SelectItem value="resort">{t("contact.projectType.resort")}</SelectItem>
                  <SelectItem value="park">{t("contact.projectType.park")}</SelectItem>
                  <SelectItem value="other">{t("contact.projectType.other")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="projectLocation">{t("contact.projectLocation")}</Label>
              <Input
                id="projectLocation"
                name="projectLocation"
                value={formData.projectLocation}
                onChange={(e) => handleInputChange('projectLocation', e.target.value)}
                placeholder={t("contact.projectLocationPlaceholder")}
                className="bg-zinc-900 border-zinc-700 focus:border-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="idea">{t("contact.idea")}</Label>
            <Textarea
              id="idea"
              name="idea"
              value={formData.idea}
              onChange={(e) => handleInputChange('idea', e.target.value)}
              placeholder={t("contact.ideaPlaceholder")}
              rows={4}
              className="bg-zinc-900 border-zinc-700 focus:border-white resize-none"
              required
            />
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full angular-button flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="mr-2 w-4 h-4" />
            {isLoading ? 'Enviando...' : t("")}
            <div className="angular-button-overlay" />
          </Button>
        </motion.form>
      </div>
    </section>
  )
}