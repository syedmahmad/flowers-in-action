import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { images } from "@/data/images";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-ivory"
      aria-labelledby="hero-heading"
    >
      <div className="container-narrow section-padding !pt-8 sm:!pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <div
              className="mb-3 inline-flex items-center rounded-full bg-maroon px-3 py-1 text-xs font-semibold text-white sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm"
              aria-label={siteConfig.launchOfferHeadline}
            >
              {siteConfig.launchOfferBadge} · Launch Offer
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-muted sm:mb-3 sm:text-sm">
              {siteConfig.name}
            </p>
            <h1
              id="hero-heading"
              className="heading-serif mb-4 text-[1.65rem] font-bold leading-tight text-maroon-deep sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {siteConfig.tagline}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-charcoal/80 sm:mb-8 sm:text-lg">
              Fresh bouquets, floral boxes, bridal flowers, groom garlands and personalised
              gifts — handcrafted in Lahore and delivered across the city.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button href="#shop" size="lg" className="w-full sm:w-auto">
                Explore Collection
              </Button>
              <Button
                variant="whatsapp"
                size="lg"
                href={buildGeneralWhatsAppUrl()}
                external
                className="hidden w-full sm:inline-flex sm:w-auto"
              >
                Order on WhatsApp
              </Button>
            </div>
            <p className="mt-3 text-xs text-charcoal/60 sm:mt-6 sm:hidden">
              Tap <strong>WhatsApp</strong> in the bottom bar to order instantly.
            </p>
            <p className="mt-4 text-xs text-charcoal/60 sm:mt-6 sm:text-sm">
              Freshly arranged · Customisable · Lahore-wide delivery · 10% advance
            </p>
          </div>

          <div className="relative order-1 aspect-[5/4] overflow-hidden rounded-2xl sm:aspect-[4/5] sm:rounded-3xl lg:order-2 lg:aspect-square">
            <Image
              src={images.hero}
              alt="Premium maroon and cream floral bouquet arrangement by Flowers In Action Lahore"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
