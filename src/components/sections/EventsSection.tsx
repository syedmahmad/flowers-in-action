"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { EventCard } from "@/components/catalog/EventCard";
import { EventModal } from "@/components/catalog/EventModal";
import { events, featuredEvents, findEventBySlug } from "@/data/events";
import type { EventPackage } from "@/types/catalog";

interface EventsSectionProps {
  mode?: "homepage" | "full";
}

export function EventsSection({ mode = "full" }: EventsSectionProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [manualSelected, setManualSelected] = useState<EventPackage | null>(null);

  const urlEvent = useMemo(() => {
    const slug = searchParams.get("event");
    return slug ? findEventBySlug(slug) ?? null : null;
  }, [searchParams]);

  const selected = manualSelected ?? urlEvent;

  const displayEvents = (mode === "homepage" ? featuredEvents : events).filter(
    (e) => !(e.slug.includes("package") && (e.slug.includes("room-decor") || e.slug.includes("car-decor")))
  );
  
  const allNonPackageEvents = events.filter(
    (e) => !(e.slug.includes("package") && (e.slug.includes("room-decor") || e.slug.includes("car-decor")))
  );

  const openEvent = useCallback(
    (event: EventPackage) => {
      setManualSelected(event);
      const params = new URLSearchParams(window.location.search);
      params.set("event", event.slug);
      router.replace(`/?${params.toString()}#events`, { scroll: false });
    },
    [router]
  );

  const closeEvent = useCallback(() => {
    setManualSelected(null);
    const params = new URLSearchParams(window.location.search);
    params.delete("event");
    const qs = params.toString();
    router.replace(qs ? `/?${qs}#events` : "/#events", { scroll: false });
  }, [router]);

  return (
    <>
      <section id="events" className="section-padding scroll-mt-20 relative overflow-hidden bg-ivory">
        {/* Subtle premium background textures */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(64,145,108,0.05),transparent_50%)]" />
        <div className="premium-noise pointer-events-none absolute inset-0 opacity-10" aria-hidden="true" />

        <div className="container-narrow relative z-10">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-12 lg:mb-16">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-maroon/10 bg-white px-4 py-1.5 text-[0.625rem] font-semibold uppercase tracking-[0.24em] text-maroon shadow-sm backdrop-blur-md">
              Celebrations
            </p>
            <h2 className="heading-serif mb-4 text-3xl font-semibold text-maroon-deep sm:text-4xl lg:text-[2.75rem]">
              Events &amp; Decorations
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-charcoal/70 sm:text-base">
              Birthday decoration, wedding flowers, room setups and celebration décor —
              crafted in Lahore with customisation on WhatsApp.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {displayEvents.map((event) => (
              <EventCard key={event.slug} event={event} onOpen={openEvent} />
            ))}
          </div>

          {mode === "homepage" && allNonPackageEvents.length > displayEvents.length && (
            <div className="mt-12 text-center">
              <Link
                href="#events-all"
                className="inline-flex items-center gap-2 rounded-full border border-maroon/20 bg-white/50 px-6 py-2.5 text-sm font-medium text-maroon shadow-sm backdrop-blur-md transition-colors hover:bg-white"
              >
                View all events →
              </Link>
            </div>
          )}

          {mode === "homepage" && allNonPackageEvents.length > displayEvents.length && (
            <div id="events-all" className="scroll-mt-20 mt-16 border-t border-maroon/10 pt-16">
              <div className="mb-10 text-center">
                <h3 className="heading-serif text-2xl font-semibold text-maroon-deep sm:text-3xl">
                  All Event Packages
                </h3>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                {allNonPackageEvents.map((event) => (
                  <EventCard key={event.slug} event={event} onOpen={openEvent} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <EventModal event={selected} onClose={closeEvent} />
    </>
  );
}
