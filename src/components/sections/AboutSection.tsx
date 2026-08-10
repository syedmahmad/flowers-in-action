const values = [
  {
    title: "Freshly Prepared",
    description:
      "Flowers are arranged close to the confirmed delivery schedule wherever possible.",
  },
  {
    title: "Made for Your Moment",
    description:
      "Colours, wrapping, chocolates and personal notes can be customised.",
  },
  {
    title: "Clear WhatsApp Ordering",
    description:
      "Choose an item, send your details and confirm directly with our team.",
  },
  {
    title: "Local Lahore Service",
    description:
      "We deliver across Lahore and understand the occasions and gifting preferences of our local customers.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-ivory">
      <div className="container-narrow">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Flowers Crafted With Feeling
          </h2>
          <p className="text-lg leading-relaxed text-charcoal/80">
            Phool Pattiyan is a Lahore-based flower and decoration studio created to make
            meaningful gifting easier, more personal and more beautiful. From fresh bouquets
            and birthday decoration to shadi function flowers, mehndi gajra, groom garlands
            and floral jewellery, every arrangement is prepared with attention to colour,
            freshness and presentation.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/80">
            Located at Plaza 24, B Block Bankers, close to DHA Phase 4, State Life Housing
            Society and Lake City Lahore, we serve customers across Lahore through convenient
            WhatsApp ordering and carefully coordinated delivery.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div
              key={value.title}
              className="rounded-2xl bg-white p-6 text-center card-shadow"
            >
              <h3 className="heading-serif mb-2 text-lg font-semibold text-maroon-deep">
                {value.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/75">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
