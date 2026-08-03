import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/config";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const productEntries = products.map((product) => ({
    url: `${siteConfig.url}/?product=${product.slug}#shop`,
    lastModified: new Date(product.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categorySlugs = [
    "floral-bouquets",
    "floral-chocolate-bouquets",
    "floral-boxes",
    "floral-chocolate-boxes",
    "baskets",
    "money-bouquets",
    "crochet-flowers",
  ];

  const categoryEntries = categorySlugs.map((slug) => ({
    url: `${siteConfig.url}/?category=${slug}#shop`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...categoryEntries,
    ...productEntries,
  ];
}
