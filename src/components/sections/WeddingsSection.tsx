import Link from "next/link";
import { weddingTypes } from "@/data/flowers";
import { buildShopUrl } from "@/lib/filters";

export function WeddingsSection() {
  return (
    <section id="weddings" className="section-padding bg-blush/40">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <h2 className="heading-serif mb-3 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Wedding Flowers &amp; Décor
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/80">
            Complete your wedding look with bridal bouquets, floral jewellery, groom garlands,
            car decoration and room décor — customised for your Lahore celebration.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {weddingTypes.map((item) => (
            <Link
              key={item.slug}
              href={buildShopUrl({ wedding: item.slug })}
              className="card-shadow-hover rounded-2xl bg-white p-6"
            >
              <h3 className="heading-serif mb-2 text-xl font-semibold text-maroon-deep">
                {item.label}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/75">{item.intro}</p>
              <span className="mt-3 inline-block text-sm font-medium text-maroon">
                Explore {item.label} →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
