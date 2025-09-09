'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

export function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/availability', label: 'Availability', icon: '📅' },
    { href: '/admin/demo-data', label: 'Demo Data', icon: '🧪' },
  ]

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <nav className="flex space-x-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-nature-100 text-nature-700 font-medium'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}
