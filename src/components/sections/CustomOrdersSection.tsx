import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { images } from "@/data/images";
import { buildCustomOrderUrl } from "@/lib/whatsapp";

export function CustomOrdersSection() {
  return (
    <section id="custom-orders" className="section-padding scroll-mt-20 bg-ivory">
      <div className="container-narrow">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-maroon-deep shadow-[0_24px_50px_-12px_rgba(27,67,50,0.35)] ring-1 ring-gold/25">
          <div className="absolute inset-0">
            <Image
              src={images.gallery[3]}
              alt="Custom floral decoration by Phool Pattiyan"
              fill
              className="object-cover opacity-20 mix-blend-luminosity"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-maroon-deep via-maroon-deep/80 to-transparent" />
          </div>

          <div className="relative flex flex-col gap-6 p-8 sm:p-12 md:flex-row md:items-center md:justify-between lg:p-16">
            <div className="md:max-w-xl">
              <p className="mb-3 text-[0.625rem] font-bold uppercase tracking-[0.25em] text-gold">
                Bespoke Arrangements
              </p>
              <h2 className="heading-serif mb-4 text-3xl font-semibold text-white sm:text-4xl">
                Have Something Different in Mind?
              </h2>
              <p className="text-sm leading-relaxed text-white/80 sm:text-base">
                Share your inspiration, preferred colours and budget with us. We&apos;ll help
                create something especially for your occasion, handcrafted with love.
              </p>
            </div>
            
            <div className="shrink-0 md:pl-8">
              <Button 
                variant="whatsapp" 
                size="lg" 
                href={buildCustomOrderUrl()} 
                external
                className="w-full bg-white/10 text-white border border-white/30 backdrop-blur-md hover:bg-white hover:text-maroon-deep md:w-auto"
              >
                Share Your Idea
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
