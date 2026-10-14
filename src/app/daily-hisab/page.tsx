import { Suspense } from "react";
import { DailyHisabApp } from "@/components/hisab/DailyHisabApp";

export default function DailyHisabPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-ivory text-charcoal/70">
          Loading…
        </div>
      }
    >
      <DailyHisabApp />
    </Suspense>
  );
}
