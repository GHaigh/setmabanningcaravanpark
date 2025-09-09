const fs = require('fs');
const path = require('path');

// Create placeholder images using SVG
const createPlaceholderImage = (width, height, text, filename) => {
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#10b981;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="white">
    ${text}
  </text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" 
        text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.8">
    ${width}x${height}
  </text>
</svg>`;

  fs.writeFileSync(path.join(__dirname, '../public/images/gallery', filename), svg);
};

// Generate placeholder images
const images = [
  { filename: 'lake-district-view.jpg', text: 'Lake District View', width: 800, height: 600 },
  { filename: 'camping-tents.jpg', text: 'Camping Tents', width: 800, height: 600 },
  { filename: 'fire-pit-evening.jpg', text: 'Fire Pit Evening', width: 800, height: 600 },
  { filename: 'hiking-trail.jpg', text: 'Hiking Trail', width: 800, height: 600 },
  { filename: 'holiday-home.jpg', text: 'Holiday Home', width: 800, height: 600 },
  { filename: 'family-camping.jpg', text: 'Family Camping', width: 800, height: 600 }
];

images.forEach(img => {
  createPlaceholderImage(img.width, img.height, img.text, img.filename);
  console.log(`Created placeholder: ${img.filename}`);
});

console.log('All placeholder images created successfully!');
