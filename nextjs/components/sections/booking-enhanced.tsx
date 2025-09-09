'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Calendar, Users, MapPin, Clock, CheckCircle, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

export function BookingEnhanced() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    accommodation: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const accommodationTypes = [
    { id: 'tent-pitches', name: 'Tent Pitches', price: '£15/night', description: 'Grass pitches with electric hook-up' },
    { id: 'hardstanding-pitches', name: 'Hardstanding Pitches', price: '£35/night', description: 'Hardstanding with electric hook-up' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto text-center py-16"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Booking Request Sent!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your interest in Setmabanning Caravan Park. We'll get back to you within 24 hours to confirm your booking.
        </p>
        <Button 
          onClick={() => setIsSubmitted(false)}
          className="bg-yellow-500 hover:bg-yellow-600 text-black"
        >
          Make Another Booking
        </Button>
      </motion.div>
    )
  }

  return (
    <section id="booking" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Book Your Perfect
            <span className="block text-yellow-600">Lake District Getaway</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the beauty of the Lake District from our peaceful, working Cumbrian farm. 
            Family-run for over 50 years, offering authentic camping in the heart of nature.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl flex items-center">
                  <Calendar className="mr-3 h-6 w-6" />
                  Make a Booking Request
                </CardTitle>
                <p className="text-yellow-100 mt-2">
                  We'll confirm availability and send you booking details within 24 hours
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        required
                        className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 123 456 7890"
                        className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Guests *
                      </label>
                      <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                        <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg">
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? 'Guest' : 'Guests'}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Accommodation Type *
                    </label>
                    <Select value={formData.accommodation} onValueChange={(value) => setFormData({ ...formData, accommodation: value })}>
                      <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg">
                        <SelectValue placeholder="Choose your accommodation" />
                      </SelectTrigger>
                      <SelectContent>
                        {accommodationTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            <div className="flex items-center justify-between w-full">
                              <span>{type.name}</span>
                              <span className="text-yellow-600 font-semibold ml-4">{type.price}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-in Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.checkIn}
                        onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                        required
                        className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Check-out Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.checkOut}
                        onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                        required
                        className="h-12 border-2 border-gray-200 focus:border-yellow-500 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests or Questions
                    </label>
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Any special requirements, questions, or requests..."
                      rows={4}
                      className="border-2 border-gray-200 focus:border-yellow-500 rounded-lg resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-3"></div>
                        Sending Request...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        Send Booking Request
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Why Choose Us */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" />
                  Why Choose Setmabanning?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { icon: Users, text: 'Family-run for 50+ years' },
                  { icon: MapPin, text: 'Heart of the Lake District' },
                  { icon: CheckCircle, text: 'Pet-friendly camping' },
                  { icon: Clock, text: 'Flexible check-in times' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-yellow-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-yellow-50 to-yellow-100">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Questions about your booking or our facilities?
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white"
                  >
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Accommodation Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {accommodationTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-gray-900">{type.name}</p>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    <span className="font-bold text-yellow-600">{type.price}</span>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
