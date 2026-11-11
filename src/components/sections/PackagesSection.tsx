"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { EventCard } from "@/components/catalog/EventCard";
import { EventModal } from "@/components/catalog/EventModal";
import { events, findEventBySlug } from "@/data/events";
import type { EventPackage } from "@/types/catalog";

export function PackagesSection() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [manualSelected, setManualSelected] = useState<EventPackage | null>(null);

  const urlEvent = useMemo(() => {
    const slug = searchParams.get("event");
    return slug ? findEventBySlug(slug) ?? null : null;
  }, [searchParams]);

  const selected = manualSelected ?? urlEvent;

  // Filter for car and room decor packages
  const displayPackages = events.filter((e) => e.slug.includes("package") && (e.slug.includes("room-decor") || e.slug.includes("car-decor")));

  const openEvent = useCallback(
    (event: EventPackage) => {
      setManualSelected(event);
      const params = new URLSearchParams(window.location.search);
      params.set("event", event.slug);
      router.replace(`/?${params.toString()}#packages`, { scroll: false });
    },
    [router]
  );

  const closeEvent = useCallback(() => {
    setManualSelected(null);
    const params = new URLSearchParams(window.location.search);
    params.delete("event");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}#packages` : "/#packages", { scroll: false });
  }, [router]);

  if (displayPackages.length === 0) return null;

  return (
    <>
      <section id="packages" className="section-padding scroll-mt-20 relative overflow-hidden bg-white">
        <div className="container-narrow relative z-10">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12 lg:mb-16">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/10 bg-ivory px-4 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-maroon shadow-sm backdrop-blur-md">
              Special Deals
            </p>
            <h2 className="heading-serif mb-4 text-3xl font-semibold text-maroon-deep sm:text-4xl lg:text-[2.75rem]">
              Car & Room Decor Packages
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
              Carefully curated tiers for your special day. From subtle silver elegance to our grand platinum setups.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {displayPackages.map((event) => (
              <EventCard key={event.slug} event={event} onOpen={openEvent} />
            ))}
          </div>
        </div>
      </section>

      <EventModal event={selected} onClose={closeEvent} />
    </>
  );
}
