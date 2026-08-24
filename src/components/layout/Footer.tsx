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
  { label: "Bouquets", href: "#bouquets" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const seoLinks = [
  { label: "Delivery Areas", href: "#areas" },
  { label: "FAQs", href: "#faqs" },
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
                Fresh bouquets and celebration décor, handcrafted in Lahore.
              </p>
            </div>

            <div>
              <h3 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">
                Phool Pattiyan
              </h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-charcoal/80 hover:text-maroon">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">
                Connect
              </h3>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>
                  <a href={buildGeneralWhatsAppUrl()} className="hover:text-maroon">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-maroon"
                  >
                    Instagram @phool_pattiyan
                  </a>
                </li>
                <li>
                  <a href={siteConfig.mapDirectionsUrl} className="hover:text-maroon">
                    Directions
                  </a>
                </li>
                {seoLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="hover:text-maroon">
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
          </div>

          <div className="mt-10 border-t border-blush pt-6 text-center text-sm text-charcoal/60">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. Fresh flowers &amp; event
              decoration in Lahore.
            </p>
          </div>
        </div>
      </footer>

      {activePolicy && (
        <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
      )}
    </>
  );
}
