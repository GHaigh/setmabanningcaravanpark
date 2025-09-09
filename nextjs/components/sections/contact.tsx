'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Phone, Mail, Clock, Facebook, Instagram, Twitter, Home } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/data/site'

export function Contact() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-slate-50">
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
              Get in
              <span className="block gradient-text bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Ready to book your stay or have questions? We're here to help make your 
              Lake District experience unforgettable.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-nature-600" />
                    <span>Contact Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-nature-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                      <p className="text-slate-600 mb-2">{siteConfig.contact.phone}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
                      >
                        Call Now
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-nature-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                      <p className="text-slate-600 mb-2">{siteConfig.contact.email}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`mailto:${siteConfig.contact.email}`, '_self')}
                      >
                        Send Email
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Home className="h-6 w-6 text-nature-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                      <div className="text-slate-600 space-y-1">
                        <p>{siteConfig.contact.address.line1}</p>
                        <p>{siteConfig.contact.address.line2}</p>
                        <p>{siteConfig.contact.address.line3}</p>
                        <p>{siteConfig.contact.address.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Opening Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-nature-600" />
                    <span>Opening Hours</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Season</span>
                      <span className="font-medium">{siteConfig.openingHours.season}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Check-in</span>
                      <span className="font-medium">{siteConfig.openingHours.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Check-out</span>
                      <span className="font-medium">{siteConfig.openingHours.checkOut}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Follow Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(siteConfig.social.facebook, '_blank')}
                    >
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(siteConfig.social.instagram, '_blank')}
                    >
                      <Instagram className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(siteConfig.social.twitter, '_blank')}
                    >
                      <Twitter className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick FAQs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Quick Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {siteConfig.faqs.slice(0, 3).map((faq, index) => (
                      <div key={index} className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-slate-900 mb-2">{faq.question}</h4>
                        <p className="text-sm text-slate-600">{faq.answer}</p>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        const element = document.querySelector('#booking')
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' })
                        }
                      }}
                    >
                      View All FAQs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
