import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Daily Hisab",
  robots: { index: false, follow: false },
};

export default function DailyHisabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
