import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatPhoneNumber(phone: string): string {
  // Format UK phone numbers
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('44')) {
    return `+${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  if (cleaned.startsWith('0')) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  return phone
}

export function generateBookingReference(): string {
  const prefix = 'SET'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}${timestamp}${random}`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+44|0)[0-9]{10,11}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function calculateNights(checkIn: Date, checkOut: Date): number {
  const timeDiff = checkOut.getTime() - checkIn.getTime()
  return Math.ceil(timeDiff / (1000 * 3600 * 24))
}

export function isDateInPast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export function getMinCheckOutDate(checkIn: Date): Date {
  const minCheckOut = new Date(checkIn)
  minCheckOut.setDate(minCheckOut.getDate() + 1)
  return minCheckOut
}

export function getMaxCheckInDate(): Date {
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  return maxDate
}
