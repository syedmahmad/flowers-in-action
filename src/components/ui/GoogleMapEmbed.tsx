import Link from "next/link";
import { siteConfig } from "@/data/config";
import { getMapEmbedUrl, getMapOpenUrl } from "@/lib/maps";

interface GoogleMapEmbedProps {
  height?: number;
  className?: string;
  showBadge?: boolean;
  /** Stretch map to fill the parent height (for aligned layouts). */
  fillHeight?: boolean;
}

export function GoogleMapEmbed({
  height = 280,
  className = "",
  showBadge = true,
  fillHeight = false,
}: GoogleMapEmbedProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${fillHeight ? "h-full min-h-[280px]" : ""} ${className}`}
    >
      {showBadge && (
        <div className="absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-maroon-deep/90 px-3 py-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-white shadow-lg backdrop-blur-sm">
          Our Location
        </div>
      )}
      <div
        className={`rounded-2xl ring-2 ring-gold/35 ring-offset-2 ring-offset-white shadow-[0_12px_40px_rgba(15,41,34,0.14)] ${fillHeight ? "relative h-full min-h-[280px]" : ""}`}
      >
        <iframe
          title="Phool Pattiyan on Google Maps"
          src={getMapEmbedUrl()}
          width="100%"
          height={fillHeight ? undefined : height}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={fillHeight ? "absolute inset-0 h-full w-full" : "w-full"}
        />
      </div>
      <Link
        href={getMapOpenUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 z-10 rounded-full border border-white/30 bg-white/95 px-4 py-2 text-xs font-semibold text-maroon-deep shadow-md backdrop-blur-sm transition-colors hover:bg-white"
      >
        Open in Google Maps →
      </Link>
      <p className="sr-only">{siteConfig.address.full}</p>
    </div>
  );
}
