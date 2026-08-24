#!/usr/bin/env node
/** Generate bouquets.ts and events.ts from catalog-manifest.json */

import fs from "fs";
import path from "path";

const manifest = JSON.parse(
  fs.readFileSync("public/images/catalog-manifest.json", "utf8")
);

function serializeBouquets(bouquets) {
  const items = bouquets.map((b) => {
    const lines = [
      `  {`,
      `    id: "${b.id}",`,
      `    slug: "${b.slug}",`,
      `    name: "${b.name.replace(/"/g, '\\"')}",`,
      `    description: "${(b.description || "").replace(/"/g, '\\"')}",`,
      `    image: "${b.image}",`,
      `    imageAlt: "${b.imageAlt.replace(/"/g, '\\"')}",`,
      `    price: ${b.price},`,
    ];
    if (b.originalPrice) lines.push(`    originalPrice: ${b.originalPrice},`);
    if (b.discountPercentage) lines.push(`    discountPercentage: ${b.discountPercentage},`);
    lines.push(
      `    flowerOrigin: "${b.origin || b.flowerOrigin}",`,
      `    featured: ${Boolean(b.featured)},`,
      `    available: true,`,
      `  },`
    );
    return lines.join("\n");
  });

  return `import type { Bouquet } from "@/types/catalog";

/** Auto-generated from public/images/catalog-manifest.json — run: node scripts/generate-catalog-data.mjs */
export const bouquets: Bouquet[] = [
${items.join("\n")}
];

export const localBouquets = bouquets.filter((b) => b.flowerOrigin === "local");
export const importedBouquets = bouquets.filter((b) => b.flowerOrigin === "imported");
export const featuredBouquets = bouquets.filter((b) => b.featured);

export function findBouquetBySlug(slug: string): Bouquet | undefined {
  return bouquets.find((b) => b.slug === slug);
}
`;
}

function serializeEvents(events) {
  const items = events.map((e) => {
    const images = e.images.map((i) => `"${i}"`).join(", ");
    const included = (e.includedItems || [])
      .map((x) => `"${x.replace(/"/g, '\\"')}"`)
      .join(", ");
    const lines = [
      `  {`,
      `    id: "${e.id}",`,
      `    slug: "${e.slug}",`,
      `    name: "${e.name.replace(/"/g, '\\"')}",`,
      `    description: "${e.description.replace(/"/g, '\\"')}",`,
      `    images: [${images}],`,
      `    imageAlt: "${e.imageAlt.replace(/"/g, '\\"')}",`,
      `    price: ${e.price},`,
    ];
    if (e.originalPrice) lines.push(`    originalPrice: ${e.originalPrice},`);
    if (e.discountPercentage) lines.push(`    discountPercentage: ${e.discountPercentage},`);
    lines.push(
      `    pricePrefix: "${e.pricePrefix || "Starting from"}",`,
      `    includedItems: [${included}],`,
      `    featured: ${Boolean(e.featured)},`,
      `    available: true,`,
      `  },`
    );
    return lines.join("\n");
  });

  return `import type { EventPackage } from "@/types/catalog";

/** Auto-generated from public/images/catalog-manifest.json — run: node scripts/generate-catalog-data.mjs */
export const events: EventPackage[] = [
${items.join("\n")}
];

export const featuredEvents = events.filter((e) => e.featured);

export function findEventBySlug(slug: string): EventPackage | undefined {
  return events.find((e) => e.slug === slug);
}
`;
}

fs.writeFileSync("src/data/bouquets.ts", serializeBouquets(manifest.bouquets));
fs.writeFileSync("src/data/events.ts", serializeEvents(manifest.events));
console.log("Generated bouquets.ts and events.ts");
