"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  getDiscountedPrice,
  formatPrice,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const discounted = getDiscountedPrice(
    product.originalPrice,
    product.discountPercentage
  );

  const metaTags = [
    product.customisable && "Customisable",
    product.sameDay && "Same day",
  ].filter(Boolean);

  return (
    <article className="card-shadow flex flex-col overflow-hidden rounded-xl bg-white sm:rounded-2xl sm:card-shadow-hover">
      <button
        type="button"
        onClick={() => onViewDetails(product)}
        className="group relative aspect-[4/3] overflow-hidden text-left sm:aspect-square"
        aria-label={`View details for ${product.name}`}
      >
        <Image
          src={product.image}
          alt={product.imageAlt}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 640px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-2 top-2">
          <Badge variant="discount" className="text-[10px] px-2 py-0.5 sm:text-xs">
            {getDiscountBadge(product.discountPercentage)}
          </Badge>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <button type="button" onClick={() => onViewDetails(product)} className="text-left">
          <h3 className="heading-serif mb-1 line-clamp-2 text-sm font-semibold leading-snug text-maroon-deep sm:text-base lg:text-lg">
            {product.name}
          </h3>
        </button>

        {metaTags.length > 0 && (
          <p className="mb-1.5 text-[11px] text-green-natural sm:text-xs">
            {metaTags.join(" · ")}
          </p>
        )}

        <p className="mb-2 hidden line-clamp-2 text-xs text-charcoal/70 sm:block sm:text-sm">
          {product.shortDescription}
        </p>

        <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-xs text-charcoal/50 line-through sm:text-sm">
            PKR {formatPrice(product.originalPrice)}
          </span>
          <span className="text-base font-bold text-maroon sm:text-lg lg:text-xl">
            PKR {formatPrice(discounted)}
          </span>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-2 sm:flex sm:flex-col">
          <Button
            variant="whatsapp"
            size="sm"
            href={buildProductWhatsAppUrl(product)}
            external
            className="col-span-2 w-full px-3 text-xs sm:col-span-1 sm:text-sm"
          >
            <span className="sm:hidden">Order</span>
            <span className="hidden sm:inline">Order on WhatsApp</span>
          </Button>
          <button
            type="button"
            onClick={() => onViewDetails(product)}
            className="col-span-2 py-1.5 text-center text-xs font-medium text-maroon underline-offset-2 hover:underline sm:col-span-1 sm:py-2 sm:text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
