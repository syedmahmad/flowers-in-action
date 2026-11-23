const fs = require('fs');

let content = fs.readFileSync('src/data/bouquets.ts', 'utf8');

const newBouquet = `  {
    id: "bq-112",
    slug: "artificial-purple-rose-bouquet",
    name: "Artificial Purple Rose Bouquet",
    description: "Beautiful long-lasting artificial purple roses wrapped in elegant purple and yellow paper. A timeless gift.",
    image: "/images/bouquets/web/artificial-purple-rose.jpg",
    imageAlt: "Artificial Purple Rose Bouquet by Phool Pattiyan Lahore",
    price: 5000,
    originalPrice: 5556,
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
  console.log('Added bouquet');
} else {
  console.error('Could not find insert point');
}
