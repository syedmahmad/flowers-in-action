import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Fresh Flower Bouquets",
    description: "Handcrafted arrangements with roses, chrysanthemums, sunflowers and seasonal blooms.",
    href: "#bouquets",
    cta: "Explore Bouquets",
    image: "/images/bouquets/web/ruby-radiance-artificial-bouquet.jpg",
    imageAlt: "Ruby Radiance Artificial Bouquet by Phool Pattiyan Lahore",
    objectPosition: "center 45%",
    label: "Bouquets",
  },
  {
    title: "Events & Decorations",
    description: "Mehndi, birthdays, aqiqah, openings and bespoke celebration styling across Lahore.",
    href: "#events",
    cta: "Explore Events",
    image: "/images/events/web/safari-kids-birthday.jpg",
    imageAlt: "Safari kids birthday decoration by Phool Pattiyan Lahore",
    objectPosition: "center 42%",
    label: "Events",
  },
] as const;

export function CollectionCards() {
  return (
    <section className="section-padding bg-ivory" aria-label="Our collections">
      <div className="container-narrow">
        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
          {collections.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_8px_40px_-12px_rgba(15,41,34,0.22)] ring-1 ring-maroon/10 transition-[box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_-16px_rgba(15,41,34,0.35)] sm:aspect-[5/6] lg:rounded-[2rem]"
            >
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover transition-transform duration-[850ms] ease-out group-hover:scale-[1.06]"
                style={{ objectPosition: item.objectPosition }}
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-maroon-deep/92 via-maroon-deep/35 to-maroon-deep/5"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 opacity-80"
                aria-hidden="true"
              />

              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent opacity-60" aria-hidden="true" />

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8 lg:p-9">
                <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-white/70">
                  {item.label}
                </p>
                <h2 className="heading-serif mb-3 text-[1.75rem] font-semibold leading-tight tracking-tight sm:text-3xl lg:text-[2rem]">
                  {item.title}
                </h2>
                <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/82 sm:text-[0.9375rem] lg:max-w-md">
                  {item.description}
                </p>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold tracking-wide backdrop-blur-sm transition-colors duration-300 group-hover:border-white/40 group-hover:bg-white/15">
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
