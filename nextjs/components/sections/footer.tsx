'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mountain, Phone, Mail, Home, Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/data/site'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-6 group">
              <div className="relative">
                <Mountain className="h-8 w-8 text-nature-400 group-hover:text-nature-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-nature-500/20 rounded-full blur-sm group-hover:bg-nature-500/30 transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold font-serif group-hover:text-nature-300 transition-colors duration-300">
                  Setmabanning
                </span>
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                  Caravan Park
                </span>
              </div>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Experience the beauty of the Lake District with stunning views of Blencathra. 
              Family-run caravan park established over 50 years.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => window.open(siteConfig.social.facebook, '_blank')}
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => window.open(siteConfig.social.instagram, '_blank')}
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-white hover:bg-slate-800"
                onClick={() => window.open(siteConfig.social.twitter, '_blank')}
              >
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 font-serif">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '#home', label: 'Home' },
                { href: '#about', label: 'About' },
                { href: '#accommodation', label: 'Accommodation' },
                { href: '#gallery', label: 'Gallery' },
                { href: '#booking', label: 'Booking' },
                { href: '#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Accommodation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 font-serif">Accommodation</h3>
            <ul className="space-y-3">
              {siteConfig.accommodations.map((acc) => (
                <li key={acc.id}>
                  <button
                    onClick={() => scrollToSection('#accommodation')}
                    className="text-slate-400 hover:text-white transition-colors duration-300 text-left"
                  >
                    {acc.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <h3 className="text-lg font-semibold mb-6 font-serif">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-nature-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-400">{siteConfig.contact.phone}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-nature-400 hover:text-white"
                    onClick={() => window.open(`tel:${siteConfig.contact.phone}`, '_self')}
                  >
                    Call Now
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-nature-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-400">{siteConfig.contact.email}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-nature-400 hover:text-white"
                    onClick={() => window.open(`mailto:${siteConfig.contact.email}`, '_self')}
                  >
                    Send Email
                  </Button>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Home className="h-5 w-5 text-nature-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-slate-400">
                    {siteConfig.contact.address.line1}<br />
                    {siteConfig.contact.address.line2}<br />
                    {siteConfig.contact.address.line3}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-800 mt-12 pt-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} Setmabanning Caravan Park. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center space-x-6">
              <div className="flex space-x-6">
                <Link href="/privacy" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="text-slate-400 hover:text-white text-sm transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
              <Link 
                href="/admin" 
                className="text-slate-500 hover:text-slate-300 text-xs transition-colors duration-300 px-2 py-1 rounded border border-slate-700 hover:border-slate-600"
              >
                Admin
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
