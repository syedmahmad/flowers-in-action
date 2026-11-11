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
  isLarge?: boolean;
}

export function BouquetCard({ bouquet, onOpen, isLarge = false }: BouquetCardProps) {
  const price = getSellingPrice(bouquet);
  const discounted = hasDiscount(bouquet);
  const hasGallery = bouquetHasGallery(bouquet);

  const imageBlock = (
    <>
      <Image
        src={bouquet.image}
        alt={bouquet.imageAlt}
        fill
        sizes={isLarge ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 480px) 50vw, (max-width: 768px) 33vw, 25vw"}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        loading={isLarge ? "eager" : "lazy"}
        priority={isLarge}
      />
      {discounted && bouquet.discountPercentage && (
        <span className="absolute left-3 top-3 rounded-full bg-maroon-deep/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm sm:text-xs">
          {getDiscountBadge(bouquet.discountPercentage)}
        </span>
      )}
    </>
  );

  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-maroon/8 shadow-[0_4px_24px_rgba(27,67,50,0.06)] transition-[box-shadow,transform,ring-color] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(27,67,50,0.14)] hover:ring-gold/25 h-full w-full ${isLarge ? "aspect-square md:aspect-[4/3]" : "aspect-[4/5] sm:aspect-[3/4]"}`}>
      {onOpen ? (
        <button
          type="button"
          onClick={() => onOpen(bouquet)}
          className="absolute inset-0 h-full w-full text-left"
          aria-label={`View full photo of ${bouquet.name}`}
        >
          {imageBlock}
        </button>
      ) : (
        <div className="absolute inset-0 h-full w-full">
          {imageBlock}
        </div>
      )}

      {/* Glassmorphism gradient overlay to make text readable */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/30 to-transparent mix-blend-multiply" />

      {/* Glass Panel Content */}
      <div className="relative mt-auto flex flex-col p-4 sm:p-5 text-white bg-gradient-to-t from-black/50 to-transparent backdrop-blur-[2px]">
        {onOpen ? (
          <button type="button" onClick={() => onOpen(bouquet)} className="text-left">
            <h3 className="heading-serif mb-1 text-base font-semibold leading-snug text-white sm:text-xl hover:text-gold transition-colors">
              {bouquet.name}
            </h3>
          </button>
        ) : (
          <h3 className="heading-serif mb-1 text-base font-semibold leading-snug text-white sm:text-xl">
            {bouquet.name}
          </h3>
        )}

        <div className="mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 sm:mb-4">
          <span className="text-sm font-bold text-gold sm:text-lg">
            PKR {formatPrice(price)}
          </span>
          {discounted && bouquet.originalPrice && (
            <span className="text-[10px] text-white/60 line-through sm:text-xs">
              PKR {formatPrice(bouquet.originalPrice)}
            </span>
          )}
        </div>

        <Button
          variant="whatsapp"
          size="sm"
          href={buildBouquetWhatsAppUrl(bouquet)}
          external
          className="w-full whitespace-nowrap px-2.5 text-[11px] sm:px-4 sm:text-sm bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30"
          aria-label={`Order ${bouquet.name} on WhatsApp`}
        >
          <span className="sm:hidden">Order</span>
          <span className="hidden sm:inline">Order on WhatsApp</span>
        </Button>
      </div>
    </article>
  );
}
