export type FlowerOrigin = "local" | "imported";

export interface Bouquet {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  gallery?: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  flowerOrigin: FlowerOrigin;
  featured?: boolean;
  available?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}

export interface EventPackage {
  id: string;
  slug: string;
  name: string;
  description: string;
  images: string[];
  imageAlt: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  pricePrefix?: "Starting from" | "From";
  includedItems?: string[];
  featured?: boolean;
  available?: boolean;
  seoTitle?: string;
  seoDescription?: string;
}
