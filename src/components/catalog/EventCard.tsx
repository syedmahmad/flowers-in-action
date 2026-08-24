"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import {
  formatPrice,
  hasDiscount,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildEventWhatsAppUrl } from "@/lib/whatsapp";
import type { EventPackage } from "@/types/catalog";

interface EventCardProps {
  event: EventPackage;
  onOpen: (event: EventPackage) => void;
}

export function EventCard({ event, onOpen }: EventCardProps) {
  const discounted = hasDiscount(event);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(27,67,50,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(27,67,50,0.1)]">
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="relative aspect-[4/3] overflow-hidden text-left"
        aria-label={`View ${event.name}`}
      >
        <Image
          src={event.images[0]}
          alt={event.imageAlt}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {discounted && event.discountPercentage && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon/90 px-2.5 py-1 text-[10px] font-medium text-white sm:text-xs">
            {getDiscountBadge(event.discountPercentage)}
          </span>
        )}
      </button>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <button type="button" onClick={() => onOpen(event)} className="text-left">
          <h3 className="heading-serif mb-1 text-sm font-semibold leading-snug text-maroon-deep sm:text-lg">
            {event.name}
          </h3>
        </button>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-charcoal/70 sm:text-sm">
          {event.description}
        </p>

        <div className="mb-3 sm:mb-4">
          <p className="text-xs text-charcoal/60 sm:text-sm">
            {event.pricePrefix ?? "From"}{" "}
            <span className="text-base font-bold text-maroon sm:text-xl">
              PKR {formatPrice(event.price)}
            </span>
          </p>
          {discounted && event.originalPrice && (
            <p className="text-xs text-charcoal/45 line-through sm:text-sm">
              PKR {formatPrice(event.originalPrice)}
            </p>
          )}
        </div>

        <div className="mt-auto grid gap-2">
          <Button
            variant="whatsapp"
            size="sm"
            href={buildEventWhatsAppUrl(event)}
            external
            className="w-full whitespace-nowrap px-2.5 text-[11px] sm:px-4 sm:text-sm"
            aria-label={`Book ${event.name} on WhatsApp`}
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book on WhatsApp</span>
          </Button>
          {event.images.length > 1 && (
            <button
              type="button"
              onClick={() => onOpen(event)}
              className="py-1 text-center text-sm font-medium text-maroon hover:underline"
            >
              View photos
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
