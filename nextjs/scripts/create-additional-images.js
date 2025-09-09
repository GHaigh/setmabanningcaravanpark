const fs = require('fs');
const path = require('path');

// Create additional placeholder images
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
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="20" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" fill="white">
    ${text}
  </text>
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="12" 
        text-anchor="middle" dominant-baseline="middle" fill="white" opacity="0.8">
    Setmabanning Caravan Park
  </text>
</svg>`;

  fs.writeFileSync(path.join(__dirname, '../public/images', filename), svg);
};

// Generate additional images for the site
const additionalImages = [
  { filename: 'about-farm.jpg', text: 'Working Farm', width: 600, height: 400 },
  { filename: 'tent-pitches.jpg', text: 'Tent Pitches', width: 600, height: 400 },
  { filename: 'hardstanding-pitches.jpg', text: 'Campervan Pitches', width: 600, height: 400 },
  { filename: 'holiday-homes.jpg', text: 'Holiday Homes', width: 600, height: 400 }
];

additionalImages.forEach(img => {
  createPlaceholderImage(img.width, img.height, img.text, img.filename);
  console.log(`Created additional image: ${img.filename}`);
});

console.log('All additional images created successfully!');
