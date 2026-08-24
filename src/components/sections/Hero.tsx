import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";

const HERO_IMAGE = images.hero;

export function Hero() {
  return (
    <section
      id="home"
      className="hero-gradient relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute -left-24 top-32 h-72 w-72 rounded-full bg-sage/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-green-natural/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-narrow relative px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-16 xl:py-20">
        <div className="flex flex-col gap-6 sm:gap-8 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10 xl:gap-14">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <p className="mb-3 inline-flex items-center gap-2 self-center rounded-full border border-maroon/10 bg-white/70 px-3.5 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-green-natural shadow-sm backdrop-blur-sm sm:mb-4 sm:px-4 sm:text-xs lg:self-start">
              <span className="h-1.5 w-1.5 rounded-full bg-green-natural" aria-hidden="true" />
              Lahore&apos;s Finest Florist
            </p>

            <h1
              id="hero-heading"
              className="heading-serif mx-auto max-w-xl text-[1.875rem] font-semibold leading-[1.12] tracking-tight text-maroon-deep sm:text-[2.375rem] sm:leading-[1.08] lg:mx-0 lg:max-w-none lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              Premium Florist &amp;{" "}
              <span className="text-green-natural">Fresh Flower Delivery</span>{" "}
              <span className="font-medium text-charcoal/75">in Lahore</span>
            </h1>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-charcoal/70 sm:mt-5 sm:text-base sm:leading-[1.75] lg:mx-0 lg:mt-6 lg:max-w-xl lg:text-lg">
              Fresh bouquets, birthday decoration, shadi &amp; mehndi flowers, gajra,
              garlands, floral jewellery and personalised gifts — handcrafted in Lahore
              and delivered across the city.
            </p>

            <div className="mt-5 flex flex-col items-stretch gap-2.5 sm:mt-7 sm:flex-row sm:items-center sm:justify-center sm:gap-3 lg:mt-8 lg:justify-start">
              <Button
                href="#bouquets"
                size="lg"
                className="w-full shadow-md shadow-maroon/15 sm:w-auto sm:min-w-[11rem]"
              >
                Explore Collection
              </Button>
              <Button
                href="#events"
                variant="outline"
                size="lg"
                className="w-full border-maroon/20 bg-white/50 backdrop-blur-sm sm:w-auto"
              >
                Explore Events
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[18rem] sm:max-w-xs md:max-w-sm lg:mx-0 lg:max-w-none lg:min-h-[24rem] xl:min-h-[28rem]">
            <div
              className="absolute -inset-1 rounded-[1.125rem] bg-gradient-to-br from-green-natural/10 via-transparent to-blush/80 blur-lg sm:rounded-[1.25rem] lg:-inset-2 lg:rounded-[1.75rem]"
              aria-hidden="true"
            />

            <div className="hero-image-glow relative aspect-[4/5] overflow-hidden rounded-[1.125rem] ring-1 ring-maroon/8 sm:rounded-[1.25rem] lg:absolute lg:inset-0 lg:aspect-auto lg:rounded-[1.75rem]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Premium white lily and rose bouquet by Phool Pattiyan Lahore"
                width={1200}
                height={1000}
                className="h-full w-full object-cover object-[center_42%]"
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
