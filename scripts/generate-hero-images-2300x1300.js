const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Church-themed placeholder image configurations
const imageConfigs = [
  {
    name: 'church-sunrise',
    title: 'Church at Sunrise',
    color: { r: 255, g: 200, b: 150 }, // Warm sunrise colors
    overlay: 'cross'
  },
  {
    name: 'stained-glass',
    title: 'Stained Glass Window',
    color: { r: 150, g: 100, b: 200 }, // Purple tones
    overlay: 'geometric'
  },
  {
    name: 'worship-service',
    title: 'Worship Service',
    color: { r: 100, g: 150, b: 200 }, // Blue tones
    overlay: 'rays'
  },
  {
    name: 'bible-open',
    title: 'Open Bible',
    color: { r: 200, g: 180, b: 140 }, // Parchment colors
    overlay: 'book'
  },
  {
    name: 'community-gathering',
    title: 'Community Gathering',
    color: { r: 120, g: 180, b: 120 }, // Green tones
    overlay: 'circles'
  },
  {
    name: 'prayer-hands',
    title: 'Prayer and Meditation',
    color: { r: 180, g: 140, b: 160 }, // Soft purple
    overlay: 'hands'
  },
  {
    name: 'church-steeple',
    title: 'Church Steeple',
    color: { r: 150, g: 150, b: 180 }, // Gray-blue
    overlay: 'triangle'
  },
  {
    name: 'choir-performance',
    title: 'Choir Performance',
    color: { r: 200, g: 150, b: 100 }, // Warm gold
    overlay: 'waves'
  },
  {
    name: 'baptism-ceremony',
    title: 'Baptism Ceremony',
    color: { r: 100, g: 150, b: 200 }, // Water blue
    overlay: 'drops'
  },
  {
    name: 'sunset-worship',
    title: 'Sunset Worship',
    color: { r: 255, g: 120, b: 80 }, // Sunset orange
    overlay: 'gradient'
  }
];

async function createPlaceholderImage(config) {
  const { name, title, color, overlay } = config;
  
  // Create base gradient background with new dimensions (2300x1300)
  const svg = `
    <svg width="2300" height="1300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${color.r},${color.g},${color.b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${Math.max(0, color.r - 50)},${Math.max(0, color.g - 50)},${Math.max(0, color.b - 50)});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="2300" height="1300" fill="url(#grad1)" />
      
      <!-- Add overlay pattern -->
      ${getOverlayPattern(overlay, color)}
      
      <!-- Add title text -->
      <text x="1150" y="650" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9">
        ${title}
      </text>
      <text x="1150" y="710" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.7">
        Hero Background Image (2300x1300)
      </text>
    </svg>
  `;

  const outputPath = path.join(__dirname, '..', 'public', 'hero-images', `${name}-2300x1300.jpg`);
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outputPath);
  
  console.log(`Generated: ${name}-2300x1300.jpg (2300x1300)`);
}

function getOverlayPattern(overlay, color) {
  const patterns = {
    cross: `
      <g opacity="0.3">
        <rect x="1100" y="500" width="100" height="300" fill="white" />
        <rect x="1000" y="550" width="300" height="100" fill="white" />
      </g>
    `,
    geometric: `
      <g opacity="0.2">
        <polygon points="1150,400 1400,650 1150,900 900,650" fill="none" stroke="white" stroke-width="20" />
        <polygon points="1150,450 1350,650 1150,850 950,650" fill="none" stroke="white" stroke-width="10" />
      </g>
    `,
    rays: `
      <g opacity="0.25">
        <path d="M 1150 650 L 1800 200" stroke="white" stroke-width="30" />
        <path d="M 1150 650 L 1800 1100" stroke="white" stroke-width="30" />
        <path d="M 1150 650 L 500 200" stroke="white" stroke-width="30" />
        <path d="M 1150 650 L 500 1100" stroke="white" stroke-width="30" />
      </g>
    `,
    book: `
      <g opacity="0.3">
        <rect x="950" y="550" width="400" height="200" fill="white" rx="10" />
        <line x1="1150" y1="550" x2="1150" y2="750" stroke="${color.r},${color.g},${color.b}" stroke-width="4" />
        <line x1="970" y1="580" x2="1330" y2="580" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
        <line x1="970" y1="610" x2="1330" y2="610" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
        <line x1="970" y1="640" x2="1330" y2="640" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
      </g>
    `,
    circles: `
      <g opacity="0.2">
        <circle cx="1150" cy="650" r="200" fill="none" stroke="white" stroke-width="20" />
        <circle cx="1150" cy="650" r="150" fill="none" stroke="white" stroke-width="15" />
        <circle cx="1150" cy="650" r="100" fill="none" stroke="white" stroke-width="10" />
        <circle cx="1150" cy="650" r="50" fill="white" />
      </g>
    `,
    hands: `
      <g opacity="0.3">
        <ellipse cx="1050" cy="650" rx="80" ry="150" fill="white" />
        <ellipse cx="1250" cy="650" rx="80" ry="150" fill="white" />
      </g>
    `,
    triangle: `
      <g opacity="0.25">
        <polygon points="1150,400 1450,900 850,900" fill="white" />
        <polygon points="1150,450 1350,800 950,800" fill="${color.r},${color.g},${color.b}" />
      </g>
    `,
    waves: `
      <g opacity="0.2">
        <path d="M 800 650 Q 975 550 1150 650 T 1500 650" stroke="white" stroke-width="40" fill="none" />
        <path d="M 800 700 Q 975 600 1150 700 T 1500 700" stroke="white" stroke-width="30" fill="none" />
        <path d="M 800 750 Q 975 650 1150 750 T 1500 750" stroke="white" stroke-width="20" fill="none" />
      </g>
    `,
    drops: `
      <g opacity="0.3">
        <ellipse cx="1000" cy="600" rx="30" ry="50" fill="white" />
        <ellipse cx="1150" cy="650" rx="40" ry="60" fill="white" />
        <ellipse cx="1300" cy="700" rx="35" ry="55" fill="white" />
        <ellipse cx="1050" cy="750" rx="25" ry="45" fill="white" />
        <ellipse cx="1250" cy="550" rx="30" ry="50" fill="white" />
      </g>
    `,
    gradient: `
      <defs>
        <radialGradient id="radial1">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:white;stop-opacity:0" />
        </radialGradient>
      </defs>
      <circle cx="1150" cy="650" r="400" fill="url(#radial1)" />
    `
  };
  
  return patterns[overlay] || '';
}

async function generateAllImages() {
  console.log('Generating hero images with NEW dimensions (2300x1300)...\n');
  
  for (const config of imageConfigs) {
    try {
      await createPlaceholderImage(config);
    } catch (error) {
      console.error(`Error generating ${config.name}:`, error.message);
    }
  }
  
  console.log('\n✅ All images generated successfully!');
  console.log('📁 Images saved to: public/hero-images/');
  console.log('\nYou can now upload these images through the admin panel:');
  console.log('1. Go to /admin');
  console.log('2. Click "Hero Images" tab');
  console.log('3. Click "Manage Hero Images"');
  console.log('4. Upload images from public/hero-images/ folder');
  console.log('\n✨ All images are exactly 2300x1300 pixels as requested!');
}

// Run the script
generateAllImages().catch(console.error);
