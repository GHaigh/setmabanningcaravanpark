'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowDown, Star, Calendar, MapPin, Users, Mountain, ShoppingCart, Beer, Heart } from 'lucide-react'
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
      {/* Background Image with Enhanced Overlay */}
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
          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/70 to-slate-900/90" />
          
          {/* Animated Background Elements */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-white/40 rounded-full animate-bounce animation-delay-200" />
          <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-yellow-400/20 rounded-full animate-pulse animation-delay-400" />
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-white/30 rounded-full animate-bounce animation-delay-600" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-5xl mx-auto"
        >

          {/* Main Headline with Enhanced Typography */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 font-serif leading-tight"
          >
            <span className="block text-yellow-400 drop-shadow-lg">Setmabanning</span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mt-2 bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent">
              Caravan Park
            </span>
          </motion.h1>

          {/* Enhanced Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl sm:text-2xl lg:text-3xl text-white/95 mb-8 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Experience the beauty of the Lake District from our peaceful, working Cumbrian farm. 
            Family-run for over 50 years, offering authentic camping in the heart of nature.
          </motion.p>

          {/* Enhanced Rating with Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 mb-12"
          >
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-white/90 text-lg font-semibold">
                4.9/5 from 200+ reviews
              </span>
            </div>
            <div className="flex items-center space-x-2 text-white/80">
              <Heart className="h-5 w-5 text-red-400 fill-current" />
              <span className="text-lg">Family-run for 50+ years</span>
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-5xl mx-auto"
          >
            {[
              { icon: Mountain, label: 'Lake District', emoji: '🏔️' },
              { icon: Users, label: 'Family Friendly', emoji: '👨‍👩‍👧‍👦' },
              { icon: ShoppingCart, label: 'Farm Shop', emoji: '🛒' },
              { icon: Beer, label: 'Local Pubs', emoji: '🍺' },
              { icon: Star, label: '50+ Years', emoji: '⭐' },
              { icon: MapPin, label: 'Cumbria', emoji: '📍' }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="flex flex-col items-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div className="text-3xl mb-2">{feature.emoji}</div>
                <span className="text-sm font-medium text-center text-white/90">{feature.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <Button
              size="xl"
              onClick={scrollToBooking}
              className="group bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-10 py-5 text-xl rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Book Your Stay
              <ArrowDown className="ml-3 h-6 w-6 group-hover:translate-y-1 transition-transform duration-300" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              onClick={scrollToAccommodation}
              className="group border-2 border-white text-white hover:bg-white hover:text-black font-bold px-10 py-5 text-xl rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <MapPin className="mr-3 h-6 w-6" />
              View Accommodation
            </Button>
          </motion.div>

        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
          onClick={() => scrollToAccommodation()}
        >
          <span className="text-sm font-medium mb-3">Explore More</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/70 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
