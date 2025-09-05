import type { Metadata } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const fraunces = Fraunces({ 
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Setmabanning Caravan Park - Lake District Camping & Holiday Homes',
    template: '%s | Setmabanning Caravan Park'
  },
  description: 'Escape to nature in the heart of the Lake District. Family-run caravan park with stunning views of Blencathra. Camping, holiday homes, and tourer pitches available.',
  keywords: [
    'Lake District camping',
    'Keswick caravan park',
    'Blencathra views',
    'Threlkeld accommodation',
    'Cumbria holiday homes',
    'family camping',
    'pet-friendly camping',
    'Lake District holidays'
  ],
  authors: [{ name: 'Setmabanning Caravan Park' }],
  creator: 'Setmabanning Caravan Park',
  publisher: 'Setmabanning Caravan Park',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: '/',
    title: 'Setmabanning Caravan Park - Lake District Camping & Holiday Homes',
    description: 'Escape to nature in the heart of the Lake District. Family-run caravan park with stunning views of Blencathra.',
    siteName: 'Setmabanning Caravan Park',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Setmabanning Caravan Park with views of Blencathra',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Setmabanning Caravan Park - Lake District Camping & Holiday Homes',
    description: 'Escape to nature in the heart of the Lake District. Family-run caravan park with stunning views of Blencathra.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Setmabanning Caravan Park',
  description: 'Family-run caravan park in the Lake District with stunning views of Blencathra',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  telephone: '+44-1768-779229',
  email: 'bookings@setmabanningcaravanpark.co.uk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Setmabanning Caravan Park',
    addressLocality: 'Threlkeld',
    addressRegion: 'Cumbria',
    postalCode: 'CA12 4TT',
    addressCountry: 'GB',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 54.6011,
    longitude: -3.0522,
  },
  openingHours: 'Mo-Su 09:00-17:00',
  priceRange: '££',
  amenityFeature: [
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Pet Friendly',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'WiFi',
      value: true,
    },
    {
      '@type': 'LocationFeatureSpecification',
      name: 'Parking',
      value: true,
    },
  ],
  image: [
    '/images/hero-lake-district.jpg',
    '/images/camping-pitches.jpg',
    '/images/holiday-homes.jpg',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.variable,
        fraunces.variable
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
