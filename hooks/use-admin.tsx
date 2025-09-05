"use client"

import { useState, useEffect, useCallback } from 'react'

const ADMIN_EMAILS = [
  "Jesusga21032001@gmail.com",
  "boxarchitectscr@gmail.com"
]

const ADMIN_DURATION = 60 * 24 * 60 * 60 * 1000 // 60 días

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkAdminStatus = useCallback(() => {
    try {
      const stored = localStorage.getItem('adminAccess')
      if (stored) {
        const data = JSON.parse(stored)
        if (Date.now() < data.expires && data.isAdmin) {
          setIsAdmin(true)
          return true
        } else {
          localStorage.removeItem('adminAccess')
          setIsAdmin(false)
          return false
        }
      }
      setIsAdmin(false)
      return false
    } catch (error) {
      console.error('Error checking admin status:', error)
      localStorage.removeItem('adminAccess')
      setIsAdmin(false)
      return false
    }
  }, [])

  useEffect(() => {
    checkAdminStatus()
    setLoading(false)
  }, [checkAdminStatus])

  const validateEmail = useCallback((email: string) => {
    if (ADMIN_EMAILS.includes(email.trim())) {
      const adminData = {
        isAdmin: true,
        expires: Date.now() + ADMIN_DURATION,
        email: email.trim()
      }
      localStorage.setItem('adminAccess', JSON.stringify(adminData))
      
      // Forzar re-render inmediato
      setIsAdmin(true)
      
      // Disparar evento personalizado para otros componentes
      window.dispatchEvent(new CustomEvent('adminStateChanged', { 
        detail: { isAdmin: true } 
      }))
      
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('adminAccess')
    setIsAdmin(false)
    
    // Disparar evento para otros componentes
    window.dispatchEvent(new CustomEvent('adminStateChanged', { 
      detail: { isAdmin: false } 
    }))
  }, [])

  // Escuchar cambios de otros componentes/pestañas
  useEffect(() => {
    const handleStorageChange = () => {
      checkAdminStatus()
    }

    const handleAdminStateChange = (event: CustomEvent) => {
      setIsAdmin(event.detail.isAdmin)
    }

    // Escuchar cambios en localStorage (otras pestañas)
    window.addEventListener('storage', handleStorageChange)
    
    // Escuchar cambios internos
    window.addEventListener('adminStateChanged', handleAdminStateChange as EventListener)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('adminStateChanged', handleAdminStateChange as EventListener)
    }
  }, [checkAdminStatus])

  return { isAdmin, loading, validateEmail, logout, checkAdminStatus }
}