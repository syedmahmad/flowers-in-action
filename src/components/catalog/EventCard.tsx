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
    <article className="group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-maroon/8 shadow-[0_4px_24px_rgba(27,67,50,0.06)] transition-[box-shadow,transform,ring-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(27,67,50,0.14)] hover:ring-gold/25 aspect-[4/5] sm:aspect-[3/4]">
      <button
        type="button"
        onClick={() => onOpen(event)}
        className="absolute inset-0 h-full w-full text-left"
        aria-label={`View ${event.name}`}
      >
        <Image
          src={event.images[0]}
          alt={event.imageAlt}
          fill
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
          className="object-cover object-[center_15%] transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
        {discounted && event.discountPercentage && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon-deep/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm sm:text-xs z-10">
            {getDiscountBadge(event.discountPercentage)}
          </span>
        )}
      </button>

      {/* Glassmorphism gradient overlay to make text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent mix-blend-multiply" />

      {/* Glass Panel Content */}
      <div className="relative mt-auto flex flex-col p-4 sm:p-5 text-white bg-gradient-to-t from-black/50 to-transparent backdrop-blur-[2px]">
        <button type="button" onClick={() => onOpen(event)} className="text-left">
          <h3 className="heading-serif mb-1 text-base font-semibold leading-snug text-white sm:text-xl">
            {event.name}
          </h3>
        </button>

        <div className="mb-3 sm:mb-4">
          <p className="text-[10px] text-white/80 sm:text-xs uppercase tracking-wide mb-1">
            {event.pricePrefix ?? "From"}
          </p>
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
            <span className="text-sm font-bold text-gold sm:text-lg">
              PKR {formatPrice(event.price)}
            </span>
            {discounted && event.originalPrice && (
              <span className="text-[10px] text-white/60 line-through sm:text-xs">
                PKR {formatPrice(event.originalPrice)}
              </span>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Button
            variant="whatsapp"
            size="sm"
            href={buildEventWhatsAppUrl(event)}
            external
            className="w-full whitespace-nowrap px-2.5 text-[11px] sm:px-4 sm:text-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
            aria-label={`Book ${event.name} on WhatsApp`}
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book on WhatsApp</span>
          </Button>
        </div>
      </div>
    </article>
  );
}
