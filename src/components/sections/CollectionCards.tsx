import Image from "next/image";
import Link from "next/link";
import { images } from "@/data/images";

const collections = [
  {
    title: "Fresh Flower Bouquets",
    description: "Handcrafted arrangements with roses, chrysanthemums, sunflowers and seasonal blooms.",
    href: "#bouquets",
    cta: "Explore Bouquets",
    image: images.marketing.collectionBouquets,
    imageAlt: "Burgundy tulle rose bouquet by Phool Pattiyan Lahore",
    objectPosition: "center 28%",
    label: "Bouquets",
    count: "53+ designs",
  },
  {
    title: "Events & Decorations",
    description: "Mehndi, birthdays, aqiqah, openings and bespoke celebration styling across Lahore.",
    href: "#events",
    cta: "Explore Events",
    image: images.marketing.collectionEvents,
    imageAlt: "Luxury gold and rose birthday decoration by Phool Pattiyan Lahore",
    objectPosition: "center 45%",
    label: "Events",
    count: "33+ setups",
  },
] as const;

export function CollectionCards() {
  return (
    <section className="section-padding bg-ivory" aria-label="Our collections">
      <div className="container-narrow">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="section-eyebrow">Shop by Category</p>
          <h2 className="section-title mb-3">Two Worlds of Beauty</h2>
          <p className="section-lead">
            From intimate bouquets to full celebration styling — every piece is crafted in Lahore
            with real flowers and premium finishing.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {collections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-maroon-deep/5 shadow-[0_8px_40px_-12px_rgba(15,41,34,0.22)] ring-1 ring-maroon/10 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_60px_-18px_rgba(15,41,34,0.38)] sm:aspect-[5/6] lg:rounded-[2rem]"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="collection-photo object-cover"
                style={{ objectPosition: item.objectPosition }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-maroon-deep/96 via-maroon-deep/52 to-maroon-deep/12"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-black/30 opacity-95 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.14),transparent_38%)]"
                aria-hidden="true"
              />

              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/14 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md sm:left-6 sm:top-6">
                {item.count}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
                <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-gold-light">
                  {item.label}
                </p>
                <h3 className="heading-serif mb-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2rem]">
                  {item.title}
                </h3>
                <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/85 sm:text-[0.9375rem] lg:max-w-md">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/12 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-sm transition-all duration-300 group-hover:border-gold/45 group-hover:bg-white/18">
                  {item.cta}
                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
