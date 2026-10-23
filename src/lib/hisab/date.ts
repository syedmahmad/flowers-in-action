const PK_TZ = "Asia/Karachi";

/** Business calendar date in Lahore (YYYY-MM-DD). */
export function todayIsoPakistan(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PK_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function formatHisabEntryTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-PK", {
      timeZone: PK_TZ,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "";
  }
}

export function formatHisabDayLabel(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-PK", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
