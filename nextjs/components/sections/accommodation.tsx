'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Check, Star, Users, Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/data/site'

export function Accommodation() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const scrollToBooking = () => {
    const element = document.querySelector('#booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="accommodation" className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 font-serif"
            >
              Choose Your Perfect
              <span className="block gradient-text bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">
                Stay
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              From traditional tent pitches to luxury holiday homes, we have the perfect 
              accommodation for your Lake District adventure.
            </motion.p>
          </div>

          {/* Accommodation Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {siteConfig.accommodations.map((accommodation, index) => (
              <motion.div
                key={accommodation.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 overflow-hidden">
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={accommodation.image}
                      alt={accommodation.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-sm font-bold text-nature-600">
                        {accommodation.priceRange}
                      </span>
                    </div>

                    {/* Availability Badge */}
                    {accommodation.available && (
                      <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full px-3 py-1">
                        <span className="text-xs font-medium">Available</span>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    {/* Title & Description */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">
                      {accommodation.title}
                    </h3>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {accommodation.description}
                    </p>

                    {/* Amenities */}
                    <div className="space-y-3 mb-6">
                      <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                        Amenities
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {accommodation.amenities.map((amenity, amenityIndex) => (
                          <div key={amenityIndex} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-nature-600 flex-shrink-0" />
                            <span className="text-sm text-slate-600">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>Up to 6 guests</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Min {accommodation.minNights} nights</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0">
                    <Button
                      onClick={scrollToBooking}
                      className="w-full group"
                      variant="nature"
                    >
                      Enquire Now
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-16"
          >
            <div className="bg-slate-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">
                Ready to Book Your Stay?
              </h3>
              <p className="text-slate-600 mb-6">
                Contact us to check availability and secure your perfect Lake District getaway.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="nature"
                  onClick={scrollToBooking}
                >
                  Start Booking
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
                >
                  Call {siteConfig.contact.phone}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
