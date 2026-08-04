import Link from "next/link";
import { deliveryAreas, lahoreSeoIntro } from "@/data/delivery-areas";

export function ServiceAreasSection() {
  return (
    <section id="areas" className="section-padding bg-blush/30" aria-labelledby="areas-heading">
      <div className="container-narrow">
        <header className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-rose-muted sm:text-sm">
            Lahore Flower Delivery
          </p>
          <h2
            id="areas-heading"
            className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl"
          >
            {lahoreSeoIntro.title}
          </h2>
          {lahoreSeoIntro.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="mt-3 text-charcoal/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {deliveryAreas.map((area) => (
            <article
              key={area.slug}
              id={area.slug}
              className="rounded-2xl bg-white p-6 card-shadow"
            >
              <h3 className="heading-serif mb-3 text-xl font-semibold text-maroon-deep">
                {area.headline}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-charcoal/80">{area.description}</p>
              <ul className="mb-4 flex flex-wrap gap-2" aria-label={`${area.name} highlights`}>
                {area.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full bg-blush px-3 py-1 text-xs font-medium text-maroon-deep"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
              <Link
                href={area.shopLink}
                className="text-sm font-medium text-maroon hover:text-maroon-deep"
              >
                Order flowers for {area.name} →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
