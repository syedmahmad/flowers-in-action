import Link from "next/link";
import { flowerTypes } from "@/data/flowers";
import { buildShopUrl } from "@/lib/filters";

export function FlowersSection() {
  return (
    <section id="flowers" className="section-padding bg-ivory">
      <div className="container-narrow">
        <div className="mb-10 text-center">
          <h2 className="heading-serif mb-3 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Shop by Flower Type
          </h2>
          <p className="mx-auto max-w-2xl text-charcoal/80">
            Choose your favourite blooms — from classic roses to cheerful sunflowers and
            delicate baby&apos;s breath.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {flowerTypes.map((flower) => (
            <Link
              key={flower.slug}
              href={buildShopUrl({ flower: flower.slug })}
              className="card-shadow-hover rounded-2xl border border-blush bg-white p-6"
            >
              <h3 className="heading-serif mb-2 text-xl font-semibold text-maroon-deep">
                {flower.label}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/75">{flower.intro}</p>
              <span className="mt-3 inline-block text-sm font-medium text-maroon">
                View {flower.label} arrangements →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
