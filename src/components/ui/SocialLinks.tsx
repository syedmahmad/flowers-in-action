import Link from "next/link";
import { siteConfig } from "@/data/config";
import { cn } from "@/lib/utils";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 9.5V7.75c0-.69.56-1.25 1.25-1.25H16V4h-2.01c-2.07 0-3.74 1.68-3.74 3.74V9.5H8v2.75h2.25V20h3.25v-7.75H16l.5-2.75h-3z" />
    </svg>
  );
}

const iconButtonClass =
  "flex h-10 w-10 items-center justify-center rounded-full text-maroon transition-colors hover:bg-maroon/5";

type SocialLinksProps = {
  variant?: "icons" | "menu" | "inline" | "footer";
  className?: string;
};

export function SocialLinks({ variant = "inline", className }: SocialLinksProps) {
  if (variant === "icons") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label={`Follow ${siteConfig.name} on Instagram`}
        >
          <InstagramIcon />
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={iconButtonClass}
          aria-label={`Follow ${siteConfig.name} on Facebook`}
        >
          <FacebookIcon />
        </a>
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <div className={cn("space-y-2", className)}>
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-base font-medium text-charcoal hover:bg-maroon/5"
        >
          <InstagramIcon />
          {siteConfig.social.instagramHandle}
        </a>
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-2xl px-5 py-4 text-base font-medium text-charcoal hover:bg-maroon/5"
        >
          <FacebookIcon />
          {siteConfig.social.facebookLabel}
        </a>
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <>
        <li>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-maroon"
          >
            Instagram {siteConfig.social.instagramHandle}
          </a>
        </li>
        <li>
          <a
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-maroon"
          >
            Facebook {siteConfig.social.facebookLabel}
          </a>
        </li>
      </>
    );
  }

  return (
    <div className={cn("space-y-3 text-charcoal/80", className)}>
      <p>
        <strong>Instagram:</strong>{" "}
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon hover:underline"
        >
          {siteConfig.social.instagramHandle}
        </a>
      </p>
      <p>
        <strong>Facebook:</strong>{" "}
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-maroon hover:underline"
        >
          {siteConfig.social.facebookLabel}
        </a>
      </p>
    </div>
  );
}

export function SocialFollowRow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <span className="text-sm font-semibold text-maroon-deep">Follow us:</span>
      <Link
        href={siteConfig.social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white px-4 py-2 text-sm font-medium text-maroon transition-colors hover:bg-maroon/5"
      >
        <InstagramIcon className="h-4 w-4" />
        {siteConfig.social.instagramHandle}
      </Link>
      <Link
        href={siteConfig.social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full border border-maroon/15 bg-white px-4 py-2 text-sm font-medium text-maroon transition-colors hover:bg-maroon/5"
      >
        <FacebookIcon className="h-4 w-4" />
        {siteConfig.social.facebookLabel}
      </Link>
    </div>
  );
}
