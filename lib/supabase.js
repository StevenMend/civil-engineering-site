import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://piarygrlprzgmovcrdtw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYXJ5Z3JscHJ6Z21vdmNyZHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5MTY2MTQsImV4cCI6MjA3MjQ5MjYxNH0.cuwClVwxx6veTTwGl-ADnJhRNGnNtfuN0MkhwfRnGxk'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// CRUD Functions para propiedades
export const propertyService = {
  // Obtener todas las propiedades
  async getAllProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Obtener propiedades destacadas (para homepage)
  async getFeaturedProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3)
    
    if (error) throw error
    return data
  },

  // Crear nueva propiedad
  async createProperty(property) {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Actualizar propiedad
  async updateProperty(id, updates) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Eliminar propiedad
  async deleteProperty(id) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  },

  // Subir imagen
  async uploadImage(file, filename) {
    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(filename, file)
    
    if (error) throw error
    
    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('property-images')
      .getPublicUrl(filename)
    
    return publicUrl
  }
}