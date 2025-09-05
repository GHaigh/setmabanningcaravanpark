'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Users, Mail, Phone, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { siteConfig } from '@/data/site'
import { calculateNights, getMinCheckOutDate, getMaxCheckInDate, formatDate } from '@/lib/utils'

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  arrivalDate: z.string().min(1, 'Please select arrival date'),
  departureDate: z.string().min(1, 'Please select departure date'),
  guests: z.string().min(1, 'Please select number of guests'),
  accommodationType: z.string().min(1, 'Please select accommodation type'),
  specialRequests: z.string().optional(),
  gdprConsent: z.boolean().refine(val => val === true, 'You must agree to our privacy policy'),
  honeypot: z.string().optional(), // Anti-spam field
})

type BookingFormData = z.infer<typeof bookingSchema>

export function Booking() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      gdprConsent: false,
      honeypot: '',
    },
  })

  const watchedArrivalDate = watch('arrivalDate')
  const watchedDepartureDate = watch('departureDate')
  const watchedGuests = watch('guests')
  const watchedAccommodationType = watch('accommodationType')

  // Calculate pricing
  const calculatePrice = () => {
    if (!watchedArrivalDate || !watchedDepartureDate || !watchedAccommodationType) return 0
    
    const arrival = new Date(watchedArrivalDate)
    const departure = new Date(watchedDepartureDate)
    const nights = calculateNights(arrival, departure)
    
    const basePrices = {
      'tent-pitches': 25,
      'campervan-spots': 35,
      'holiday-homes': 120,
    }
    
    const basePrice = basePrices[watchedAccommodationType as keyof typeof basePrices] || 0
    return basePrice * nights
  }

  const onSubmit = async (data: BookingFormData) => {
    // Check honeypot
    if (data.honeypot) {
      return // Bot detected, silently ignore
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          totalPrice: calculatePrice(),
          nights: watchedArrivalDate && watchedDepartureDate 
            ? calculateNights(new Date(watchedArrivalDate), new Date(watchedDepartureDate))
            : 0,
        }),
      })

      if (response.ok) {
        setIsSubmitted(true)
        toast({
          title: "Booking Enquiry Sent!",
          description: "Thank you for your enquiry. We'll get back to you within 24 hours.",
          variant: "success",
        })
        reset()
      } else {
        throw new Error('Failed to send enquiry')
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your enquiry. Please try again or call us directly.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const minCheckOutDate = watchedArrivalDate ? getMinCheckOutDate(new Date(watchedArrivalDate)) : new Date()
  const maxCheckInDate = getMaxCheckInDate()

  if (isSubmitted) {
    return (
      <section id="booking" className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-slate-900 mb-4 font-serif">
                  Enquiry Sent Successfully!
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  Thank you for your interest in staying with us. We'll review your enquiry 
                  and get back to you within 24 hours with availability and pricing details.
                </p>
                <div className="space-y-4">
                  <p className="text-slate-600">
                    In the meantime, feel free to explore our gallery or contact us directly 
                    if you have any questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="nature"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Enquiry
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
                    >
                      Call Us Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif"
            >
              Book Your
              <span className="block gradient-text bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">
                Lake District Escape
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to experience the beauty of the Lake District? Send us your enquiry 
              and we'll help you plan the perfect stay.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-nature-600" />
                    <span>Booking Enquiry</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Honeypot field - hidden from users */}
                    <input
                      type="text"
                      {...register('honeypot')}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {/* Personal Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          {...register('name')}
                          placeholder="Your full name"
                          className={errors.name ? 'border-red-500' : ''}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          {...register('email')}
                          placeholder="your@email.com"
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number *
                      </label>
                      <Input
                        type="tel"
                        {...register('phone')}
                        placeholder="+44 1234 567890"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1 flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Dates */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Arrival Date *
                        </label>
                        <Input
                          type="date"
                          {...register('arrivalDate')}
                          min={formatDate(new Date())}
                          max={formatDate(maxCheckInDate)}
                          className={errors.arrivalDate ? 'border-red-500' : ''}
                        />
                        {errors.arrivalDate && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.arrivalDate.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Departure Date *
                        </label>
                        <Input
                          type="date"
                          {...register('departureDate')}
                          min={watchedArrivalDate ? formatDate(minCheckOutDate) : formatDate(new Date())}
                          className={errors.departureDate ? 'border-red-500' : ''}
                        />
                        {errors.departureDate && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.departureDate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Guests and Accommodation */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Number of Guests *
                        </label>
                        <Select onValueChange={(value) => setValue('guests', value)}>
                          <SelectTrigger className={errors.guests ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.guests && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.guests.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Accommodation Type *
                        </label>
                        <Select onValueChange={(value) => setValue('accommodationType', value)}>
                          <SelectTrigger className={errors.accommodationType ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select accommodation" />
                          </SelectTrigger>
                          <SelectContent>
                            {siteConfig.accommodations.map((acc) => (
                              <SelectItem key={acc.id} value={acc.id}>
                                {acc.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.accommodationType && (
                          <p className="text-red-500 text-sm mt-1 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.accommodationType.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Special Requests */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Special Requests
                      </label>
                      <Textarea
                        {...register('specialRequests')}
                        placeholder="Any special requirements, dietary needs, or questions..."
                        rows={4}
                      />
                    </div>

                    {/* GDPR Consent */}
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        {...register('gdprConsent')}
                        className="mt-1 h-4 w-4 text-nature-600 border-gray-300 rounded focus:ring-nature-500"
                      />
                      <label className="text-sm text-slate-600">
                        I agree to the{' '}
                        <a href="/privacy" className="text-nature-600 hover:underline">
                          Privacy Policy
                        </a>{' '}
                        and consent to my data being used to process this enquiry. *
                      </label>
                    </div>
                    {errors.gdprConsent && (
                      <p className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.gdprConsent.message}
                      </p>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      variant="nature"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending Enquiry...' : 'Send Enquiry'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Booking Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-nature-600" />
                    <span>Booking Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {watchedAccommodationType && (
                    <div>
                      <p className="text-sm text-slate-600">Accommodation</p>
                      <p className="font-medium">
                        {siteConfig.accommodations.find(acc => acc.id === watchedAccommodationType)?.title}
                      </p>
                    </div>
                  )}
                  
                  {watchedArrivalDate && (
                    <div>
                      <p className="text-sm text-slate-600">Arrival</p>
                      <p className="font-medium">{formatDate(new Date(watchedArrivalDate))}</p>
                    </div>
                  )}
                  
                  {watchedDepartureDate && (
                    <div>
                      <p className="text-sm text-slate-600">Departure</p>
                      <p className="font-medium">{formatDate(new Date(watchedDepartureDate))}</p>
                    </div>
                  )}
                  
                  {watchedGuests && (
                    <div>
                      <p className="text-sm text-slate-600">Guests</p>
                      <p className="font-medium">{watchedGuests} {watchedGuests === '1' ? 'Guest' : 'Guests'}</p>
                    </div>
                  )}
                  
                  {watchedArrivalDate && watchedDepartureDate && (
                    <div>
                      <p className="text-sm text-slate-600">Nights</p>
                      <p className="font-medium">
                        {calculateNights(new Date(watchedArrivalDate), new Date(watchedDepartureDate))} nights
                      </p>
                    </div>
                  )}
                  
                  {calculatePrice() > 0 && (
                    <div className="border-t pt-4">
                      <p className="text-sm text-slate-600">Estimated Total</p>
                      <p className="text-2xl font-bold text-nature-600">£{calculatePrice()}</p>
                      <p className="text-xs text-slate-500">* Final price confirmed upon booking</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
