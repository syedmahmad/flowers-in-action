"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { siteConfig } from "@/data/config";
import { deliveryNotice, substitutionNotice } from "@/data/products";
import {
  getDiscountedPrice,
  formatPrice,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";
import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!product) return null;

  const discounted = getDiscountedPrice(
    product.originalPrice,
    product.discountPercentage
  );
  const images = product.gallery.length > 0 ? product.gallery : [product.image];

  return (
    <Modal isOpen={!!product} onClose={onClose} title={product.name}>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="relative mb-3 aspect-square overflow-hidden rounded-xl">
            <Image
              src={images[activeImage]}
              alt={product.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative h-16 w-16 overflow-hidden rounded-lg border-2 ${
                    activeImage === i ? "border-maroon" : "border-transparent"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            <Badge variant="discount">
              {getDiscountBadge(product.discountPercentage)}
            </Badge>
            {product.customisable && <Badge variant="custom">Customisable</Badge>}
            <Badge variant="neutral">Code: {product.productCode}</Badge>
          </div>

          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-lg text-charcoal/50 line-through">
              PKR {formatPrice(product.originalPrice)}
            </span>
            <span className="text-2xl font-bold text-maroon">
              PKR {formatPrice(discounted)}
            </span>
          </div>

          <p className="mb-4 leading-relaxed text-charcoal/90">
            {product.fullDescription}
          </p>

          <div className="mb-4 space-y-3 text-sm">
            <div>
              <h3 className="font-semibold text-maroon-deep">Composition</h3>
              <ul className="mt-1 list-inside list-disc text-charcoal/80">
                {product.composition.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-maroon-deep">Recommended Occasions</h3>
              <p className="mt-1 capitalize text-charcoal/80">
                {product.occasions.map((o) => o.replace(/-/g, " ")).join(", ")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-maroon-deep">Colour Palette</h3>
              <p className="mt-1 text-charcoal/80">{product.colours.join(", ")}</p>
            </div>
            {product.customisationOptions.length > 0 && (
              <div>
                <h3 className="font-semibold text-maroon-deep">Customisation Options</h3>
                <p className="mt-1 text-charcoal/80">
                  {product.customisationOptions.join(", ")}
                </p>
              </div>
            )}
          </div>

          <div className="mb-4 space-y-2 rounded-xl bg-blush/50 p-4 text-sm text-charcoal/80">
            <p>{deliveryNotice}</p>
            <p>{substitutionNotice}</p>
            <p className="font-medium text-maroon-deep">{siteConfig.advancePaymentNote}</p>
          </div>

          <Button
            variant="whatsapp"
            size="lg"
            href={buildProductWhatsAppUrl(product)}
            external
            className="w-full"
          >
            Order on WhatsApp
          </Button>
        </div>
      </div>
    </Modal>
  );
}
