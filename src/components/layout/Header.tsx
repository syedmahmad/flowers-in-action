"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Shop", href: "#shop" },
  { label: "Occasions", href: "#occasions" },
  { label: "Flowers", href: "#flowers" },
  { label: "Weddings", href: "#weddings" },
  { label: "Areas", href: "#areas" },
  { label: "Custom", href: "#custom-orders" },
  { label: "About", href: "#about" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 bg-white transition-shadow duration-300",
          (scrolled || menuOpen) && "shadow-md",
          menuOpen && "z-50"
        )}
      >
        <div className="container-narrow container-padding">
          <div className="flex min-h-16 items-center gap-4 py-1 sm:min-h-[4.25rem] sm:py-1.5 lg:min-h-20">
            <Link
              href="#home"
              className="flex shrink-0 items-center"
              aria-label={`${siteConfig.name} home`}
              onClick={closeMenu}
            >
              <Logo />
            </Link>

            <nav
              className="hidden min-w-0 flex-1 lg:block"
              aria-label="Main navigation"
            >
              <ul className="flex flex-wrap items-center gap-0.5 xl:gap-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="whitespace-nowrap rounded-full px-2.5 py-2 text-sm font-medium text-charcoal transition-colors hover:bg-blush hover:text-maroon xl:px-3"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-maroon hover:bg-blush lg:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-charcoal/50 lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-white px-4 pb-8 pt-4 sm:top-[4.25rem] lg:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-xl px-4 py-3.5 text-base font-medium text-charcoal hover:bg-blush hover:text-maroon"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-blush pt-6">
              <Button
                variant="whatsapp"
                size="md"
                href={buildGeneralWhatsAppUrl()}
                external
                className="w-full"
              >
                Order on WhatsApp
              </Button>
            </div>
          </nav>
        </>
      )}
    </>
  );
}
