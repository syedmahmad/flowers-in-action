"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { buildContactFormUrl, buildGeneralWhatsAppUrl } from "@/lib/whatsapp";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const url = buildContactFormUrl({
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      occasion: String(data.get("occasion") || ""),
      deliveryDate: String(data.get("deliveryDate") || ""),
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || ""),
    });
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="heading-serif mb-4 text-3xl font-bold text-maroon-deep sm:text-4xl">
              Let&apos;s Create Something Beautiful
            </h2>
            <p className="mb-6 text-lg text-charcoal/80">
              Reach out on WhatsApp for the fastest response, or send us an enquiry using
              the form. Submitting the form opens WhatsApp — your order is not confirmed until
              our team replies.
            </p>
            <div className="space-y-3 text-charcoal/80">
              <p>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={buildGeneralWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-maroon hover:underline"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>
                <strong>Location:</strong> {siteConfig.address.full}
              </p>
            </div>
            <div className="mt-6">
              <Button variant="whatsapp" size="lg" href={buildGeneralWhatsAppUrl()} external>
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-ivory p-6 card-shadow sm:p-8"
            aria-label="Contact enquiry form"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="occasion" className="mb-1 block text-sm font-medium">
                    Occasion
                  </label>
                  <input
                    id="occasion"
                    name="occasion"
                    type="text"
                    placeholder="Birthday, Wedding..."
                    className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
                <div>
                  <label htmlFor="deliveryDate" className="mb-1 block text-sm font-medium">
                    Preferred Delivery Date
                  </label>
                  <input
                    id="deliveryDate"
                    name="deliveryDate"
                    type="date"
                    className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="budget" className="mb-1 block text-sm font-medium">
                  Budget Range (PKR)
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                >
                  <option value="">Select range</option>
                  <option value="Under PKR 5,000">Under PKR 5,000</option>
                  <option value="PKR 5,000 - 10,000">PKR 5,000 - 10,000</option>
                  <option value="PKR 10,000 - 20,000">PKR 10,000 - 20,000</option>
                  <option value="Above PKR 20,000">Above PKR 20,000</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full rounded-xl border border-blush px-4 py-3 text-sm focus:border-maroon focus:outline-none focus:ring-2 focus:ring-maroon/20"
                  placeholder="Tell us about your order or custom request..."
                />
              </div>
            </div>
            <Button type="submit" variant="primary" size="lg" className="mt-6 w-full">
              Send Enquiry via WhatsApp
            </Button>
            {submitted && (
              <p className="mt-3 text-center text-sm text-charcoal/60" role="status">
                WhatsApp should open with your enquiry. Our team will confirm availability
                separately — this does not confirm your order.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
