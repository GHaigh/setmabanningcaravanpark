import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Accommodation } from '@/components/sections/accommodation'
import { GalleryEnhanced } from '@/components/sections/gallery-enhanced'
import { BookingEnhanced } from '@/components/sections/booking-enhanced'
import { Testimonials } from '@/components/sections/testimonials'
import { FAQ } from '@/components/sections/faq'
import { ContactEnhanced } from '@/components/sections/contact-enhanced'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Accommodation />
      <GalleryEnhanced />
      <BookingEnhanced />
      <Testimonials />
      <FAQ />
      <ContactEnhanced />
      <Footer />
    </main>
  )
}
