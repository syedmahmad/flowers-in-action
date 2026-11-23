const fs = require('fs');

let content = fs.readFileSync('src/data/events.ts', 'utf8');

const newEvent = `  {
    id: "ev-43",
    slug: "blue-gold-aqeeqah-mubarak",
    name: "Blue & Gold Aqeeqah Mubarak",
    description: "Elegant Aqeeqah celebration setup featuring a beautiful round hoop adorned with white, blue, and gold balloon garlands, complete with custom 'Aqeeqah Mubarak' acrylic signage.",
    images: ["/images/events/web/blue-gold-aqeeqah-mubarak.jpg"],
    imageAlt: "Blue & Gold Aqeeqah Mubarak Balloon Decor by Phool Pattiyan Lahore",
    price: 18000,
    originalPrice: 20000,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Round hoop backdrop", "Custom acrylic signage", "Premium blue, gold & white balloon garland", "Floral touches", "Setup in Lahore"],
    featured: true,
    available: true,
  },
`;

const insertIndex = content.lastIndexOf('  {');
if (insertIndex !== -1) {
  content = content.substring(0, insertIndex) + newEvent + content.substring(insertIndex);
  fs.writeFileSync('src/data/events.ts', content);
  console.log('Added aqeeqa event');
} else {
  console.error('Could not find insert point');
}
