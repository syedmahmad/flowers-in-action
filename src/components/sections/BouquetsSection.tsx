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
      <section id="bouquets" className="section-padding scroll-mt-20 relative overflow-hidden bg-maroon-deep">
        {/* Background aesthetic touches for premium feel */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,169,98,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(64,145,108,0.1),transparent_50%)]" />
        <div className="premium-noise pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        
        <span id="shop" className="sr-only" aria-hidden="true" />
        <div className="container-narrow relative z-10">
          <div className="mb-10 sm:mb-12 lg:mb-16 flex flex-col items-center text-center">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-white/5 px-4 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-gold backdrop-blur-md">
              Our Collection
            </p>
            <h2 className="heading-serif mb-4 text-3xl font-semibold text-white sm:text-4xl lg:text-[2.75rem]">
              Fresh Flower Bouquets
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
              Handcrafted bouquets for birthdays, anniversaries, weddings and everyday
              moments — each arrangement prepared fresh and delivered across Lahore.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
            {displayBouquets.map((bouquet, index) => (
              <div 
                key={bouquet.slug} 
                className={index === 0 ? "col-span-2 row-span-2 md:col-span-2 lg:col-span-2" : ""}
              >
                <BouquetCard bouquet={bouquet} onOpen={setSelected} isLarge={index === 0} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <BouquetModal bouquet={selected} onClose={() => setSelected(null)} />
    </>
  );
}
