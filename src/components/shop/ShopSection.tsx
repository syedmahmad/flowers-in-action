"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { occasions } from "@/data/occasions";
import { flowerTypes, weddingTypes, featuredCollections } from "@/data/flowers";
import { siteConfig } from "@/data/config";
import {
  filterProducts,
  parseShopFilters,
  findProductBySlug,
} from "@/lib/filters";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductModal } from "@/components/shop/ProductModal";
import { ShopFiltersPanel } from "@/components/shop/ShopFiltersPanel";
import type { Product, ShopFilters } from "@/types/product";

function getFilterIntro(filters: ShopFilters): string | null {
  if (filters.category) {
    return categories.find((c) => c.slug === filters.category)?.intro ?? null;
  }
  if (filters.occasion) {
    return occasions.find((o) => o.slug === filters.occasion)?.intro ?? null;
  }
  if (filters.flower) {
    return flowerTypes.find((f) => f.slug === filters.flower)?.intro ?? null;
  }
  if (filters.wedding) {
    return weddingTypes.find((w) => w.slug === filters.wedding)?.intro ?? null;
  }
  if (filters.collection) {
    const col = featuredCollections.find((c) => c.slug === filters.collection);
    return col ? `Browse our ${col.label.toLowerCase()} collection.` : null;
  }
  return null;
}

function filtersToQuery(filters: ShopFilters): string {
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
  return params.toString();
}

export function ShopSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filters = useMemo(
    () => parseShopFilters(searchParams),
    [searchParams]
  );

  const selectedProduct = useMemo(() => {
    const slug = searchParams.get("product");
    if (!slug) return null;
    return findProductBySlug(products, slug) ?? null;
  }, [searchParams]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [filters]
  );

  const filterIntro = getFilterIntro(filters);

  const syncUrl = useCallback(
    (newFilters: ShopFilters) => {
      const query = filtersToQuery(newFilters);
      const path = query ? `/?${query}` : "/";
      router.replace(path, { scroll: false });
      window.history.replaceState(null, "", `${path}#shop`);
    },
    [router]
  );

  const handleFilterChange = (newFilters: ShopFilters) => {
    syncUrl(newFilters);
  };

  const handleClearFilters = () => {
    router.replace("/", { scroll: false });
    window.history.replaceState(null, "", "/#shop");
  };

  const handleViewDetails = (product: Product) => {
    syncUrl({ ...filters, product: product.slug });
  };

  const handleCloseModal = () => {
    const { product, ...rest } = filters;
    void product;
    syncUrl(rest);
  };

  return (
    <section id="shop" className="section-padding bg-blush/30">
      <div className="container-narrow">
        <div className="mb-8 text-center">
          <h2 className="heading-serif mb-3 text-2xl font-bold text-maroon-deep sm:text-3xl lg:text-4xl">
            Shop Our Collection
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-charcoal/80 sm:text-base">
            Browse fresh bouquets, floral boxes, wedding flowers and personalised gifts.
            Order directly on WhatsApp.
          </p>
          <p className="mt-3 text-sm text-charcoal/60">{siteConfig.advancePaymentNote}</p>
        </div>

        <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="shrink-0 rounded-full border border-maroon px-4 py-2 text-sm font-medium text-maroon"
          >
            {mobileFiltersOpen ? "Hide Filters" : "Filters"}
          </button>
          {featuredCollections.slice(0, 4).map((col) => (
            <button
              key={col.slug}
              type="button"
              onClick={() =>
                handleFilterChange({ ...filters, collection: col.slug })
              }
              className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-medium text-charcoal shadow-sm"
            >
              {col.label}
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className={`${mobileFiltersOpen ? "block" : "hidden"} lg:block`}>
            <div className="sticky top-[4.5rem] rounded-2xl bg-white p-4 card-shadow sm:top-24 sm:p-5">
              <ShopFiltersPanel
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
                resultCount={filteredProducts.length}
              />
            </div>
          </div>

          <div>
            {filterIntro && (
              <p className="mb-6 rounded-xl bg-white p-4 text-sm leading-relaxed text-charcoal/80 card-shadow">
                {filterIntro}
              </p>
            )}

            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl bg-white p-12 text-center card-shadow">
                <p className="text-lg text-charcoal/70">
                  No products match your filters. Try adjusting your selection or contact us
                  on WhatsApp for a custom order.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 rounded-xl bg-white p-5 text-center text-sm text-charcoal/70 card-shadow">
              {siteConfig.advancePaymentNote}
            </div>
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={handleCloseModal} />
    </section>
  );
}
