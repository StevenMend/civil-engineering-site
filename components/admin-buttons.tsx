"use client"

import { Button } from "@/components/ui/button"
import { Plus, Trash2, Edit } from "lucide-react"
import { useAdmin } from "@/hooks/use-admin"

interface AdminButtonsProps {
  onAddProperty?: () => void
  onDeleteProperty?: () => void
  onEditProperty?: () => void
  variant?: "add" | "delete" | "edit"
  className?: string
}

export default function AdminButtons({ 
  onAddProperty, 
  onDeleteProperty, 
  onEditProperty, 
  variant = "add",
  className = ""
}: AdminButtonsProps) {
  const { isAdmin } = useAdmin()

  if (!isAdmin) return null

  if (variant === "add") {
    return (
      <Button
        onClick={onAddProperty}
        className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar Propiedad
      </Button>
    )
  }

  if (variant === "delete") {
    return (
      <Button
        onClick={onDeleteProperty}
        size="sm"
        variant="destructive"
        className={`opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    )
  }

  if (variant === "edit") {
    return (
      <Button
        onClick={onEditProperty}
        size="sm"
        variant="secondary"
        className={`opacity-0 group-hover:opacity-100 transition-opacity ${className}`}
      >
        <Edit className="w-4 h-4" />
      </Button>
    )
  }

  return null
}