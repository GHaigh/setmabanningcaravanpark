'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function GalleryEnhanced() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentCategory, setCurrentCategory] = useState('all')

  const galleryImages = [
    {
      id: 1,
      src: '/images/hero-lake-district.jpg',
      alt: 'Stunning Lake District landscape',
      category: 'landscape',
      title: 'Lake District Views',
      description: 'Breathtaking views from our caravan park'
    },
    {
      id: 2,
      src: '/images/tent-pitches.jpg',
      alt: 'Tent pitches with electric hook-up',
      category: 'accommodation',
      title: 'Tent Pitches',
      description: 'Grass pitches with electric hook-up'
    },
    {
      id: 3,
      src: '/images/hardstanding-pitches.jpg',
      alt: 'Hardstanding pitches',
      category: 'accommodation',
      title: 'Hardstanding Pitches',
      description: 'Hardstanding with electric hook-up'
    },
    {
      id: 5,
      src: '/images/facilities.jpg',
      alt: 'Clean shower and toilet facilities',
      category: 'facilities',
      title: 'Modern Facilities',
      description: 'Hot showers and clean amenities'
    },
    {
      id: 6,
      src: '/images/farm-shop.jpg',
      alt: 'On-site farm shop',
      category: 'facilities',
      title: 'Farm Shop',
      description: 'Local produce and essentials'
    },
    {
      id: 7,
      src: '/images/local-pub.jpg',
      alt: 'Local country pub',
      category: 'local',
      title: 'Local Pubs',
      description: 'Traditional country pubs nearby'
    },
    {
      id: 8,
      src: '/images/hiking-trails.jpg',
      alt: 'Hiking trails near Blencathra',
      category: 'activities',
      title: 'Hiking Trails',
      description: 'Close to popular lakeland fells'
    },
    {
      id: 9,
      src: '/images/family-camping.jpg',
      alt: 'Family enjoying camping',
      category: 'activities',
      title: 'Family Fun',
      description: 'Perfect for families and children'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'landscape', name: 'Landscape', count: galleryImages.filter(img => img.category === 'landscape').length },
    { id: 'accommodation', name: 'Accommodation', count: galleryImages.filter(img => img.category === 'accommodation').length },
    { id: 'facilities', name: 'Facilities', count: galleryImages.filter(img => img.category === 'facilities').length },
    { id: 'activities', name: 'Activities', count: galleryImages.filter(img => img.category === 'activities').length },
    { id: 'local', name: 'Local Area', count: galleryImages.filter(img => img.category === 'local').length }
  ]

  const filteredImages = currentCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentCategory)

  const nextImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const nextIndex = (currentIndex + 1) % filteredImages.length
      setSelectedImage(filteredImages[nextIndex].id)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null) {
      const currentIndex = filteredImages.findIndex(img => img.id === selectedImage)
      const prevIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
      setSelectedImage(filteredImages[prevIndex].id)
    }
  }

  const selectedImageData = galleryImages.find(img => img.id === selectedImage)

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
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Explore Our
            <span className="block text-yellow-600">Beautiful Location</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Take a virtual tour of Setmabanning Caravan Park and discover why 
            families have been choosing us for over 50 years.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setCurrentCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                currentCategory === category.id
                  ? 'bg-yellow-500 text-black shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 border border-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedImage(image.id)}
            >
              <Card className="overflow-hidden shadow-lg border-0 bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-600">{image.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && selectedImageData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-xl font-semibold mb-1">{selectedImageData.title}</h3>
                <p className="text-white/80">{selectedImageData.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Card className="max-w-2xl mx-auto shadow-2xl border-0 bg-gradient-to-r from-yellow-50 to-yellow-100">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-yellow-600 mr-3" />
                <h3 className="text-2xl font-bold text-gray-900">Ready to Experience It?</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Book your stay and create your own memories in the beautiful Lake District.
              </p>
              <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-colors duration-300">
                Book Your Stay
              </button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
