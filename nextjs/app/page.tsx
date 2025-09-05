import { Header } from '@/components/sections/header'
import { Hero } from '@/components/sections/hero'
import { About } from '@/components/sections/about'
import { Accommodation } from '@/components/sections/accommodation'
import { Gallery } from '@/components/sections/gallery'
import { Booking } from '@/components/sections/booking'
import { Contact } from '@/components/sections/contact'
import { Footer } from '@/components/sections/footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Accommodation />
      <Gallery />
      <Booking />
      <Contact />
      <Footer />
    </main>
  )
}
