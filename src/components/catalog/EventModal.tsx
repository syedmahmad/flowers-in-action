"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  formatPrice,
  hasDiscount,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildEventWhatsAppUrl } from "@/lib/whatsapp";
import type { EventPackage } from "@/types/catalog";

interface EventModalProps {
  event: EventPackage | null;
  onClose: () => void;
}

export function EventModal({ event, onClose }: EventModalProps) {
  const [activeImage, setActiveImage] = useState(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!event) return;
      if (e.key === "ArrowRight") {
        setActiveImage((i) => (i + 1) % event.images.length);
      }
      if (e.key === "ArrowLeft") {
        setActiveImage((i) => (i - 1 + event.images.length) % event.images.length);
      }
    },
    [event]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  if (!event) return null;

  const discounted = hasDiscount(event);

  return (
    <Modal isOpen={!!event} onClose={onClose} title={event.name}>
      <div className="space-y-5" key={event.slug}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-blush/30">
          <Image
            src={event.images[activeImage]}
            alt={`${event.imageAlt} — photo ${activeImage + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 560px"
            className="object-cover"
            priority
          />
        </div>

        {event.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {event.images.map((src, index) => (
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
          {event.description}
        </p>

        {event.includedItems && event.includedItems.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-semibold text-maroon-deep">What&apos;s included</h4>
            <ul className="space-y-1 text-sm text-charcoal/75">
              {event.includedItems.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-green-natural" aria-hidden="true">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-xl bg-blush/40 p-4">
          <p className="text-sm text-charcoal/70">
            {event.pricePrefix ?? "From"}{" "}
            <span className="text-xl font-bold text-maroon">
              PKR {formatPrice(event.price)}
            </span>
            {discounted && event.originalPrice && (
              <>
                {" "}
                <span className="text-sm line-through text-charcoal/45">
                  PKR {formatPrice(event.originalPrice)}
                </span>
                {event.discountPercentage && (
                  <span className="ml-2 text-xs font-medium text-maroon">
                    {getDiscountBadge(event.discountPercentage)}
                  </span>
                )}
              </>
            )}
          </p>
          <p className="mt-2 text-xs text-charcoal/60">
            Final pricing depends on customisation, venue and date. Share your details on
            WhatsApp for a confirmed quote.
          </p>
        </div>

        <Button variant="whatsapp" size="lg" href={buildEventWhatsAppUrl(event)} external className="w-full">
          Book on WhatsApp
        </Button>
      </div>
    </Modal>
  );
}
