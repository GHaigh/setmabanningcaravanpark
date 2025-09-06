'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Mountain, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/data/site'

const navItems = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#accommodation', label: 'Accommodation' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#booking', label: 'Booking' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-nature-100'
          : 'bg-transparent'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group"
            onClick={() => scrollToSection('#home')}
          >
            <div className="relative">
              <Mountain className={cn(
                'h-8 w-8 transition-colors duration-300',
                isScrolled ? 'text-nature-600' : 'text-white'
              )} />
              <div className="absolute inset-0 bg-nature-500/20 rounded-full blur-sm group-hover:bg-nature-500/30 transition-all duration-300" />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                'text-xl font-bold font-serif transition-colors duration-300',
                isScrolled ? 'text-nature-900' : 'text-white'
              )}>
                Setmabanning
              </span>
              <span className={cn(
                'text-xs font-medium transition-colors duration-300',
                isScrolled ? 'text-nature-600' : 'text-white/80'
              )}>
                Caravan Park
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className={cn(
                  'text-sm font-medium transition-colors duration-300 hover:text-nature-600 relative group',
                  isScrolled ? 'text-slate-700' : 'text-white'
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-nature-600 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/booking-status">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  'transition-colors duration-300',
                  isScrolled ? 'text-slate-700 hover:text-nature-600' : 'text-white hover:text-white/80'
                )}
              >
                Check Booking
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'transition-colors duration-300',
                isScrolled ? 'text-slate-700 hover:text-nature-600' : 'text-white hover:text-white/80'
              )}
              onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Us
            </Button>
            <Button
              variant="nature"
              size="sm"
              onClick={() => scrollToSection('#booking')}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2 border-t border-nature-100">
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-slate-700 hover:text-nature-600 hover:bg-nature-50 rounded-xl transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="px-4 pt-4 space-y-2">
                  <Link href="/booking-status" className="w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Check Booking
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Us
                  </Button>
                  <Button
                    variant="nature"
                    size="sm"
                    className="w-full"
                    onClick={() => scrollToSection('#booking')}
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
