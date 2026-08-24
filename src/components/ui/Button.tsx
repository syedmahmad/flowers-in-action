import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-maroon text-white hover:bg-maroon-deep focus-visible:ring-maroon",
  secondary:
    "bg-blush text-maroon-deep hover:bg-rose-muted/30 focus-visible:ring-maroon",
  outline:
    "border-2 border-maroon text-maroon hover:bg-maroon hover:text-white focus-visible:ring-maroon",
  whatsapp:
    "bg-[#25D366] text-white hover:bg-[#1da851] focus-visible:ring-[#25D366]",
  ghost: "text-maroon hover:bg-blush focus-visible:ring-maroon",
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-xs min-h-[40px] sm:px-4 sm:text-sm sm:min-h-[44px]",
  md: "px-5 py-2.5 text-sm min-h-[44px] sm:px-6 sm:py-3 sm:text-base sm:min-h-[48px]",
  lg: "px-6 py-3 text-base min-h-[48px] sm:px-8 sm:py-4 sm:text-lg sm:min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props["aria-label"]}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} type="button" {...props}>
      {children}
    </button>
  );
}
