'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    )
  }

  const faqs = [
    {
      question: 'What time is check-in and check-out?',
      answer: 'Check-in is from 2:00 PM onwards, and check-out is by 11:00 AM. We offer flexible times for early arrivals or late departures when possible - just let us know in advance.'
    },
    {
      question: 'Are pets allowed?',
      answer: 'Yes! We\'re a pet-friendly caravan park. Well-behaved dogs are welcome on leads throughout the site. We have designated dog walking areas and can provide recommendations for pet-friendly local attractions.'
    },
    {
      question: 'What facilities do you have?',
      answer: 'We offer hot showers, clean toilet facilities, electric hook-ups, a farm shop with essentials, and free WiFi. Our facilities are traditional but well-maintained, reflecting our 50+ years of family operation.'
    },
    {
      question: 'Is there a minimum stay requirement?',
      answer: 'We have a 2-night minimum stay during peak season (July-August) and weekends. During quieter periods, single night stays are welcome. Contact us for availability and special arrangements.'
    },
    {
      question: 'Can I bring my own tent/campervan?',
      answer: 'Absolutely! We welcome tents, campervans, caravans, and motorhomes. All pitches include electric hook-up, and we have both grass and hardstanding options available.'
    },
    {
      question: 'Do you have a farm shop?',
      answer: 'Yes! Our on-site farm shop stocks essentials, local produce, and camping supplies. We also have recommendations for local country pubs and restaurants within walking distance.'
    },
    {
      question: 'What activities are nearby?',
      answer: 'We\'re perfectly located for exploring the Lake District. Popular nearby attractions include Blencathra, Keswick, Derwentwater, and numerous walking trails. We can provide detailed maps and recommendations.'
    },
    {
      question: 'Is there WiFi available?',
      answer: 'Yes, we provide free WiFi throughout the site. While we\'re in a rural location, we have reliable internet coverage for staying connected during your stay.'
    },
    {
      question: 'How do I make a booking?',
      answer: 'You can make a booking request through our website, or contact us directly by phone or email. We\'ll confirm availability and send you booking details within 24 hours.'
    },
    {
      question: 'What\'s your cancellation policy?',
      answer: 'We offer flexible cancellation policies. Full refunds for cancellations 7+ days in advance, 50% refund for 3-6 days notice, and no refund for cancellations within 48 hours of arrival.'
    },
    {
      question: 'Are you open year-round?',
      answer: 'We\'re open from March through October, with limited winter availability for hardier campers. Our peak season is July-August, but spring and autumn offer beautiful Lake District scenery with fewer crowds.'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about staying at Setmabanning Caravan Park. 
            Can't find what you're looking for? Just ask!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg border-0 bg-white hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0">
                        {openItems.includes(index) ? (
                          <ChevronUp className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </button>
                    
                    <motion.div
                      initial={false}
                      animate={{
                        height: openItems.includes(index) ? 'auto' : 0,
                        opacity: openItems.includes(index) ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Still Have Questions?
                </h3>
                <p className="text-gray-600 mb-6">
                  Our friendly team is here to help! Contact us directly and we'll get back to you within 24 hours.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300">
                    Contact Us
                  </button>
                  <button className="px-6 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-white font-semibold rounded-lg transition-colors duration-300">
                    Call Now
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
