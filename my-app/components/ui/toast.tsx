"use client"

import { useEffect } from "react"
import { CheckCircle2, X } from "lucide-react"

interface ToastProps {
  message: string
  onClose: () => void
  duration?: number
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className="fixed top-20 right-4 z-[100] animate-slide-in-right">
      <div className="bg-white border-2 border-[#8B6F47] rounded-lg shadow-xl p-4 pr-12 flex items-center gap-3 min-w-[300px] max-w-md">
        <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0" />
        <p className="text-sm font-medium text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
