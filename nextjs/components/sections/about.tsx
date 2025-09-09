'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'react-intersection-observer'
import { Trees, Flame, Droplets, Mountain, Wifi, ShoppingCart, Beer } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { siteConfig } from '@/data/site'

const iconMap = {
  Trees,
  Flame,
  Droplets,
  Mountain,
  Wifi,
  ShoppingCart,
  Beer,
}

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 nature-gradient">
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
              Welcome to Our
              <span className="block gradient-text bg-gradient-to-r from-nature-600 to-nature-500 bg-clip-text text-transparent">
                Lake District Haven
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
              Nestled in the heart of the Lake District with breathtaking views of Blencathra, 
              we offer a perfect blend of traditional camping and modern comfort.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  A Family-Run Experience
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  For over 50 years, we've been welcoming families to experience the natural beauty 
                  of the Lake District. Our working farm setting provides a unique opportunity to 
                  connect with nature while enjoying all the Northern Lakes has to offer.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Whether you're seeking adventure on the nearby peaks of Blencathra, Skiddaw, 
                  and Helvellyn, or simply want to relax by the campfire, we provide the perfect 
                  base for your Lake District escape.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 font-serif">
                  Perfect Location
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Just 4 miles from the bustling market town of Keswick and 14 miles from Penrith 
                  (J40, M6), we're ideally positioned for exploring all the Lake District has to offer. 
                  A five-minute walk takes you to Threlkeld village with its two country pubs serving 
                  local ales and hearty Cumbrian food.
                </p>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/about-farm.jpg"
                  alt="Setmabanning Caravan Park with mountain views"
                  width={600}
                  height={400}
                  className="object-cover w-full h-80 lg:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>
              {/* Floating card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-nature-100 rounded-full flex items-center justify-center">
                    <Mountain className="h-6 w-6 text-nature-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Family run for over 50 years</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {siteConfig.features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon as keyof typeof iconMap]
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-nature-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-nature-200 transition-colors duration-300">
                        <IconComponent className="h-8 w-8 text-nature-600" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
