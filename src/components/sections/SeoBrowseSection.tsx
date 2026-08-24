import Link from "next/link";
import { occasions } from "@/data/occasions";
import { flowerTypes, weddingTypes } from "@/data/flowers";

/** Compact SEO browse links — supports indexed anchors without cluttering primary nav. */
export function SeoBrowseSection() {
  return (
    <section className="border-t border-blush bg-ivory/50 py-10">
      <div className="container-narrow">
        <p className="mb-6 text-center text-sm text-charcoal/60">
          Browse by occasion, flower type or wedding service
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          <div id="occasions">
            <h2 className="heading-serif mb-3 text-lg font-semibold text-maroon-deep">
              Occasions
            </h2>
            <ul className="space-y-1.5">
              {occasions.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link href="#bouquets" className="text-sm text-charcoal/75 hover:text-maroon">
                    {item.label} bouquets
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="flowers">
            <h2 className="heading-serif mb-3 text-lg font-semibold text-maroon-deep">
              Flowers
            </h2>
            <ul className="space-y-1.5">
              {flowerTypes.map((item) => (
                <li key={item.slug}>
                  <Link href="#bouquets" className="text-sm text-charcoal/75 hover:text-maroon">
                    {item.label} bouquets Lahore
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div id="weddings">
            <h2 className="heading-serif mb-3 text-lg font-semibold text-maroon-deep">
              Wedding Flowers
            </h2>
            <ul className="space-y-1.5">
              {weddingTypes.map((item) => (
                <li key={item.slug}>
                  <Link href="#events" className="text-sm text-charcoal/75 hover:text-maroon">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
