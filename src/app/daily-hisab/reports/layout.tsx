import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hisab Reports",
  robots: { index: false, follow: false },
};

export default function HisabReportsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
