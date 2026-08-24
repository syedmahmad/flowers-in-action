const steps = [
  {
    step: "1",
    title: "Choose",
    description: "Select a bouquet or event package.",
  },
  {
    step: "2",
    title: "WhatsApp Us",
    description: "Send the selected design automatically through WhatsApp.",
  },
  {
    step: "3",
    title: "Confirm",
    description:
      "Confirm availability, delivery or event details and advance payment.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-padding bg-white" aria-labelledby="how-it-works">
      <div className="container-narrow">
        <h2
          id="how-it-works"
          className="heading-serif mb-10 text-center text-3xl font-bold text-maroon-deep sm:text-4xl"
        >
          How It Works
        </h2>
        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
          {steps.map((item) => (
            <div key={item.step} className="rounded-2xl bg-blush/30 p-6 text-center">
              <span className="heading-serif mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-maroon text-lg font-bold text-white">
                {item.step}
              </span>
              <h3 className="heading-serif mb-2 text-lg font-semibold text-maroon-deep">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal/75">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
