'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Users, 
  MapPin,
  Phone,
  Mail,
  Shield,
  Clock
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
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const bookingNumber = searchParams.get('booking')
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    if (bookingNumber) {
      // In a real app, you'd fetch booking details from your database
      // For now, we'll simulate the booking data
      setTimeout(() => {
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
          specialRequests: 'Near the facilities please'
        })
        setIsLoading(false)
      }, 1000)
    } else {
      setIsLoading(false)
    }
  }, [bookingNumber])

  const handlePayment = async () => {
    if (!paymentMethod) {
      toast({
        title: 'Payment Method Required',
        description: 'Please select a payment method',
        variant: 'destructive'
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: 'Payment Successful!',
        description: 'Your booking has been confirmed and paid for.',
        variant: 'success'
      })
      // In a real app, you'd update the booking status in your database
      setBooking(prev => prev ? { ...prev, status: 'paid' } : null)
    }, 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nature-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading booking details...</p>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Booking Not Found</h2>
            <p className="text-slate-600 mb-6">
              We couldn't find a booking with that reference number. Please check your email or contact us directly.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Return to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
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
      case 'paid': return <Shield className="h-4 w-4" />
      case 'cancelled': return <AlertCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
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
              Complete Your Booking
            </h1>
            <p className="text-lg text-slate-600">
              Secure your Lake District getaway with a quick and easy payment
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-nature-600" />
                    Booking Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Booking Reference</span>
                    <span className="font-mono font-bold text-slate-900">{booking.bookingNumber}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Status</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="border-t pt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Name</span>
                      <span className="font-medium">{booking.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Email</span>
                      <span className="font-medium">{booking.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Phone</span>
                      <span className="font-medium">{booking.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Arrival</span>
                      <span className="font-medium">{new Date(booking.arrivalDate).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Departure</span>
                      <span className="font-medium">{new Date(booking.departureDate).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Nights</span>
                      <span className="font-medium">{booking.nights}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Guests</span>
                      <span className="font-medium">{booking.guests}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Accommodation</span>
                      <span className="font-medium capitalize">{booking.accommodationType.replace('-', ' ')}</span>
                    </div>
                    {booking.specialRequests && (
                      <div className="flex justify-between">
                        <span className="text-slate-600">Special Requests</span>
                        <span className="font-medium text-right max-w-48">{booking.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-nature-600" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">+44 17687 12345</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-slate-500" />
                    <span className="text-slate-600">bookings@setmabanningcaravanpark.co.uk</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Section */}
            <div className="space-y-6">
              {booking.status === 'paid' ? (
                <Card className="border-green-200 bg-green-50">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Payment Complete!</h2>
                    <p className="text-slate-600 mb-6">
                      Your booking has been confirmed and paid for. You'll receive a confirmation email shortly.
                    </p>
                    <Button onClick={() => window.location.href = '/'}>
                      Return to Home
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-nature-600" />
                      Payment Information
                    </CardTitle>
                    <CardDescription>
                      Complete your booking with a secure payment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Payment Method Selection */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Payment Method *
                      </label>
                      <Select onValueChange={setPaymentMethod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="card">Credit/Debit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Card Details (if card selected) */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Card Number
                          </label>
                          <Input placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              Expiry Date
                            </label>
                            <Input placeholder="MM/YY" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                              CVV
                            </label>
                            <Input placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Cardholder Name
                          </label>
                          <Input placeholder="John Smith" />
                        </div>
                      </div>
                    )}

                    {/* Total Amount */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Amount</span>
                        <span className="text-nature-600">£{booking.totalPrice}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">
                        Includes all taxes and fees
                      </p>
                    </div>

                    {/* Payment Button */}
                    <Button
                      onClick={handlePayment}
                      disabled={isProcessing || !paymentMethod}
                      className="w-full bg-nature-600 hover:bg-nature-700"
                      size="lg"
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4 mr-2" />
                          Pay £{booking.totalPrice}
                        </>
                      )}
                    </Button>

                    {/* Security Notice */}
                    <div className="text-center text-sm text-slate-500">
                      <Shield className="h-4 w-4 inline mr-1" />
                      Your payment is secured with 256-bit SSL encryption
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Terms and Conditions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Terms & Conditions</CardTitle>
                </CardHeader>
                <CardContent className="text-xs text-slate-600 space-y-2">
                  <p>• Payment is required to confirm your booking</p>
                  <p>• Cancellations made 48+ hours before arrival receive full refund</p>
                  <p>• Cancellations made 24-48 hours before arrival receive 50% refund</p>
                  <p>• No refunds for cancellations made less than 24 hours before arrival</p>
                  <p>• Check-in is from 2pm, check-out is by 11am</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
