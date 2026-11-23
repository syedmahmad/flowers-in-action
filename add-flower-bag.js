const fs = require('fs');

let content = fs.readFileSync('src/data/bouquets.ts', 'utf8');

const newBouquet = `  {
    id: "bq-113",
    slug: "purple-white-artificial-flower-bag",
    name: "Purple & White Artificial Flower Bag",
    description: "A charming arrangement of purple and white artificial flowers presented in an elegant quilted purple gift bag with butterfly accents.",
    image: "/images/bouquets/web/purple-flower-bag.jpg",
    imageAlt: "Purple & White Artificial Flower Bag by Phool Pattiyan Lahore",
    price: 2500,
    originalPrice: 2778,
    discountPercentage: 10,
    flowerOrigin: "artificial",
    featured: true,
    available: true,
  },
`;

const insertIndex = content.lastIndexOf('  {');
if (insertIndex !== -1) {
  content = content.substring(0, insertIndex) + newBouquet + content.substring(insertIndex);
  fs.writeFileSync('src/data/bouquets.ts', content);
  console.log('Added flower bag bouquet');
} else {
  console.error('Could not find insert point');
}
