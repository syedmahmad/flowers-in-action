export type ProductCategory =
  | "floral-bouquets"
  | "floral-chocolate-bouquets"
  | "floral-boxes"
  | "floral-chocolate-boxes"
  | "baskets"
  | "money-bouquets"
  | "crochet-flowers";

export type WeddingType =
  | "floral-jewellery"
  | "bridal-bouquets"
  | "groom-garlands"
  | "car-decoration"
  | "room-decoration";

export type OccasionSlug =
  | "wedding"
  | "birthday"
  | "congratulations"
  | "anniversary-love"
  | "apology"
  | "get-well-soon"
  | "graduation"
  | "valentines-day"
  | "mothers-day"
  | "fathers-day"
  | "womens-day"
  | "eid"
  | "ramadan";

export type FlowerType =
  | "roses"
  | "sunflowers"
  | "chrysanthemums"
  | "lilies"
  | "babys-breath";

export type FeaturedCollection =
  | "under-5000"
  | "romantic-favourites"
  | "birthday-bestsellers"
  | "wedding-essentials"
  | "chocolate-flower-gifts"
  | "same-day-favourites"
  | "personalised-gifts"
  | "seasonal-flowers";

export interface Product {
  id: string;
  slug: string;
  name: string;
  productCode: string;
  shortDescription: string;
  fullDescription: string;
  originalPrice: number;
  discountPercentage: number;
  category: ProductCategory;
  occasions: OccasionSlug[];
  flowerTypes: FlowerType[];
  weddingType: WeddingType | null;
  composition: string[];
  customisationOptions: string[];
  colours: string[];
  image: string;
  gallery: string[];
  featured: boolean;
  available: boolean;
  customisable: boolean;
  sameDay: boolean;
  featuredCollections: FeaturedCollection[];
  seoTitle: string;
  seoDescription: string;
  imageAlt: string;
  createdAt: string;
}

export type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "newest";

export interface ShopFilters {
  category?: ProductCategory;
  occasion?: OccasionSlug;
  flower?: FlowerType;
  wedding?: WeddingType;
  collection?: FeaturedCollection;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: SortOption;
  product?: string;
}
