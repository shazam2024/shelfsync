import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatDate(date) {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function formatTime(date) {
  const d = new Date(date)
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0) {
    return `${hours}h ${mins}m`
  }
  return `${mins}m`
}

export function getDaysDifference(date1, date2) {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = Math.abs(d2.getTime() - d1.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export function getStatusColor(status) {
  switch (status.toLowerCase()) {
    case 'active':
    case 'present':
    case 'paid':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200'
    case 'expired':
    case 'absent':
    case 'overdue':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'inactive':
    case 'irregular':
      return 'bg-amber-100 text-amber-800 border-amber-200'
    case 'warning':
    case 'expiring soon':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

export const simulateApiCall = (data, delay = 800) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay)
  })
}
