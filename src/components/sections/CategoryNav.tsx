"use client";

import Image from "next/image";
import { quickCategories } from "@/data/categories";
import { buildShopUrl } from "@/lib/filters";

export function CategoryNav() {
  return (
    <section className="bg-white py-8 sm:py-14" aria-labelledby="categories-heading">
      <div className="container-narrow container-padding">
        <h2 id="categories-heading" className="sr-only">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4 lg:gap-5">
          {quickCategories.map((cat) => {
            const href =
              "isWedding" in cat && cat.isWedding
                ? buildShopUrl({ wedding: "bridal-bouquets" })
                : buildShopUrl({ category: cat.slug as Parameters<typeof buildShopUrl>[0]["category"] });

            return (
              <a
                key={cat.slug}
                href={href}
                className="group card-shadow-hover overflow-hidden rounded-2xl bg-ivory"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={`${cat.label} category`}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/70 to-transparent" />
                  <span className="absolute bottom-2 left-2 right-2 text-xs font-semibold leading-tight text-white sm:bottom-3 sm:left-3 sm:right-3 sm:text-sm lg:text-base">
                    {cat.label}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
