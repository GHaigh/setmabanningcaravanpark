'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AdminNav } from '@/components/admin-nav'
import { ImageUpload } from '@/components/admin/image-upload'
import { siteConfig } from '@/data/site'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  accommodationType: string
  arrivalDate: string
  departureDate: string
  guests: number
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'cancelled'
  totalPrice: number
  createdAt: string
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])
  const [selectedAccommodation, setSelectedAccommodation] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [activeTab, setActiveTab] = useState('bookings')
  const router = useRouter()

  // Simple authentication check
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuth')
      if (auth === 'authenticated') {
        setIsAuthenticated(true)
        loadBookings()
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple hardcoded credentials - in production, use proper authentication
    if (username === 'admin' && password === 'setmabanning2024') {
      localStorage.setItem('adminAuth', 'authenticated')
      setIsAuthenticated(true)
      loadBookings()
    } else {
      alert('Invalid credentials')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuth')
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const loadBookings = async () => {
    // In a real app, this would fetch from your database
    // For now, we'll use localStorage to simulate stored bookings
    const storedBookings = localStorage.getItem('bookings')
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }

  const updateBookingStatus = (bookingId: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status } : booking
    )
    setBookings(updatedBookings)
    localStorage.setItem('bookings', JSON.stringify(updatedBookings))
  }

  const deleteBooking = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId)
      setBookings(updatedBookings)
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
    }
  }

  const filteredBookings = bookings.filter(booking => {
    const accommodationMatch = selectedAccommodation === 'all' || booking.accommodationType === selectedAccommodation
    const statusMatch = selectedStatus === 'all' || booking.status === selectedStatus
    return accommodationMatch && statusMatch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(price)
  }

  const handleImageUploaded = (imageName: string, imageUrl: string) => {
    // In a real app, this would update the database
    console.log('Image uploaded:', imageName, imageUrl)
    // You could trigger a refresh of the gallery here
  }

  const handleImageReplaced = (galleryIndex: number, newImageUrl: string) => {
    // In a real app, this would update the database
    console.log('Image replaced:', galleryIndex, newImageUrl)
    // Store the replacement in localStorage for demo
    const replacements = JSON.parse(localStorage.getItem('galleryReplacements') || '{}')
    replacements[galleryIndex] = newImageUrl
    localStorage.setItem('galleryReplacements', JSON.stringify(replacements))
    
    // Trigger a page refresh to show the new image
    window.location.reload()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-nature-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl font-bold text-slate-900">
                Admin Login
              </CardTitle>
              <p className="text-center text-slate-600">
                Setmabanning Caravan Park
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600">Manage bookings and availability</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        {/* Navigation */}
        <AdminNav />

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-slate-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-nature-500 text-nature-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('images')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'images'
                    ? 'border-nature-500 text-nature-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                Image Management
              </button>
            </nav>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'bookings' && (
          <>
            {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-900">
                {bookings.length}
              </div>
              <div className="text-slate-600">Total Bookings</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'confirmed').length}
              </div>
              <div className="text-slate-600">Confirmed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'pending').length}
              </div>
              <div className="text-slate-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-slate-900">
                {formatPrice(bookings.reduce((sum, booking) => sum + booking.totalPrice, 0))}
              </div>
              <div className="text-slate-600">Total Revenue</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Accommodation Type
                </label>
                <select
                  value={selectedAccommodation}
                  onChange={(e) => setSelectedAccommodation(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  <option value="all">All Types</option>
                  {siteConfig.accommodations.map(acc => (
                    <option key={acc.id} value={acc.id}>
                      {acc.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-slate-300 rounded-md px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bookings Table */}
        <Card>
          <CardHeader>
            <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8 text-slate-600">
                No bookings found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Customer</th>
                      <th className="text-left py-3 px-4">Accommodation</th>
                      <th className="text-left py-3 px-4">Dates</th>
                      <th className="text-left py-3 px-4">Guests</th>
                      <th className="text-left py-3 px-4">Total</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-slate-50">
                        <td className="py-3 px-4">
                          <div>
                            <div className="font-medium">{booking.name}</div>
                            <div className="text-sm text-slate-600">{booking.email}</div>
                            <div className="text-sm text-slate-600">{booking.phone}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {siteConfig.accommodations.find(acc => acc.id === booking.accommodationType)?.title || booking.accommodationType}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>{new Date(booking.arrivalDate).toLocaleDateString('en-GB')}</div>
                            <div className="text-slate-600">to {new Date(booking.departureDate).toLocaleDateString('en-GB')}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{booking.guests}</td>
                        <td className="py-3 px-4 font-medium">{formatPrice(booking.totalPrice)}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {booking.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                Confirm
                              </Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                Cancel
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteBooking(booking.id)}
                              className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
          </>
        )}

        {activeTab === 'images' && (
          <Card>
            <CardHeader>
              <CardTitle>Image Management</CardTitle>
              <p className="text-slate-600">
                Upload and manage images for your website gallery and other sections.
              </p>
            </CardHeader>
            <CardContent>
              <ImageUpload 
                onImageUploaded={handleImageUploaded} 
                onImageReplaced={handleImageReplaced}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
