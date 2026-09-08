"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/data/config";

export function AnnouncementBar() {
  const messages = [...siteConfig.announcementMessages];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (messages.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % messages.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [messages.length]);

  const barClass =
    "border-b border-gold/15 bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep py-2.5 text-center text-sm text-white";

  if (messages.length === 1) {
    return (
      <div className={barClass} role="region" aria-label="Announcements">
        <p className="px-4 font-medium tracking-wide">{messages[0]}</p>
      </div>
    );
  }

  return (
    <div className={barClass} role="region" aria-label="Announcements" aria-live="polite">
      <p key={messages[index]} className="animate-fade-in px-3 text-xs font-medium tracking-wide sm:px-4 sm:text-sm">
        {messages[index]}
      </p>
    </div>
  );
}
