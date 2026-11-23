const fs = require('fs');

let content = fs.readFileSync('src/data/events.ts', 'utf8');

const newEvent = `  {
    id: "ev-44",
    slug: "mehndi-yellow-white-floral-stage",
    name: "Yellow & White Floral Mehndi Stage",
    description: "Vibrant indoor Mehndi stage setup featuring a thick floral border of yellow and white roses, draped yellow fabric backdrop, hanging marigold strings, and magical fairy lights.",
    images: ["/images/events/web/mehndi-yellow-white-floral-stage.jpg"],
    imageAlt: "Yellow & White Floral Mehndi Stage Setup by Phool Pattiyan Lahore",
    price: 25000,
    originalPrice: 27778,
    discountPercentage: 10,
    pricePrefix: "Starting from",
    includedItems: ["Yellow fabric draping", "White & yellow rose floral border", "Hanging marigold strings", "Fairy lights curtain", "Setup in Lahore"],
    featured: true,
    available: true,
  },
`;

const insertIndex = content.lastIndexOf('  {');
if (insertIndex !== -1) {
  content = content.substring(0, insertIndex) + newEvent + content.substring(insertIndex);
  fs.writeFileSync('src/data/events.ts', content);
  console.log('Added mehndi event');
} else {
  console.error('Could not find insert point');
}
