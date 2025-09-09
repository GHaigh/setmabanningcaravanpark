'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AdminNav } from '@/components/admin-nav'

export default function DemoDataPage() {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateDemoBookings = () => {
    setIsGenerating(true)
    
    const demoBookings = [
      {
        id: 'SCP-001-001',
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '07123 456789',
        accommodationType: 'tent-pitches',
        arrivalDate: '2024-09-15',
        departureDate: '2024-09-17',
        guests: 2,
        specialRequests: 'Would like a pitch near the facilities',
        status: 'confirmed',
        totalPrice: 50,
        createdAt: '2024-09-01T10:00:00Z'
      },
      {
        id: 'SCP-002-002',
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '07987 654321',
        accommodationType: 'holiday-homes',
        arrivalDate: '2024-09-20',
        departureDate: '2024-09-25',
        guests: 4,
        specialRequests: 'Family with two young children',
        status: 'pending',
        totalPrice: 600,
        createdAt: '2024-09-02T14:30:00Z'
      },
      {
        id: 'SCP-003-003',
        name: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        phone: '07555 123456',
        accommodationType: 'campervan-pitches',
        arrivalDate: '2024-09-10',
        departureDate: '2024-09-12',
        guests: 2,
        status: 'confirmed',
        totalPrice: 70,
        createdAt: '2024-08-28T09:15:00Z'
      },
      {
        id: 'SCP-004-004',
        name: 'Emma Davis',
        email: 'emma.davis@email.com',
        phone: '07333 987654',
        accommodationType: 'tent-pitches',
        arrivalDate: '2024-09-08',
        departureDate: '2024-09-10',
        guests: 3,
        specialRequests: 'Bringing a dog',
        status: 'cancelled',
        totalPrice: 50,
        createdAt: '2024-08-25T16:45:00Z'
      },
      {
        id: 'SCP-005-005',
        name: 'Robert Brown',
        email: 'robert.brown@email.com',
        phone: '07777 555555',
        accommodationType: 'holiday-homes',
        arrivalDate: '2024-09-30',
        departureDate: '2024-10-05',
        guests: 6,
        specialRequests: 'Celebrating anniversary',
        status: 'pending',
        totalPrice: 600,
        createdAt: '2024-09-03T11:20:00Z'
      }
    ]

    localStorage.setItem('bookings', JSON.stringify(demoBookings))
    
    setTimeout(() => {
      setIsGenerating(false)
      alert('Demo bookings generated successfully!')
    }, 1000)
  }

  const generateDemoAvailability = () => {
    const demoAvailability = [
      {
        id: '1',
        accommodationType: 'tent-pitches',
        startDate: '2024-09-25',
        endDate: '2024-09-27',
        reason: 'Maintenance work',
        isBlocked: true
      },
      {
        id: '2',
        accommodationType: 'holiday-homes',
        startDate: '2024-10-10',
        endDate: '2024-10-15',
        reason: 'Private family booking',
        isBlocked: true
      },
      {
        id: '3',
        accommodationType: 'campervan-pitches',
        startDate: '2024-09-05',
        endDate: '2024-09-07',
        reason: 'Site inspection',
        isBlocked: true
      }
    ]

    localStorage.setItem('availabilityBlocks', JSON.stringify(demoAvailability))
    alert('Demo availability blocks generated successfully!')
  }

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all demo data? This cannot be undone.')) {
      localStorage.removeItem('bookings')
      localStorage.removeItem('availabilityBlocks')
      alert('All demo data cleared!')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Demo Data Generator</h1>
          <p className="text-slate-600">Generate sample data for testing the admin system</p>
        </div>

        {/* Navigation */}
        <AdminNav />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Generate Bookings */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Demo Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Create sample bookings with different statuses and accommodation types for testing the booking management system.
              </p>
              <Button 
                onClick={generateDemoBookings}
                disabled={isGenerating}
                className="w-full"
              >
                {isGenerating ? 'Generating...' : 'Generate Bookings'}
              </Button>
            </CardContent>
          </Card>

          {/* Generate Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Demo Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Create sample availability blocks for different accommodation types to test the calendar system.
              </p>
              <Button 
                onClick={generateDemoAvailability}
                className="w-full"
              >
                Generate Availability
              </Button>
            </CardContent>
          </Card>

          {/* Clear Data */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Clear All Demo Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 mb-4">
                Remove all generated demo data from the system. This will clear both bookings and availability blocks.
              </p>
              <Button 
                onClick={clearAllData}
                variant="outline"
                className="w-full border-red-300 text-red-600 hover:bg-red-50"
              >
                Clear All Data
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-slate-600">
              <p>1. <strong>Generate Demo Bookings:</strong> Creates 5 sample bookings with different statuses (confirmed, pending, cancelled)</p>
              <p>2. <strong>Generate Demo Availability:</strong> Creates sample availability blocks for testing the calendar</p>
              <p>3. <strong>Test the Admin System:</strong> Go to the Dashboard to see and manage the generated bookings</p>
              <p>4. <strong>Test Availability Management:</strong> Go to Availability to see and manage the calendar blocks</p>
              <p>5. <strong>Clear Data:</strong> Remove all demo data when you're done testing</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
