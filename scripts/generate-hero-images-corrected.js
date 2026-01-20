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
  
  // Create base gradient background with correct dimensions (1905x800)
  const svg = `
    <svg width="1905" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:rgb(${color.r},${color.g},${color.b});stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(${Math.max(0, color.r - 50)},${Math.max(0, color.g - 50)},${Math.max(0, color.b - 50)});stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1905" height="800" fill="url(#grad1)" />
      
      <!-- Add overlay pattern -->
      ${getOverlayPattern(overlay, color)}
      
      <!-- Add title text -->
      <text x="952" y="400" font-family="Arial, sans-serif" font-size="36" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9">
        ${title}
      </text>
      <text x="952" y="440" font-family="Arial, sans-serif" font-size="18" text-anchor="middle" fill="white" opacity="0.7">
        Hero Background Image
      </text>
    </svg>
  `;

  const outputPath = path.join(__dirname, '..', 'public', 'hero-images', `${name}-corrected.jpg`);
  
  // Ensure directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 85 })
    .toFile(outputPath);
  
  console.log(`Generated: ${name}-corrected.jpg (1905x800)`);
}

function getOverlayPattern(overlay, color) {
  const patterns = {
    cross: `
      <g opacity="0.3">
        <rect x="902" y="300" width="100" height="200" fill="white" />
        <rect x="852" y="350" width="200" height="100" fill="white" />
      </g>
    `,
    geometric: `
      <g opacity="0.2">
        <polygon points="952,200 1202,400 952,600 702,400" fill="none" stroke="white" stroke-width="15" />
        <polygon points="952,250 1102,400 952,550 802,400" fill="none" stroke="white" stroke-width="8" />
      </g>
    `,
    rays: `
      <g opacity="0.25">
        <path d="M 952 400 L 1500 100" stroke="white" stroke-width="20" />
        <path d="M 952 400 L 1500 700" stroke="white" stroke-width="20" />
        <path d="M 952 400 L 400 100" stroke="white" stroke-width="20" />
        <path d="M 952 400 L 400 700" stroke="white" stroke-width="20" />
      </g>
    `,
    book: `
      <g opacity="0.3">
        <rect x="752" y="300" width="400" height="200" fill="white" rx="10" />
        <line x1="952" y1="300" x2="952" y2="500" stroke="${color.r},${color.g},${color.b}" stroke-width="3" />
        <line x1="772" y1="330" x2="1132" y2="330" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
        <line x1="772" y1="360" x2="1132" y2="360" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
        <line x1="772" y1="390" x2="1132" y2="390" stroke="${color.r},${color.g},${color.b}" stroke-width="2" />
      </g>
    `,
    circles: `
      <g opacity="0.2">
        <circle cx="952" cy="400" r="150" fill="none" stroke="white" stroke-width="15" />
        <circle cx="952" cy="400" r="110" fill="none" stroke="white" stroke-width="10" />
        <circle cx="952" cy="400" r="70" fill="none" stroke="white" stroke-width="8" />
        <circle cx="952" cy="400" r="30" fill="white" />
      </g>
    `,
    hands: `
      <g opacity="0.3">
        <ellipse cx="852" cy="400" rx="60" ry="120" fill="white" />
        <ellipse cx="1052" cy="400" rx="60" ry="120" fill="white" />
      </g>
    `,
    triangle: `
      <g opacity="0.25">
        <polygon points="952,200 1252,700 652,700" fill="white" />
        <polygon points="952,250 1102,600 802,600" fill="${color.r},${color.g},${color.b}" />
      </g>
    `,
    waves: `
      <g opacity="0.2">
        <path d="M 602 400 Q 777 300 952 400 T 1302 400" stroke="white" stroke-width="30" fill="none" />
        <path d="M 602 450 Q 777 350 952 450 T 1302 450" stroke="white" stroke-width="20" fill="none" />
        <path d="M 602 500 Q 777 400 952 500 T 1302 500" stroke="white" stroke-width="15" fill="none" />
      </g>
    `,
    drops: `
      <g opacity="0.3">
        <ellipse cx="802" cy="350" rx="25" ry="40" fill="white" />
        <ellipse cx="952" cy="400" rx="30" ry="50" fill="white" />
        <ellipse cx="1102" cy="450" rx="25" ry="40" fill="white" />
        <ellipse cx="852" cy="500" rx="20" ry="35" fill="white" />
        <ellipse cx="1052" cy="300" rx="25" ry="40" fill="white" />
      </g>
    `,
    gradient: `
      <defs>
        <radialGradient id="radial1">
          <stop offset="0%" style="stop-color:white;stop-opacity:0.8" />
          <stop offset="100%" style="stop-color:white;stop-opacity:0" />
        </radialGradient>
      </defs>
      <circle cx="952" cy="400" r="300" fill="url(#radial1)" />
    `
  };
  
  return patterns[overlay] || '';
}

async function generateAllImages() {
  console.log('Generating hero images with CORRECT dimensions (1905x800)...\n');
  
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
  console.log('\n✨ All images are exactly 1905x800 pixels as required!');
}

// Run the script
generateAllImages().catch(console.error);
