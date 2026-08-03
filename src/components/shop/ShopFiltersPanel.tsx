"use client";

import { categories } from "@/data/categories";
import { occasions } from "@/data/occasions";
import { flowerTypes, weddingTypes, featuredCollections } from "@/data/flowers";
import type { ShopFilters, SortOption } from "@/types/product";

interface ShopFiltersPanelProps {
  filters: ShopFilters;
  onChange: (filters: ShopFilters) => void;
  onClear: () => void;
  resultCount: number;
}

export function ShopFiltersPanel({
  filters,
  onChange,
  onClear,
  resultCount,
}: ShopFiltersPanelProps) {
  const update = (partial: Partial<ShopFilters>) => {
    onChange({ ...filters, ...partial });
  };

  return (
    <aside className="space-y-6" aria-label="Product filters">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-charcoal/70">
          {resultCount} product{resultCount !== 1 ? "s" : ""}
        </p>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-medium text-maroon hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <label htmlFor="search" className="mb-2 block text-sm font-semibold text-maroon-deep">
          Search
        </label>
        <input
          id="search"
          type="search"
          value={filters.search || ""}
          onChange={(e) => update({ search: e.target.value || undefined })}
          placeholder="Search products..."
          className="w-full rounded-xl border border-blush bg-white px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
        />
      </div>

      <div>
        <label htmlFor="sort" className="mb-2 block text-sm font-semibold text-maroon-deep">
          Sort by
        </label>
        <select
          id="sort"
          value={filters.sort || "featured"}
          onChange={(e) => update({ sort: e.target.value as SortOption })}
          className="w-full rounded-xl border border-blush bg-white px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-maroon-deep">Category</legend>
        <div className="space-y-1">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.slug}
                onChange={() => update({ category: cat.slug, wedding: undefined })}
                className="accent-maroon"
              />
              {cat.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-maroon-deep">Occasion</legend>
        <div className="max-h-48 space-y-1 overflow-y-auto">
          {occasions.map((occ) => (
            <label key={occ.slug} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="occasion"
                checked={filters.occasion === occ.slug}
                onChange={() => update({ occasion: occ.slug })}
                className="accent-maroon"
              />
              {occ.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-maroon-deep">Flower Type</legend>
        <div className="space-y-1">
          {flowerTypes.map((flower) => (
            <label key={flower.slug} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="flower"
                checked={filters.flower === flower.slug}
                onChange={() => update({ flower: flower.slug })}
                className="accent-maroon"
              />
              {flower.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-maroon-deep">Wedding</legend>
        <div className="space-y-1">
          {weddingTypes.map((w) => (
            <label key={w.slug} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="wedding"
                checked={filters.wedding === w.slug}
                onChange={() => update({ wedding: w.slug, category: undefined })}
                className="accent-maroon"
              />
              {w.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 text-sm font-semibold text-maroon-deep">Collection</legend>
        <div className="space-y-1">
          {featuredCollections.map((col) => (
            <label key={col.slug} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
              <input
                type="radio"
                name="collection"
                checked={filters.collection === col.slug}
                onChange={() => update({ collection: col.slug })}
                className="accent-maroon"
              />
              {col.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="minPrice" className="mb-1 block text-xs font-medium text-charcoal/70">
            Min PKR
          </label>
          <input
            id="minPrice"
            type="number"
            min={0}
            value={filters.minPrice ?? ""}
            onChange={(e) =>
              update({
                minPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-lg border border-blush px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="maxPrice" className="mb-1 block text-xs font-medium text-charcoal/70">
            Max PKR
          </label>
          <input
            id="maxPrice"
            type="number"
            min={0}
            value={filters.maxPrice ?? ""}
            onChange={(e) =>
              update({
                maxPrice: e.target.value ? Number(e.target.value) : undefined,
              })
            }
            className="w-full rounded-lg border border-blush px-3 py-2 text-sm"
          />
        </div>
      </div>
    </aside>
  );
}
