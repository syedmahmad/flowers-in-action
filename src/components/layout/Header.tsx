"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/config";
import { buildGeneralWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Bouquets", href: "#bouquets" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
          "sticky top-0 z-40 transition-all duration-300",
          scrolled || menuOpen
            ? "border-b border-blush/70 bg-white/92 shadow-[0_8px_30px_rgba(27,67,50,0.06)] backdrop-blur-xl"
            : "border-b border-transparent bg-white/75 backdrop-blur-md",
          menuOpen && "z-50"
        )}
      >
        <div className="container-narrow container-padding">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-[4.5rem] lg:grid lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
            <Link
              href="#home"
              className="flex min-w-0 shrink items-center lg:justify-self-start"
              aria-label={`${siteConfig.name} home`}
              onClick={closeMenu}
            >
              <Logo className="h-12 sm:h-14 lg:h-[3.75rem]" />
            </Link>

            <nav
              className="hidden lg:block lg:justify-self-center"
              aria-label="Main navigation"
            >
              <ul className="flex items-center gap-1 rounded-full border border-blush/60 bg-white/60 px-2 py-1.5 shadow-sm backdrop-blur-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex shrink-0 items-center gap-2 lg:justify-self-end">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden h-10 w-10 items-center justify-center rounded-full text-maroon transition-colors hover:bg-maroon/5 lg:flex"
                aria-label="Follow Phool Pattiyan on Instagram"
              >
                <InstagramIcon />
              </a>
              <Button
                variant="whatsapp"
                size="sm"
                href={buildGeneralWhatsAppUrl()}
                external
                className="hidden shadow-sm lg:inline-flex"
              >
                Order on WhatsApp
              </Button>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-maroon transition-colors hover:bg-maroon/5 lg:hidden"
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
        </div>
      </header>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-charcoal/40 backdrop-blur-sm lg:hidden"
            onClick={closeMenu}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto bg-white px-5 pb-10 pt-6 sm:top-[4.5rem] lg:hidden"
            aria-label="Mobile navigation"
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-2xl px-5 py-4 text-lg font-medium tracking-wide text-charcoal transition-colors hover:bg-maroon/5 hover:text-maroon"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-3 border-t border-blush pt-8">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl px-5 py-4 text-base font-medium text-charcoal hover:bg-maroon/5"
              >
                <InstagramIcon />
                @phool_pattiyan
              </a>
              <Button
                variant="whatsapp"
                size="md"
                href={buildGeneralWhatsAppUrl()}
                external
                className="w-full shadow-sm"
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
