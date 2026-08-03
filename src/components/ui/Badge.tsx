import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "discount" | "custom" | "same-day" | "neutral";
  className?: string;
}

const variants = {
  discount: "bg-maroon text-white",
  custom: "bg-green-natural/15 text-green-natural",
  "same-day": "bg-blush text-maroon-deep",
  neutral: "bg-charcoal/10 text-charcoal",
};

export function Badge({ children, variant = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide uppercase",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
