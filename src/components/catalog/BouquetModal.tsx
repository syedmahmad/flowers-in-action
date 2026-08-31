"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { getBouquetImages } from "@/lib/bouquet-images";
import {
  formatPrice,
  getSellingPrice,
  hasDiscount,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildBouquetWhatsAppUrl } from "@/lib/whatsapp";
import type { Bouquet } from "@/types/catalog";

interface BouquetModalProps {
  bouquet: Bouquet | null;
  onClose: () => void;
}

export function BouquetModal({ bouquet, onClose }: BouquetModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  const images = bouquet ? getBouquetImages(bouquet) : [];

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!bouquet || images.length <= 1) return;
      if (e.key === "ArrowRight") {
        setActiveImage((i) => (i + 1) % images.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveImage((i) => (i - 1 + images.length) % images.length);
      }
    },
    [bouquet, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    setActiveImage(0);
  }, [bouquet?.slug]);

  if (!bouquet) return null;

  const price = getSellingPrice(bouquet);
  const discounted = hasDiscount(bouquet);

  return (
    <Modal isOpen={!!bouquet} onClose={onClose} title={bouquet.name}>
      <div className="space-y-5" key={bouquet.slug}>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-blush/30 sm:aspect-[3/4]">
          <Image
            src={images[activeImage]}
            alt={`${bouquet.imageAlt} — photo ${activeImage + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
            priority
          />
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setActiveImage(index)}
                className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${
                  index === activeImage ? "border-maroon" : "border-transparent"
                }`}
                aria-label={`View photo ${index + 1}`}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        <p className="text-sm leading-relaxed text-charcoal/80 sm:text-base">
          {bouquet.description}
        </p>

        <div className="rounded-xl bg-blush/40 p-4">
          <p className="text-sm text-charcoal/70">
            <span className="text-xl font-bold text-maroon">PKR {formatPrice(price)}</span>
            {discounted && bouquet.originalPrice && (
              <>
                {" "}
                <span className="text-sm line-through text-charcoal/45">
                  PKR {formatPrice(bouquet.originalPrice)}
                </span>
                {bouquet.discountPercentage && (
                  <span className="ml-2 text-xs font-medium text-maroon">
                    {getDiscountBadge(bouquet.discountPercentage)}
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        <Button
          variant="whatsapp"
          size="lg"
          href={buildBouquetWhatsAppUrl(bouquet)}
          external
          className="w-full"
        >
          Order on WhatsApp
        </Button>
      </div>
    </Modal>
  );
}
