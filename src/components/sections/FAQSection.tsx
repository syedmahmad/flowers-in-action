"use client";

import { useState } from "react";
import { faqs } from "@/data/faqs";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="section-padding bg-ivory">
      <div className="container-narrow max-w-3xl">
        <div className="mb-10 text-center">
          <h2 className="heading-serif mb-3 text-3xl font-bold text-maroon-deep sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-charcoal/80">
            Everything you need to know about ordering flowers in Lahore through WhatsApp.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl bg-white card-shadow"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-maroon-deep">{faq.question}</span>
                  <span
                    className={cn(
                      "shrink-0 text-maroon transition-transform",
                      isOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {isOpen && (
                  <div className="border-t border-blush px-5 py-4">
                    <p className="text-sm leading-relaxed text-charcoal/80">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
