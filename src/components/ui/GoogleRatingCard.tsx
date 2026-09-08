import Link from "next/link";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-5 w-5 fill-gold sm:h-6 sm:w-6">
          <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.77l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

const reviewHighlights = [
  "Fresh, beautiful bouquets",
  "Friendly WhatsApp service",
  "On-time Lahore delivery",
  "Perfect for birthdays & weddings",
];

export function GoogleRatingCard({ className = "" }: { className?: string }) {
  const { rating, reviewCount } = siteConfig.google;

  return (
    <div
      id="reviews"
      className={cn(
        "mt-8 rounded-[1.75rem] border border-gold/20 bg-[linear-gradient(180deg,#fffdf8_0%,#ffffff_100%)] p-6 shadow-[0_8px_40px_rgba(15,41,34,0.08)] sm:p-8",
        className
      )}
    >
      <p className="section-eyebrow mb-2">Trusted by Lahore</p>
      <h3 className="heading-serif mb-4 text-2xl font-bold text-maroon-deep sm:text-3xl">
        Loved by Our Customers
      </h3>

      <div className="mb-4 flex flex-wrap items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-md ring-1 ring-maroon/8">
          <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-charcoal/55">
            Google Rating
          </p>
          <p className="heading-serif text-3xl font-bold text-maroon-deep sm:text-4xl">
            {rating.toFixed(1)}
            <span className="text-lg font-medium text-charcoal/45 sm:text-xl"> / 5</span>
          </p>
        </div>
      </div>

      <StarRow />
      <p className="mt-2 text-sm font-medium text-charcoal/75">
        Based on <strong>{reviewCount} verified Google reviews</strong>
      </p>

      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {reviewHighlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-xl bg-ivory px-3 py-2.5 text-sm text-charcoal/80 ring-1 ring-maroon/6"
          >
            <span className="text-gold" aria-hidden="true">
              ✓
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          href={siteConfig.google.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-maroon px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-deep"
        >
          Read All {reviewCount} Google Reviews
        </Link>
        <Link
          href={siteConfig.mapDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border-2 border-maroon px-5 py-2.5 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
        >
          View on Google Maps
        </Link>
      </div>
    </div>
  );
}
