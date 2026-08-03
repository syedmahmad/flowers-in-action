import { getDiscountedPrice } from "@/lib/pricing";
import type { Product, ShopFilters, SortOption } from "@/types/product";

export function filterProducts(
  products: Product[],
  filters: ShopFilters
): Product[] {
  let result = products.filter((p) => p.available);

  if (filters.category) {
    result = result.filter((p) => p.category === filters.category);
  }
  if (filters.occasion) {
    result = result.filter((p) => p.occasions.includes(filters.occasion!));
  }
  if (filters.flower) {
    result = result.filter((p) => p.flowerTypes.includes(filters.flower!));
  }
  if (filters.wedding) {
    result = result.filter((p) => p.weddingType === filters.wedding);
  }
  if (filters.collection) {
    result = result.filter((p) =>
      p.featuredCollections.includes(filters.collection!)
    );
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q)
    );
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(
      (p) =>
        getDiscountedPrice(p.originalPrice, p.discountPercentage) >=
        filters.minPrice!
    );
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(
      (p) =>
        getDiscountedPrice(p.originalPrice, p.discountPercentage) <=
        filters.maxPrice!
    );
  }

  return sortProducts(result, filters.sort || "featured");
}

export function sortProducts(
  products: Product[],
  sort: SortOption
): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-low":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(a.originalPrice, a.discountPercentage) -
          getDiscountedPrice(b.originalPrice, b.discountPercentage)
      );
    case "price-high":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(b.originalPrice, b.discountPercentage) -
          getDiscountedPrice(a.originalPrice, a.discountPercentage)
      );
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "featured":
    default:
      return sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
  }
}

export function findProductBySlug(
  products: Product[],
  slug: string
): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function parseShopFilters(
  params: URLSearchParams
): ShopFilters {
  const filters: ShopFilters = {};
  const category = params.get("category");
  const occasion = params.get("occasion");
  const flower = params.get("flower");
  const wedding = params.get("wedding");
  const collection = params.get("collection");
  const search = params.get("search");
  const product = params.get("product");
  const sort = params.get("sort") as SortOption | null;
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");

  if (category) filters.category = category as ShopFilters["category"];
  if (occasion) filters.occasion = occasion as ShopFilters["occasion"];
  if (flower) filters.flower = flower as ShopFilters["flower"];
  if (wedding) filters.wedding = wedding as ShopFilters["wedding"];
  if (collection) filters.collection = collection as ShopFilters["collection"];
  if (search) filters.search = search;
  if (product) filters.product = product;
  if (sort) filters.sort = sort;
  if (minPrice) filters.minPrice = Number(minPrice);
  if (maxPrice) filters.maxPrice = Number(maxPrice);

  return filters;
}

export function buildShopUrl(filters: ShopFilters): string {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.occasion) params.set("occasion", filters.occasion);
  if (filters.flower) params.set("flower", filters.flower);
  if (filters.wedding) params.set("wedding", filters.wedding);
  if (filters.collection) params.set("collection", filters.collection);
  if (filters.search) params.set("search", filters.search);
  if (filters.product) params.set("product", filters.product);
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.minPrice !== undefined)
    params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined)
    params.set("maxPrice", String(filters.maxPrice));

  const query = params.toString();
  return query ? `/?${query}#shop` : "/#shop";
}
