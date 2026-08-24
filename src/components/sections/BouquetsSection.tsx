import { BouquetCard } from "@/components/catalog/BouquetCard";
import { bouquets } from "@/data/bouquets";

export function BouquetsSection() {
  return (
    <section id="bouquets" className="section-padding scroll-mt-20 bg-white">
      <span id="shop" className="sr-only" aria-hidden="true" />
      <div className="container-narrow">
        <div className="mb-8 text-center sm:mb-10 lg:mb-12">
          <p className="mb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-green-natural">
            Our Collection
          </p>
          <h2 className="heading-serif mb-3 text-3xl font-semibold text-maroon-deep sm:text-4xl lg:text-[2.75rem]">
            Fresh Flower Bouquets
          </h2>
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-charcoal/70 sm:text-lg">
            Handcrafted bouquets for birthdays, anniversaries, weddings and everyday
            moments — each arrangement prepared fresh and delivered across Lahore.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          {bouquets.map((bouquet) => (
            <BouquetCard key={bouquet.slug} bouquet={bouquet} />
          ))}
        </div>
      </div>
    </section>
  );
}
