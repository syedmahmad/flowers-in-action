"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { PolicyModal } from "@/components/ui/PolicyModal";
import { siteConfig } from "@/data/config";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import type { policies } from "@/data/policies";

type PolicyKey = keyof typeof policies;

const footerLinks = [
  { label: "Shop", href: "#shop" },
  { label: "Occasions", href: "#occasions" },
  { label: "Wedding Flowers", href: "#weddings" },
  { label: "Delivery Areas", href: "#areas" },
  { label: "Custom Orders", href: "#custom-orders" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

const policyLinks: { label: string; key: PolicyKey }[] = [
  { label: "Privacy Policy", key: "privacy" },
  { label: "Terms", key: "terms" },
  { label: "Refund and Cancellation Policy", key: "refund" },
];

export function Footer() {
  const [activePolicy, setActivePolicy] = useState<PolicyKey | null>(null);

  return (
    <>
      <footer className="border-t border-blush bg-white">
        <div className="container-narrow section-padding !py-12">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="min-w-0">
              <Logo className="mb-4 h-12 max-w-[220px] sm:h-14 sm:max-w-[260px] lg:h-16 lg:max-w-[280px]" />
              <p className="text-sm leading-relaxed text-charcoal/80">
                {siteConfig.tagline}. Fresh flowers, meaningful gifts and wedding creations
                handcrafted in Lahore.
              </p>
            </div>

            <div>
              <h3 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">
                Explore
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-charcoal/80 hover:text-maroon"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">
                Policies
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("delivery")}
                    className="text-sm text-charcoal/80 hover:text-maroon"
                  >
                    Delivery Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("substitution")}
                    className="text-sm text-charcoal/80 hover:text-maroon"
                  >
                    Substitution Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActivePolicy("cancellation")}
                    className="text-sm text-charcoal/80 hover:text-maroon"
                  >
                    Cancellation Policy
                  </button>
                </li>
                {policyLinks.map((link) => (
                  <li key={link.key}>
                    <button
                      type="button"
                      onClick={() => setActivePolicy(link.key)}
                      className="text-sm text-charcoal/80 hover:text-maroon"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-charcoal/80">
                <li>
                  <a
                    href={buildGeneralWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-maroon"
                  >
                    WhatsApp: {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`tel:${siteConfig.phone}`} className="hover:text-maroon">
                    Call: {siteConfig.phoneDisplay}
                  </a>
                </li>
                <li>{siteConfig.address.full}</li>
              </ul>
              <div className="mt-4 flex gap-3">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-maroon hover:bg-maroon hover:text-white"
                  aria-label="Instagram"
                >
                  IG
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-blush text-maroon hover:bg-maroon hover:text-white"
                  aria-label="Facebook"
                >
                  FB
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-blush pt-6 text-center text-sm text-charcoal/60">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </p>
            <nav className="mt-2" aria-label="HTML sitemap">
              {footerLinks.map((link, i) => (
                <span key={link.href}>
                  <Link href={link.href} className="hover:text-maroon">
                    {link.label}
                  </Link>
                  {i < footerLinks.length - 1 && " · "}
                </span>
              ))}
            </nav>
          </div>
        </div>
      </footer>

      <PolicyModal
        policy={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </>
  );
}
