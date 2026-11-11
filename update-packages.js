const fs = require('fs');

let content = fs.readFileSync('src/data/events.ts', 'utf8');

const packageReplacements = `  {
    id: "ev-37",
    slug: "silver-room-decor-package",
    name: "Silver Room Decor Package",
    description: "Elegant room decor featuring 2 side styling (bed head side and foot side) along with side table bunches for a beautiful and subtle romantic setup.",
    images: [
      "/images/events/web/room-decor-gold-1.jpg",
      "/images/events/web/room-decor-gold-2.jpg",
      "/images/events/web/room-decor-gold-3.jpg"
    ],
    imageAlt: "Silver Room Decor Package by Phool Pattiyan Lahore",
    price: 20000,
    originalPrice: 22222,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Headboard floral border", "Footboard floral border", "2 Side table bunches", "Setup in Lahore"],
    featured: true,
    available: true,
  },
  {
    id: "ev-38",
    slug: "gold-room-decor-package",
    name: "Gold Room Decor Package",
    description: "Premium room decor with lush floral arrangements covering all 4 sides of the bed, creating a stunning and immersive floral experience.",
    images: [
      "/images/events/web/room-decor-silver-1.jpg",
      "/images/events/web/room-decor-silver-2.jpg",
      "/images/events/web/room-decor-silver-3.jpg"
    ],
    imageAlt: "Gold Room Decor Package by Phool Pattiyan Lahore",
    price: 30000,
    originalPrice: 33333,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Floral arrangements on all 4 sides", "Side table styling", "Premium red & white roses", "Setup in Lahore"],
    featured: true,
    available: true,
  },
  {
    id: "ev-39",
    slug: "platinum-room-decor-package",
    name: "Platinum Room Decor Package",
    description: "Our most luxurious elevated room decor. Features a complete grand canopy, flowers on all 4 sides, elaborate side tables, and rose petals scattered on the floor.",
    images: [
      "/images/events/web/room-decor-platinum-1.jpg",
      "/images/events/web/room-decor-platinum-2.jpg",
      "/images/events/web/room-decor-platinum-3.jpg"
    ],
    imageAlt: "Platinum Room Decor Package by Phool Pattiyan Lahore",
    price: 40000,
    originalPrice: 44444,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Grand elevated 4-poster canopy", "Floral arrangements on all 4 sides", "Elaborate side table bunches", "Floor rose petals scatter", "Setup in Lahore"],
    featured: true,
    available: true,
  },
  {
    id: "ev-40",
    slug: "silver-car-decor-package",
    name: "Silver Car Decor Package",
    description: "Elegant and subtle car decor featuring a single bunch of flowers with net/ribbon on the car. Perfect for adding a touch of class to your special day.",
    images: [
      "/images/events/web/car-decor-silver-1.jpg",
      "/images/events/web/car-decor-silver-3.jpg",
      "/images/events/web/car-decor-silver-4.jpg",
      "/images/events/web/car-decor-silver-5.jpg",
      "/images/events/web/car-decor-gold-1.jpg"
    ],
    imageAlt: "Silver Car Decor Package by Phool Pattiyan Lahore",
    price: 7000,
    originalPrice: 7778,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Single floral bunch", "Net and ribbon styling", "Setup in Lahore"],
    featured: true,
    available: true,
  },
  {
    id: "ev-41",
    slug: "gold-car-decor-package",
    name: "Gold Car Decor Package",
    description: "Premium car decoration featuring 2 bunches of flowers with lush trails and rich side embellishments to make your wedding car truly stand out.",
    images: [
      "/images/events/web/car-decor-gold-2.jpg",
      "/images/events/web/car-decor-gold-3.jpg",
      "/images/events/web/car-decor-gold-4.jpg",
      "/images/events/web/car-decor-gold-5.jpg",
      "/images/events/web/car-decor-platinum-4.jpg"
    ],
    imageAlt: "Gold Car Decor Package by Phool Pattiyan Lahore",
    price: 14000,
    originalPrice: 15556,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["2 floral bunches", "Premium ribbon draping", "Matching side accents", "Setup in Lahore"],
    featured: true,
    available: true,
  },
  {
    id: "ev-42",
    slug: "platinum-car-decor-package",
    name: "Platinum Car Decor Package",
    description: "Our most lavish car decor package. Features 3 beautiful bunches with trailing garlands, fully covered sections, and the most premium blooms for an absolutely grand arrival.",
    images: [
      "/images/events/web/car-decor-silver-2.jpg",
      "/images/events/web/car-decor-platinum-1.jpg",
      "/images/events/web/car-decor-platinum-2.jpg",
      "/images/events/web/car-decor-platinum-3.jpg",
      "/images/events/web/car-decor-platinum-5.jpg"
    ],
    imageAlt: "Platinum Car Decor Package by Phool Pattiyan Lahore",
    price: 20000,
    originalPrice: 22222,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["3 full floral bunches", "Luxurious trailing garlands", "Premium imported blooms", "Complete vehicle styling", "Setup in Lahore"],
    featured: true,
    available: true,
  }
];`;

const startIdx = content.indexOf('  {\n    id: "ev-37"');
if (startIdx !== -1) {
  content = content.substring(0, startIdx) + packageReplacements + '\n';
  fs.writeFileSync('src/data/events.ts', content);
  console.log('Updated events.ts');
} else {
  console.error('ev-37 not found');
}
