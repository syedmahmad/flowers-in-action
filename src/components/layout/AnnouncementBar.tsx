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

  if (messages.length === 1) {
    return (
      <div
        className="bg-maroon-deep py-2.5 text-center text-sm text-white"
        role="region"
        aria-label="Announcements"
      >
        <p className="px-4 font-medium">{messages[0]}</p>
      </div>
    );
  }

  return (
    <div
      className="bg-maroon-deep py-2.5 text-center text-sm text-white"
      role="region"
      aria-label="Announcements"
      aria-live="polite"
    >
      <p key={messages[index]} className="animate-fade-in px-3 text-xs font-medium sm:px-4 sm:text-sm">
        {messages[index]}
      </p>
    </div>
  );
}
