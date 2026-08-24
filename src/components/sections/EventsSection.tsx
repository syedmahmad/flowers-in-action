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

  const displayEvents = mode === "homepage" ? featuredEvents : events;

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
      <section id="events" className="section-padding scroll-mt-20 bg-blush/25">
        <div className="container-narrow">
          <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="heading-serif mb-2 text-3xl font-bold text-maroon-deep sm:text-4xl">
                Events &amp; Decorations
              </h2>
              <p className="max-w-2xl text-charcoal/75">
                Birthday decoration, wedding flowers, room setups and celebration décor —
                crafted in Lahore with customisation on WhatsApp.
              </p>
            </div>
            {mode === "homepage" && events.length > featuredEvents.length && (
              <Link
                href="#events-all"
                className="text-sm font-semibold text-maroon hover:underline"
              >
                View all events →
              </Link>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {displayEvents.map((event) => (
              <EventCard key={event.slug} event={event} onOpen={openEvent} />
            ))}
          </div>

          {mode === "homepage" && events.length > featuredEvents.length && (
            <div id="events-all" className="scroll-mt-20 mt-10 border-t border-blush/80 pt-10">
              <h3 className="heading-serif mb-4 text-xl font-semibold text-maroon-deep sm:text-2xl">
                All Event Packages
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {events.map((event) => (
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
