import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { images } from "@/data/images";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function StoreSection() {
  return (
    <section id="store" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
              Visit Phool Pattiyan
            </h2>
            <p className="mb-4 text-lg text-charcoal/80">{siteConfig.address.full}</p>
            <p className="mb-6 text-sm font-medium text-maroon">
              {siteConfig.businessHoursNote}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                href={siteConfig.mapDirectionsUrl}
                external
              >
                Get Directions
              </Button>
              <Button variant="whatsapp" href={buildGeneralWhatsAppUrl()} external>
                WhatsApp
              </Button>
              <Button variant="secondary" href={`tel:${siteConfig.phone}`} external>
                Call {siteConfig.phoneDisplay}
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-2xl">
              <Image
                src={images.store}
                alt="Phool Pattiyan flower shop in Lahore"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <iframe
                title="Phool Pattiyan location map"
                src={siteConfig.mapEmbedUrl}
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
