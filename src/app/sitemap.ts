import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { occasions } from "@/data/occasions";
import { flowerTypes, weddingTypes } from "@/data/flowers";
import { deliveryAreas } from "@/data/delivery-areas";

const sectionAnchors = [
  "#shop",
  "#occasions",
  "#flowers",
  "#weddings",
  "#custom-orders",
  "#about",
  "#store",
  "#areas",
  "#faqs",
  "#contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const homeEntry = {
    url: siteConfig.url,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 1,
  };

  const sectionEntries = sectionAnchors.map((anchor) => ({
    url: `${siteConfig.url}${anchor}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: anchor === "#shop" ? 0.9 : 0.6,
  }));

  const categoryEntries = categories.map((cat) => ({
    url: `${siteConfig.url}/?category=${cat.slug}#shop`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const occasionEntries = occasions.map((occ) => ({
    url: `${siteConfig.url}/?occasion=${occ.slug}#shop`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const flowerEntries = flowerTypes.map((flower) => ({
    url: `${siteConfig.url}/?flower=${flower.slug}#shop`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const weddingEntries = weddingTypes.map((item) => ({
    url: `${siteConfig.url}/?wedding=${item.slug}#shop`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  const areaEntries = deliveryAreas.map((area) => ({
    url: `${siteConfig.url}/#${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  const productEntries = products.map((product) => ({
    url: `${siteConfig.url}/?product=${product.slug}#shop`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    homeEntry,
    ...sectionEntries,
    ...categoryEntries,
    ...occasionEntries,
    ...flowerEntries,
    ...weddingEntries,
    ...areaEntries,
    ...productEntries,
  ];
}
