import { Button } from "@/components/ui/Button";
import { buildCustomOrderUrl } from "@/lib/whatsapp";

const customOptions = [
  "Choose flower colours",
  "Choose wrapping style",
  "Add premium chocolates",
  "Add money notes",
  "Add a greeting card",
  "Add a personalised name",
  "Coordinate with wedding dress colours",
  "Choose bouquet size",
  "Share an inspiration photograph",
];

export function CustomOrdersSection() {
  return (
    <section id="custom-orders" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
              Your Idea, Brought to Life
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-charcoal/80">
              Have a colour, flower, budget or inspiration photo in mind? Share it with us
              on WhatsApp. Our team will recommend the closest available flowers and create
              a personalised arrangement for your occasion.
            </p>
            <Button variant="whatsapp" size="lg" href={buildCustomOrderUrl()} external>
              Discuss a Custom Order
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {customOptions.map((option) => (
              <li
                key={option}
                className="flex items-center gap-3 rounded-xl bg-blush/50 px-4 py-3 text-sm text-charcoal/85"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-maroon text-xs text-white">
                  ✓
                </span>
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
