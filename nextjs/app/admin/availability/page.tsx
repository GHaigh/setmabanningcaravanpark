'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdminNav } from '@/components/admin-nav'
import { siteConfig } from '@/data/site'

interface AvailabilityBlock {
  id: string
  accommodationType: string
  startDate: string
  endDate: string
  reason: string
  isBlocked: boolean
}

export default function AvailabilityPage() {
  const [availabilityBlocks, setAvailabilityBlocks] = useState<AvailabilityBlock[]>([])
  const [selectedAccommodation, setSelectedAccommodation] = useState('tent-pitches')
  const [newBlock, setNewBlock] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    isBlocked: true
  })

  useEffect(() => {
    loadAvailabilityBlocks()
  }, [])

  const loadAvailabilityBlocks = () => {
    const stored = localStorage.getItem('availabilityBlocks')
    if (stored) {
      setAvailabilityBlocks(JSON.parse(stored))
    }
  }

  const saveAvailabilityBlocks = (blocks: AvailabilityBlock[]) => {
    setAvailabilityBlocks(blocks)
    localStorage.setItem('availabilityBlocks', JSON.stringify(blocks))
  }

  const addAvailabilityBlock = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlock.startDate || !newBlock.endDate) return

    const block: AvailabilityBlock = {
      id: Date.now().toString(),
      accommodationType: selectedAccommodation,
      startDate: newBlock.startDate,
      endDate: newBlock.endDate,
      reason: newBlock.reason,
      isBlocked: newBlock.isBlocked
    }

    const updatedBlocks = [...availabilityBlocks, block]
    saveAvailabilityBlocks(updatedBlocks)
    setNewBlock({ startDate: '', endDate: '', reason: '', isBlocked: true })
  }

  const removeAvailabilityBlock = (blockId: string) => {
    if (confirm('Are you sure you want to remove this availability block?')) {
      const updatedBlocks = availabilityBlocks.filter(block => block.id !== blockId)
      saveAvailabilityBlocks(updatedBlocks)
    }
  }

  const getFilteredBlocks = () => {
    return availabilityBlocks.filter(block => block.accommodationType === selectedAccommodation)
  }

  const isDateInRange = (date: string, startDate: string, endDate: string) => {
    const checkDate = new Date(date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return checkDate >= start && checkDate <= end
  }

  const getAvailabilityForDate = (date: string) => {
    const blocks = getFilteredBlocks()
    const blockedBlock = blocks.find(block => 
      block.isBlocked && isDateInRange(date, block.startDate, block.endDate)
    )
    return blockedBlock ? { isAvailable: false, reason: blockedBlock.reason } : { isAvailable: true, reason: '' }
  }

  const generateCalendarDays = () => {
    const today = new Date()
    const currentMonth = today.getMonth()
    const currentYear = today.getFullYear()
    const firstDay = new Date(currentYear, currentMonth, 1)
    const lastDay = new Date(currentYear, currentMonth + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const dateString = date.toISOString().split('T')[0]
      const availability = getAvailabilityForDate(dateString)
      
      days.push({
        day,
        date: dateString,
        isToday: day === today.getDate(),
        ...availability
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Availability Management</h1>
          <p className="text-slate-600">Manage available dates for each accommodation type</p>
        </div>

        {/* Navigation */}
        <AdminNav />

        {/* Accommodation Selector */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Accommodation Type
                </label>
                <select
                  value={selectedAccommodation}
                  onChange={(e) => setSelectedAccommodation(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  {siteConfig.accommodations.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Add Availability Block */}
          <Card>
            <CardHeader>
              <CardTitle>Add Availability Block</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={addAvailabilityBlock} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={newBlock.startDate}
                    onChange={(e) => setNewBlock({ ...newBlock, startDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={newBlock.endDate}
                    onChange={(e) => setNewBlock({ ...newBlock, endDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Reason
                  </label>
                  <Input
                    type="text"
                    value={newBlock.reason}
                    onChange={(e) => setNewBlock({ ...newBlock, reason: e.target.value })}
                    placeholder="e.g., Maintenance, Private booking"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isBlocked"
                    checked={newBlock.isBlocked}
                    onChange={(e) => setNewBlock({ ...newBlock, isBlocked: e.target.checked })}
                    className="rounded"
                  />
                  <label htmlFor="isBlocked" className="text-sm text-slate-700">
                    Block these dates (uncheck to make available)
                  </label>
                </div>
                <Button type="submit" className="w-full">
                  Add Block
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Current Blocks */}
          <Card>
            <CardHeader>
              <CardTitle>Current Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              {getFilteredBlocks().length === 0 ? (
                <div className="text-center py-4 text-slate-600">
                  No availability blocks for this accommodation type
                </div>
              ) : (
                <div className="space-y-3">
                  {getFilteredBlocks().map((block) => (
                    <div key={block.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="font-medium">
                          {new Date(block.startDate).toLocaleDateString('en-GB')} - {new Date(block.endDate).toLocaleDateString('en-GB')}
                        </div>
                        <div className="text-sm text-slate-600">
                          {block.isBlocked ? 'Blocked' : 'Available'} - {block.reason}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeAvailabilityBlock(block.id)}
                        className="text-red-600 border-red-300 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Calendar View */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>
              {monthNames[new Date().getMonth()]} {new Date().getFullYear()} - {siteConfig.accommodations.find(acc => acc.id === selectedAccommodation)?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {/* Day headers */}
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-slate-600 bg-slate-100">
                  {day}
                </div>
              ))}
              
              {/* Calendar days */}
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={index} className="p-2"></div>
                }

                return (
                  <motion.div
                    key={day.date}
                    className={`p-2 text-center border rounded-lg ${
                      day.isToday 
                        ? 'bg-blue-100 border-blue-300 font-bold' 
                        : day.isAvailable 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    title={day.reason || (day.isAvailable ? 'Available' : 'Blocked')}
                  >
                    <div className="text-sm">{day.day}</div>
                    <div className={`text-xs ${day.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                      {day.isAvailable ? '✓' : '✗'}
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="mt-4 flex justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-50 border border-red-200 rounded"></div>
                <span>Blocked</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                <span>Today</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
