import { Button } from "@/components/ui/Button";
import { buildCustomOrderUrl } from "@/lib/whatsapp";

export function CustomOrdersSection() {
  return (
    <section id="custom-orders" className="section-padding scroll-mt-20 bg-white">
      <div className="container-narrow">
        <div className="mx-auto max-w-2xl rounded-3xl bg-blush/30 px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="heading-serif mb-3 text-2xl font-bold text-maroon-deep sm:text-3xl">
            Have Something Different in Mind?
          </h2>
          <p className="mb-6 text-charcoal/80">
            Share your inspiration, preferred colours and budget with us. We&apos;ll help
            create something especially for your occasion.
          </p>
          <Button variant="whatsapp" size="lg" href={buildCustomOrderUrl()} external>
            Share Your Idea on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
