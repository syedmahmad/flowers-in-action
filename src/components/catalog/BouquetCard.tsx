import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { bouquetHasGallery } from "@/lib/bouquet-images";
import {
  formatPrice,
  getSellingPrice,
  hasDiscount,
  getDiscountBadge,
} from "@/lib/pricing";
import { buildBouquetWhatsAppUrl } from "@/lib/whatsapp";
import type { Bouquet } from "@/types/catalog";

interface BouquetCardProps {
  bouquet: Bouquet;
  onOpen?: (bouquet: Bouquet) => void;
}

export function BouquetCard({ bouquet, onOpen }: BouquetCardProps) {
  const price = getSellingPrice(bouquet);
  const discounted = hasDiscount(bouquet);
  const hasGallery = bouquetHasGallery(bouquet);

  const imageBlock = (
    <>
      <Image
        src={bouquet.image}
        alt={bouquet.imageAlt}
        fill
        sizes="(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        loading="lazy"
      />
      {discounted && bouquet.discountPercentage && (
        <span className="absolute left-3 top-3 rounded-full bg-maroon-deep/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm sm:text-xs">
          {getDiscountBadge(bouquet.discountPercentage)}
        </span>
      )}
    </>
  );

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-maroon/8 shadow-[0_4px_24px_rgba(27,67,50,0.06)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(27,67,50,0.12)]">
      <div className="relative aspect-[4/5] overflow-hidden sm:aspect-[3/4]">
        {hasGallery && onOpen ? (
          <button
            type="button"
            onClick={() => onOpen(bouquet)}
            className="relative block h-full w-full text-left"
            aria-label={`View photos of ${bouquet.name}`}
          >
            {imageBlock}
          </button>
        ) : (
          imageBlock
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {hasGallery && onOpen ? (
          <button type="button" onClick={() => onOpen(bouquet)} className="text-left">
            <h3 className="heading-serif mb-1 text-sm font-semibold leading-snug text-maroon-deep sm:text-lg">
              {bouquet.name}
            </h3>
          </button>
        ) : (
          <h3 className="heading-serif mb-1 text-sm font-semibold leading-snug text-maroon-deep sm:text-lg">
            {bouquet.name}
          </h3>
        )}
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-charcoal/70 sm:text-sm">
          {bouquet.description}
        </p>

        <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:mb-4">
          <span className="text-base font-bold text-maroon sm:text-xl">
            PKR {formatPrice(price)}
          </span>
          {discounted && bouquet.originalPrice && (
            <span className="text-xs text-charcoal/45 line-through sm:text-sm">
              PKR {formatPrice(bouquet.originalPrice)}
            </span>
          )}
        </div>

        {hasGallery && onOpen && (
          <button
            type="button"
            onClick={() => onOpen(bouquet)}
            className="mb-2 py-1 text-center text-xs font-medium text-maroon hover:underline sm:text-sm"
          >
            View photos
          </button>
        )}

        <Button
          variant="whatsapp"
          size="sm"
          href={buildBouquetWhatsAppUrl(bouquet)}
          external
          className="mt-auto w-full whitespace-nowrap px-2.5 text-[11px] sm:px-4 sm:text-sm"
          aria-label={`Order ${bouquet.name} on WhatsApp`}
        >
          <span className="sm:hidden">Order</span>
          <span className="hidden sm:inline">Order on WhatsApp</span>
        </Button>
      </div>
    </article>
  );
}
