'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Calendar, 
  Users, 
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface BookingDetails {
  bookingNumber: string
  name: string
  email: string
  phone: string
  arrivalDate: string
  departureDate: string
  nights: number
  guests: number
  accommodationType: string
  totalPrice: number
  status: 'pending' | 'confirmed' | 'paid' | 'cancelled'
  specialRequests?: string
  createdAt: string
}

export default function BookingStatusPage() {
  const [bookingNumber, setBookingNumber] = useState('')
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!bookingNumber.trim()) {
      toast({
        title: 'Booking Number Required',
        description: 'Please enter a booking reference number',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    // In a real app, you'd fetch from your database
    // For demo purposes, we'll simulate a booking lookup
    setTimeout(() => {
      if (bookingNumber.startsWith('SCP-')) {
        setBooking({
          bookingNumber,
          name: 'John Smith',
          email: 'john@example.com',
          phone: '+44 1234 567890',
          arrivalDate: '2024-06-15',
          departureDate: '2024-06-18',
          nights: 3,
          guests: 2,
          accommodationType: 'tent-pitches',
          totalPrice: 75,
          status: 'confirmed',
          specialRequests: 'Near the facilities please',
          createdAt: '2024-05-15T10:30:00Z'
        })
      } else {
        setBooking(null)
      }
      setIsLoading(false)
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'paid': return 'text-blue-600 bg-blue-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4" />
      case 'paid': return <CreditCard className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending': return 'Your booking enquiry is being reviewed. We\'ll get back to you within 24 hours.'
      case 'confirmed': return 'Your booking is confirmed! You can now pay online to secure your stay.'
      case 'paid': return 'Your booking is confirmed and paid for. We look forward to welcoming you!'
      case 'cancelled': return 'This booking has been cancelled. Please contact us if you have any questions.'
      default: return 'Unknown status'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">
              Check Booking Status
            </h1>
            <p className="text-lg text-slate-600">
              Enter your booking reference number to view your booking details
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-nature-600" />
                Find Your Booking
              </CardTitle>
              <CardDescription>
                Enter the booking reference number from your confirmation email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter booking reference (e.g., SCP-123456-789)"
                  value={bookingNumber}
                  onChange={(e) => setBookingNumber(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-nature-600 hover:bg-nature-700"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600 mx-auto mb-4"></div>
                <p className="text-slate-600">Searching for your booking...</p>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {hasSearched && !isLoading && !booking && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-8 text-center">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Booking Not Found</h2>
                <p className="text-slate-600 mb-6">
                  We couldn't find a booking with that reference number. Please check your email or contact us directly.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => {
                    setBookingNumber('')
                    setHasSearched(false)
                    setBooking(null)
                  }}>
                    Try Again
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Return to Home
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booking Details */}
          {booking && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Status Card */}
              <Card className={`border-2 ${
                booking.status === 'paid' ? 'border-green-200 bg-green-50' :
                booking.status === 'confirmed' ? 'border-blue-200 bg-blue-50' :
                booking.status === 'cancelled' ? 'border-red-200 bg-red-50' :
                'border-yellow-200 bg-yellow-50'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">
                        Booking {booking.bookingNumber}
                      </h2>
                      <p className="text-slate-600">{getStatusMessage(booking.status)}</p>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Booking Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-nature-600" />
                      Booking Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Arrival</p>
                        <p className="font-medium">{new Date(booking.arrivalDate).toLocaleDateString('en-GB')}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Departure</p>
                        <p className="font-medium">{new Date(booking.departureDate).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600">Nights</p>
                        <p className="font-medium">{booking.nights}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">Guests</p>
                        <p className="font-medium">{booking.guests}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Accommodation</p>
                      <p className="font-medium capitalize">{booking.accommodationType.replace('-', ' ')}</p>
                    </div>
                    {booking.specialRequests && (
                      <div>
                        <p className="text-sm text-slate-600">Special Requests</p>
                        <p className="font-medium">{booking.specialRequests}</p>
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Total Amount</span>
                        <span className="text-2xl font-bold text-nature-600">£{booking.totalPrice}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-nature-600" />
                      Contact Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600">Name</p>
                      <p className="font-medium">{booking.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Email</p>
                      <p className="font-medium">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Phone</p>
                      <p className="font-medium">{booking.phone}</p>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-sm text-slate-600 mb-2">Need Help?</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">+44 17687 12345</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-slate-500" />
                          <span className="text-sm">bookings@setmabanningcaravanpark.co.uk</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {booking.status === 'confirmed' && (
                  <Button 
                    onClick={() => window.location.href = `/payment?booking=${booking.bookingNumber}`}
                    className="bg-nature-600 hover:bg-nature-700"
                    size="lg"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Pay Now
                  </Button>
                )}
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Return to Home
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
