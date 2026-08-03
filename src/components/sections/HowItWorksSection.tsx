const steps = [
  {
    step: "1",
    title: "Select a Design",
    description: "Browse products or send an inspiration photo.",
  },
  {
    step: "2",
    title: "Message Us on WhatsApp",
    description: "Your selected product and price are automatically included.",
  },
  {
    step: "3",
    title: "Confirm Details",
    description:
      "Share the delivery area, recipient information, date and customisation.",
  },
  {
    step: "4",
    title: "Pay 10% Advance",
    description:
      "After confirmation, pay the requested advance and we begin preparing your order.",
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
          How Ordering Works
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="relative rounded-2xl bg-blush/40 p-6">
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
