'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah & James Mitchell',
      location: 'Manchester',
      rating: 5,
      text: 'Absolutely wonderful stay! The farm setting is perfect for families, and the kids loved seeing the animals. The Lake District views are breathtaking, and the owners are so welcoming. We\'ll definitely be back!',
      date: 'August 2024',
      avatar: '👨‍👩‍👧‍👦'
    },
    {
      id: 2,
      name: 'Mike Thompson',
      location: 'Leeds',
      rating: 5,
      text: 'Perfect location for exploring the Lake District. The campervan pitches are well-maintained with excellent facilities. The farm shop has everything you need, and the local pub recommendations were spot on!',
      date: 'July 2024',
      avatar: '🏕️'
    },
    {
      id: 3,
      name: 'Emma & David Wilson',
      location: 'Birmingham',
      rating: 5,
      text: 'What a gem! Family-run for 50+ years and you can tell. The attention to detail, the warm welcome, and the stunning location make this our go-to place in the Lake District. Highly recommended!',
      date: 'September 2024',
      avatar: '⭐'
    },
    {
      id: 4,
      name: 'Lisa & Tom Brown',
      location: 'Liverpool',
      rating: 5,
      text: 'Our first camping experience at Setmabanning and it was amazing! The hardstanding pitch was perfect for our campervan, the views were incredible, and the farm atmosphere was so relaxing. Perfect for a romantic getaway.',
      date: 'June 2024',
      avatar: '💑'
    },
    {
      id: 5,
      name: 'The Johnson Family',
      location: 'Newcastle',
      rating: 5,
      text: 'Three generations of our family stayed here and everyone loved it! The grandparents enjoyed the peaceful setting, the parents appreciated the facilities, and the kids had a blast. Truly special place.',
      date: 'August 2024',
      avatar: '👴👵👨‍👩‍👧‍👦'
    },
    {
      id: 6,
      name: 'Alex & Sam',
      location: 'Edinburgh',
      rating: 5,
      text: 'Came for a hiking weekend and couldn\'t have chosen better. Great base for exploring Blencathra and the surrounding fells. The hot showers after a long day were perfect, and the owners are so knowledgeable about local walks.',
      date: 'July 2024',
      avatar: '🥾'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our Guests Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear from families who have made 
            Setmabanning their home away from home in the Lake District.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="text-center">
                    <div className="text-2xl mb-2">{testimonial.avatar}</div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 mb-1">
                      {testimonial.location}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.date}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Overall Rating */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 text-yellow-400 fill-current" />
                ))}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                4.9/5 Average Rating
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                Based on 200+ guest reviews
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <span>⭐ 98% would recommend</span>
                <span>🏆 Excellent location</span>
                <span>❤️ Family-friendly</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
