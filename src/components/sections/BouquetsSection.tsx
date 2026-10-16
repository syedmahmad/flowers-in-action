"use client";

import { useState } from "react";
import { BouquetCard } from "@/components/catalog/BouquetCard";
import { BouquetModal } from "@/components/catalog/BouquetModal";
import { bouquets } from "@/data/bouquets";
import { sortBouquetsForDisplay } from "@/lib/bouquet-display-order";
import type { Bouquet } from "@/types/catalog";

const displayBouquets = sortBouquetsForDisplay(bouquets);

export function BouquetsSection() {
  const [selected, setSelected] = useState<Bouquet | null>(null);

  return (
    <>
      <section id="bouquets" className="section-padding scroll-mt-20 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbf9_100%)]">
        <span id="shop" className="sr-only" aria-hidden="true" />
        <div className="container-narrow">
          <div className="mb-8 text-center sm:mb-10 lg:mb-12">
            <p className="section-eyebrow">Our Collection</p>
            <h2 className="section-title mb-3">Fresh Flower Bouquets</h2>
            <p className="section-lead">
              Handcrafted bouquets for birthdays, anniversaries, weddings and everyday
              moments — each arrangement prepared fresh and delivered across Lahore.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {displayBouquets.map((bouquet) => (
              <BouquetCard key={bouquet.slug} bouquet={bouquet} onOpen={setSelected} />
            ))}
          </div>
        </div>
      </section>

      <BouquetModal bouquet={selected} onClose={() => setSelected(null)} />
    </>
  );
}
