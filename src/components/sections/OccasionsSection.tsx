import Link from "next/link";
import { occasions } from "@/data/occasions";
import { buildShopUrl } from "@/lib/filters";

export function OccasionsSection() {
  return (
    <section id="occasions" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <h2 className="heading-serif mb-3 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Flowers for Every Occasion
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/80">
            From birthdays and anniversaries to Eid and wedding celebrations — find
            thoughtfully arranged flowers for the moments that matter in Lahore.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              href={buildShopUrl({ occasion: occ.slug })}
              className="card-shadow-hover rounded-2xl bg-ivory p-6 transition-colors hover:bg-blush/50"
            >
              <h3 className="heading-serif mb-2 text-xl font-semibold text-maroon-deep">
                {occ.label}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/75">{occ.intro}</p>
              <span className="mt-3 inline-block text-sm font-medium text-maroon">
                Browse {occ.label} flowers →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
