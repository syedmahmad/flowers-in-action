import { siteConfig } from "@/data/config";

const highlights = [
  {
    title: "Fresh & Handcrafted",
    description: "Every bouquet made to order with real flowers",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 3c-1.5 2.5-4 4.2-4 7.5a4 4 0 1 0 8 0c0-3.3-2.5-5-4-7.5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M8 21h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Lahore-wide Delivery",
    description: "DHA, Johar Town, Lake City & all Lahore",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M3 7h11v8H3V7Zm11 2h4l3 3v3h-7V9Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <circle cx="7" cy="17" r="2" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="17" r="2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Only 10% Advance",
    description: "Confirm your order easily on WhatsApp",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M12 3 4 7v10l8 4 8-4V7l-8-4Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "WhatsApp Ordering",
    description: siteConfig.phoneDisplay,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path
          d="M7 3h10a2 2 0 0 1 2 2v11l-3-2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export function TrustBar() {
  return (
    <section
      className="relative border-y border-maroon/8 bg-white/80 backdrop-blur-sm"
      aria-label="Why choose Phool Pattiyan"
    >
      <div className="container-narrow container-padding py-5 sm:py-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-2xl bg-ivory/70 px-4 py-3 ring-1 ring-maroon/6 sm:px-5 sm:py-4"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-maroon/8 text-green-natural">
                {item.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-maroon-deep sm:text-[0.9375rem]">
                  {item.title}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-charcoal/65 sm:text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
