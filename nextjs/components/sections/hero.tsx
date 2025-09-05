'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/data/site'

export function Hero() {
  const scrollToBooking = () => {
    const element = document.querySelector('#booking')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToAccommodation = () => {
    const element = document.querySelector('#accommodation')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/hero-lake-district.jpg"
            alt="Stunning Lake District landscape with mountains and lakes"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-800/60 to-slate-900/80" />
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-white/30 rounded-full animate-float" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-float animation-delay-200" />
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/20 rounded-full animate-float animation-delay-400" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Location Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8"
          >
            <MapPin className="h-4 w-4 text-white" />
            <span className="text-white text-sm font-medium">
              {siteConfig.contact.address.line2}, {siteConfig.contact.address.line3}
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 font-serif leading-tight"
          >
            <span className="block">Escape to Nature in the</span>
            <span className="block gradient-text bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent">
              Heart of the Lake District
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {siteConfig.description}
          </motion.p>

          {/* Rating */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex items-center justify-center space-x-2 mb-10"
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">
              4.9/5 from 200+ reviews
            </span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              size="xl"
              variant="nature"
              onClick={scrollToBooking}
              className="group shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Book Your Stay
              <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
            <Button
              size="xl"
              variant="glass"
              onClick={scrollToAccommodation}
              className="group"
            >
              View Accommodation
            </Button>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
          >
            {[
              { icon: '🐕', label: 'Pet Friendly' },
              { icon: '🔥', label: 'Fire Pits' },
              { icon: '🚿', label: 'Hot Showers' },
              { icon: '📶', label: 'Free WiFi' },
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl mb-2">{feature.icon}</div>
                <div className="text-white/80 text-sm font-medium">{feature.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors duration-300 cursor-pointer"
          onClick={() => scrollToAccommodation()}
        >
          <span className="text-sm font-medium mb-2">Explore More</span>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  )
}
