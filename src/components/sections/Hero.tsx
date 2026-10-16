import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";

export function Hero() {
  return (
    <section
      id="home"
      className="hero-premium relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="premium-noise pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 top-10 h-96 w-96 rounded-full bg-sage/12 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,64rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        aria-hidden="true"
      />

      <div className="container-narrow relative px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20 xl:py-24">
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center text-center lg:text-left">
            <p className="mb-4 inline-flex items-center gap-2.5 self-center rounded-full border border-gold/25 bg-white/75 px-4 py-2 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-maroon-deep shadow-[0_8px_30px_rgba(27,67,50,0.06)] backdrop-blur-sm sm:text-xs lg:self-start">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-natural/40" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-natural" />
              </span>
              Lahore&apos;s Finest Florist
            </p>

            <h1
              id="hero-heading"
              className="heading-serif mx-auto max-w-xl text-[2rem] font-semibold leading-[1.08] tracking-tight text-maroon-deep sm:text-[2.625rem] lg:mx-0 lg:max-w-none lg:text-[3.5rem] xl:text-[4rem]"
            >
              Where Every Bloom{" "}
              <span className="relative inline-block text-green-natural">
                Tells a Story
                <span
                  className="absolute -bottom-1 left-0 h-[0.18em] w-full rounded-full bg-gold/45"
                  aria-hidden="true"
                />
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-charcoal/72 sm:text-base sm:leading-[1.8] lg:mx-0 lg:mt-6 lg:max-w-xl lg:text-lg">
              Fresh bouquets, birthday decoration, shadi &amp; mehndi flowers, gajra,
              garlands, floral jewellery and personalised gifts — handcrafted in Lahore
              and delivered across the city.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {["Fresh Bouquets", "Event Décor", "Same-day Lahore"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-maroon/10 bg-white/70 px-3 py-1.5 text-[0.6875rem] font-medium tracking-wide text-charcoal/75 backdrop-blur-sm sm:text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
              <Button
                href="#bouquets"
                size="lg"
                className="w-full bg-gradient-to-r from-maroon to-maroon-deep shadow-[0_14px_40px_-12px_rgba(27,67,50,0.45)] sm:w-auto sm:min-w-[12rem]"
              >
                Explore Bouquets
              </Button>
              <Button
                href="#events"
                variant="outline"
                size="lg"
                className="w-full border-maroon/20 bg-white/50 backdrop-blur-sm sm:w-auto sm:min-w-[12rem]"
              >
                Explore Events
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:mx-0 lg:max-w-none">
            <div
              className="absolute -inset-3 rounded-[1.5rem] bg-gradient-to-br from-gold/20 via-transparent to-green-natural/15 blur-xl sm:-inset-4 sm:rounded-[1.75rem]"
              aria-hidden="true"
            />

            <div className="hero-image-glow photo-vignette relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-[#f7f3ed] ring-1 ring-gold/25 sm:rounded-[1.75rem] lg:rounded-[2rem]">
              <Image
                src={images.marketing.heroBouquet}
                alt="Sunflower and mixed bloom bouquet by Phool Pattiyan Lahore"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 42vw"
                className="photo-editorial object-cover object-[center_55%]"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-maroon-deep/45 via-maroon-deep/5 to-[#fffef9]/20"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(201,169,98,0.18),transparent_42%)]"
                aria-hidden="true"
              />
            </div>

            <div className="absolute -left-2 top-8 rounded-2xl border border-white/60 bg-white/90 px-4 py-3 shadow-[0_16px_40px_rgba(15,41,34,0.12)] backdrop-blur-md sm:-left-5 sm:top-10">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-green-natural">
                Handcrafted
              </p>
              <p className="heading-serif mt-1 text-lg font-semibold text-maroon-deep">Fresh Daily</p>
            </div>

            <div className="absolute -bottom-3 -right-1 rounded-2xl border border-gold/25 bg-maroon-deep px-4 py-3 text-white shadow-[0_16px_40px_rgba(15,41,34,0.2)] sm:-right-4">
              <p className="text-[0.625rem] font-semibold uppercase tracking-[0.22em] text-gold">
                Lahore Delivery
              </p>
              <p className="heading-serif mt-1 text-lg font-semibold">DHA &amp; Beyond</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
