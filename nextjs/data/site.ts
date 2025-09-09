export const siteConfig = {
  name: 'Setmabanning Caravan Park',
  tagline: 'Escape to Nature in the Heart of the Lake District',
  description: 'Family-run caravan park with stunning views of Blencathra. Experience camping on a peaceful, working cumbrian farm and explore nearby trails in the beautiful Lake District.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  
  contact: {
    address: {
      line1: 'Setmabanning Caravan Park',
      line2: 'Threlkeld, Keswick',
      line3: 'Cumbria, CA12 4TT',
      country: 'United Kingdom'
    },
    phone: '+44 1768 779229',
    email: 'bookings@setmabanningcaravanpark.co.uk',
    coordinates: {
      lat: 54.6011,
      lng: -3.0522
    }
  },
  
  social: {
    facebook: 'https://www.facebook.com/Setmabanningfarm',
    instagram: 'https://www.instagram.com/setmabanningcaravanpark',
    twitter: 'https://twitter.com/setmabanningpark'
  },
  
  openingHours: {
    season: 'March - October',
    checkIn: '3:00 PM',
    checkOut: '11:00 AM'
  },
  
  features: [
    {
      icon: 'Trees',
      title: 'Pet Friendly',
      description: 'Bring your furry friends along for the adventure'
    },
    {
      icon: 'Droplets',
      title: 'Hot Showers',
      description: 'Traditional amenities with hot water'
    },
    {
      icon: 'Mountain',
      title: 'Nearby Hikes',
      description: 'Close to the popular lakeland fells, Blencathra, Skiddaw, and Helvellyn'
    },
    {
      icon: 'Wifi',
      title: 'Free WiFi',
      description: 'Stay connected with complimentary internet access'
    },
    {
      icon: 'ShoppingCart',
      title: 'Farm Shop',
      description: 'Fresh local produce and essentials available on-site'
    },
    {
      icon: 'Beer',
      title: 'Local Country Pubs',
      description: 'Traditional pubs and restaurants within walking distance'
    }
  ],
  
  accommodations: [
    {
      id: 'tent-pitches',
      title: 'Tent Pitches',
      description: 'Spacious grass pitches with electric hook-ups available. Perfect for traditional camping with modern conveniences.',
      amenities: ['Electric hook-ups', 'Water access', 'Fire pit area', 'Parking nearby'],
      priceRange: 'From £25/night',
      minNights: 2,
      image: '/images/tent-pitches.jpg',
      available: true
    },
    {
      id: 'hardstanding-pitches',
      title: 'Hardstanding Pitches',
      description: 'Hardstanding pitches with full facilities. Ideal for motorhomes and caravans with easy access.',
      amenities: ['Hardstanding', 'Electric & water', 'Waste disposal', 'WiFi included'],
      priceRange: 'From £35/night',
      minNights: 2,
      image: '/images/hardstanding-pitches.jpg',
      available: true
    },
    {
      id: 'holiday-homes',
      title: 'Holiday Homes',
      description: 'Luxury static caravans with all the comforts of home. Perfect for families and longer stays.',
      amenities: ['Fully equipped kitchen', 'Private bathroom', 'Heating', 'Private parking'],
      priceRange: 'From £120/night',
      minNights: 3,
      image: '/images/holiday-homes.jpg',
      available: true
    }
  ],
  
  gallery: [
    {
      src: '/images/gallery/lake-district-view.jpg',
      alt: 'Stunning view of Lake District fells from the campsite',
      caption: 'Panoramic views of Blencathra and surrounding fells'
    },
    {
      src: '/images/gallery/camping-tents.jpg',
      alt: 'Tents pitched with mountain backdrop',
      caption: 'Peaceful camping with mountain views'
    },
    {
      src: '/images/gallery/fire-pit-evening.jpg',
      alt: 'Evening campfire with friends and family',
      caption: 'Cozy evenings around the campfire'
    },
    {
      src: '/images/gallery/hiking-trail.jpg',
      alt: 'Hiking trail leading to Blencathra',
      caption: 'Close to the popular lakeland fells, Blencathra'
    },
    {
      src: '/images/gallery/holiday-home.jpg',
      alt: 'Modern holiday home with mountain views',
      caption: 'Comfortable holiday homes with stunning views'
    },
    {
      src: '/images/gallery/family-camping.jpg',
      alt: 'Family enjoying camping activities',
      caption: 'Perfect for family adventures'
    },
    {
      src: '/images/tent-pitches.jpg',
      alt: 'Spacious tent pitches with electric hook-ups',
      caption: 'Modern camping facilities with all amenities'
    },
    {
      src: '/images/campervan-pitches.jpg',
      alt: 'Hardstanding pitches for motorhomes and caravans',
      caption: 'Premium pitches with full facilities'
    },
    {
      src: '/images/holiday-homes.jpg',
      alt: 'Luxury static caravans with mountain views',
      caption: 'Home away from home in the Lake District'
    }
  ],
  
  faqs: [
    {
      question: 'Are pets allowed?',
      answer: 'Yes! We welcome well-behaved pets. Please keep them on a lead and clean up after them.'
    },
    {
      question: 'What facilities are available?',
      answer: 'We have modern shower blocks, laundry facilities, a small shop, and free WiFi throughout the site.'
    },
    {
      question: 'Can I have a campfire?',
      answer: 'Yes, we have designated fire pit areas. Firewood is available for purchase on-site.'
    },
    {
      question: 'What\'s the minimum stay?',
      answer: 'Minimum stay is 2 nights for camping and 3 nights for holiday homes during peak season.'
    },
    {
      question: 'Is there parking?',
      answer: 'Yes, each pitch has space for one vehicle. Additional vehicles can be parked in our overflow area.'
    },
    {
      question: 'What time is check-in and check-out?',
      answer: 'Check-in is from 3:00 PM and check-out is by 11:00 AM. Early check-in may be available by arrangement.'
    }
  ]
}
