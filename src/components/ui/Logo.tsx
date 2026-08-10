import { cn } from "@/lib/utils";

const LOGO_SRC = "/images/brand/logo.png";

interface LogoProps {
  className?: string;
}

/** Phool Pattiyan wordmark — header & footer */
export function Logo({ className = "" }: LogoProps) {
  return (
    // Native img avoids Next.js image optimizer cache serving stale logos
    <img
      src={LOGO_SRC}
      alt="Phool Pattiyan — premium florist in Lahore"
      width={958}
      height={190}
      className={cn(
        "block h-14 w-auto max-w-full object-contain object-left sm:h-16 lg:h-[4.25rem]",
        className
      )}
    />
  );
}
