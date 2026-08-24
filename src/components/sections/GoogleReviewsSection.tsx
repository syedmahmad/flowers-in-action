import Link from "next/link";
import { siteConfig } from "@/data/config";

export function GoogleReviewsSection() {
  return (
    <section id="reviews" className="section-padding bg-blush/20">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white px-6 py-10 text-center shadow-[0_4px_24px_rgba(27,67,50,0.06)] sm:px-10">
          <h2 className="heading-serif mb-3 text-2xl font-bold text-maroon-deep sm:text-3xl">
            Find Us on Google
          </h2>
          <p className="mb-2 text-charcoal/80">
            {siteConfig.address.full}
          </p>
          <p className="mb-6 text-sm text-charcoal/65">
            Read customer reviews and get directions to Phool Pattiyan on Google Maps.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={siteConfig.google.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-maroon px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-deep"
            >
              Read Google Reviews
            </Link>
            <Link
              href={siteConfig.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border-2 border-maroon px-6 py-3 text-sm font-semibold text-maroon transition-colors hover:bg-maroon hover:text-white"
            >
              Open in Google Maps
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
