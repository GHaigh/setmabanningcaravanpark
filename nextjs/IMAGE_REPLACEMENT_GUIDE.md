# Image Replacement Guide

## Current Gallery Images

The gallery is now set up with placeholder images. To replace them with real photos of your caravan park, follow these steps:

### Gallery Images (in `/public/images/gallery/`)
1. **lake-district-view.jpg** - Panoramic views of Blencathra and surrounding fells
2. **camping-tents.jpg** - Tents pitched with mountain backdrop
3. **fire-pit-evening.jpg** - Evening campfire with friends and family
4. **hiking-trail.jpg** - Hiking trail leading to Blencathra
5. **holiday-home.jpg** - Modern holiday home with mountain views
6. **family-camping.jpg** - Family enjoying camping activities

### Additional Images (in `/public/images/`)
7. **tent-pitches.jpg** - Spacious tent pitches with electric hook-ups
8. **campervan-pitches.jpg** - Hardstanding pitches for motorhomes and caravans
9. **holiday-homes.jpg** - Luxury static caravans with mountain views
10. **about-farm.jpg** - Working farm experience

## How to Replace Images

### Step 1: Prepare Your Photos
- **Recommended size**: 800x600 pixels (or similar aspect ratio)
- **Format**: JPG or PNG
- **File size**: Keep under 500KB for web performance
- **Quality**: High resolution but optimized for web

### Step 2: Replace the Files
1. Navigate to the `nextjs/public/images/gallery/` directory
2. Replace the placeholder files with your actual photos
3. Keep the same filenames (e.g., `lake-district-view.jpg`)
4. For additional images, replace files in `nextjs/public/images/`

### Step 3: Update Image Information (Optional)
If you want to change captions or alt text, edit the `nextjs/data/site.ts` file:

```typescript
gallery: [
  {
    src: '/images/gallery/lake-district-view.jpg',
    alt: 'Your custom alt text',
    caption: 'Your custom caption'
  },
  // ... more images
]
```

### Step 4: Deploy Changes
After replacing images, run:
```bash
cd nextjs
vercel --prod
```

## Image Suggestions

For the best gallery experience, try to include:

### Scenic Views
- Panoramic shots of Blencathra and surrounding fells
- Lake District landscape views from the campsite
- Sunrise/sunset shots

### Accommodation
- Different types of pitches (tent, caravan, holiday home)
- Interior shots of holiday homes
- Facilities and amenities

### Activities
- People hiking on nearby trails
- Families around campfires
- Children playing or exploring
- Local wildlife or farm animals

### Local Area
- Threlkeld village
- Nearby pubs
- Walking trails
- Keswick town center

## Technical Notes

- Images are automatically optimized by Next.js
- The gallery supports lightbox functionality
- Images are responsive and will work on all devices
- Alt text is important for accessibility
- Captions appear on hover and in the lightbox

## Current Status

✅ Gallery component is working
✅ Placeholder images are in place
✅ Lightbox functionality is active
✅ Responsive design is implemented
⏳ Ready for real photos to be added

Your gallery is now live at: https://setmabanningcaravanpark-iqt3sp1q9-greg-haighs-projects.vercel.app
