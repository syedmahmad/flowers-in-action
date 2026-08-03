import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "full" | "icon";
}

const LOGO_SRC = "/images/brand/logo.png";

export function Logo({ className = "", variant = "full" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Image
        src={LOGO_SRC}
        alt=""
        width={48}
        height={48}
        className={`h-8 w-8 object-contain object-left ${className}`}
        aria-hidden="true"
        priority
      />
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="Flowers In Action"
      width={1024}
      height={169}
      className={`h-8 w-auto max-w-[140px] object-contain object-left sm:h-10 sm:max-w-[200px] lg:h-11 lg:max-w-[240px] ${className}`}
      priority
    />
  );
}
