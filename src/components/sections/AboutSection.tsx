const values = [
  "Freshly Prepared",
  "Customisable",
  "Lahore Delivery",
  "WhatsApp Ordering",
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-ivory scroll-mt-20">
      <div className="container-narrow">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
              Made Fresh in Lahore
            </h2>
            <p className="text-lg leading-relaxed text-charcoal/80">
              Phool Pattiyan creates fresh bouquets and celebration setups in Lahore — with
              personal customisation and convenient WhatsApp ordering. From everyday gifting
              to birthday decoration and wedding flowers, every arrangement is prepared with
              care.
            </p>
          </div>
          <ul className="grid grid-cols-2 gap-3">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-2xl bg-white px-4 py-5 text-center text-sm font-semibold text-maroon-deep shadow-[0_4px_24px_rgba(27,67,50,0.06)] sm:text-base"
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
