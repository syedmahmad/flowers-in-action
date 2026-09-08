import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { GoogleMapEmbed } from "@/components/ui/GoogleMapEmbed";
import { GoogleRatingCard } from "@/components/ui/GoogleRatingCard";
import { SocialFollowRow } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/data/config";
import { images } from "@/data/images";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function StoreSection() {
  return (
    <section id="store" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-x-10 lg:gap-y-8">
          <div>
            <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
              Visit Phool Pattiyan
            </h2>
            <p className="mb-2 text-lg text-charcoal/80">{siteConfig.address.full}</p>
            <p className="mb-4 text-sm font-medium text-charcoal/65">
              Google Plus Code: {siteConfig.address.plusCode}
            </p>
            <p className="mb-6 text-sm font-medium text-maroon">
              {siteConfig.businessHoursNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" href={siteConfig.mapDirectionsUrl} external>
                Get Directions
              </Button>
              <Button variant="whatsapp" href={buildGeneralWhatsAppUrl()} external>
                WhatsApp
              </Button>
              <Button variant="secondary" href={`tel:${siteConfig.phone}`} external>
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
            <SocialFollowRow className="mt-6" />
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl bg-[#f7f3ed] ring-1 ring-gold/20">
            <Image
              src={images.store}
              alt="Phool Pattiyan flower shop in Lahore"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[center_35%] saturate-[1.06] contrast-[1.04]"
              loading="lazy"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-maroon-deep/20 via-transparent to-[#fffef9]/10"
              aria-hidden="true"
            />
          </div>

          <GoogleRatingCard className="mt-0" />

          <div className="min-h-[280px] self-stretch">
            <GoogleMapEmbed fillHeight />
          </div>
        </div>
      </div>
    </section>
  );
}
