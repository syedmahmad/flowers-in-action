import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { images } from "@/data/images";

const HERO_IMAGE = images.hero;

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-ivory"
      aria-labelledby="hero-heading"
    >
      <div className="container-narrow section-padding !pt-8 sm:!pt-16">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="order-2 lg:order-1">
            <div
              className="mb-3 inline-flex items-center rounded-full bg-maroon px-3 py-1 text-xs font-semibold text-white sm:mb-4 sm:px-4 sm:py-1.5 sm:text-sm"
              aria-label={siteConfig.launchOfferHeadline}
            >
              {siteConfig.launchOfferBadge} · Launch Offer
            </div>
            <h1
              id="hero-heading"
              className="heading-serif mb-4 text-[1.65rem] font-bold leading-tight text-maroon-deep sm:mb-6 sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              {siteConfig.tagline}
            </h1>
            <p className="mb-6 text-base leading-relaxed text-charcoal/80 sm:mb-8 sm:text-lg">
              Fresh bouquets, birthday decoration, shadi &amp; mehndi flowers, gajra,
              garlands, floral jewellery and personalised gifts — handcrafted in Lahore
              and delivered across the city.
            </p>
            <Button href="#shop" size="lg" className="w-full sm:w-auto">
              Explore Collection
            </Button>
            <p className="mt-3 text-xs text-charcoal/60 sm:mt-6 sm:hidden">
              Tap <strong>WhatsApp</strong> in the bottom bar to order instantly.
            </p>
            <p className="mt-4 text-xs text-charcoal/60 sm:mt-6 sm:text-sm">
              Freshly arranged · Customisable · Lahore-wide delivery · 10% advance
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl shadow-sm sm:aspect-[4/3] sm:rounded-3xl lg:aspect-[5/4] lg:max-h-[28rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Ivory Affection — white rose and lily bouquet with eucalyptus, Phool Pattiyan Lahore"
                width={1536}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover object-[center_40%]"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
