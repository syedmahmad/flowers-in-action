import type { HisabMonthData } from "./types";
import { todayIsoPakistan } from "./date";

export function filterMonthDataForStaff(data: HisabMonthData, today: string): HisabMonthData {
  const entries = data.days[today] ?? [];
  const doneAt = data.dayDone?.[today];
  return {
    ...data,
    days: entries.length > 0 ? { [today]: entries } : {},
    dayDone: doneAt ? { [today]: doneAt } : {},
  };
}

export async function assertStaffMayEditDate(
  date: string,
  isStaffOnly: boolean
): Promise<{ ok: true; today: string } | { ok: false; error: string }> {
  const today = todayIsoPakistan();
  if (isStaffOnly && date !== today) {
    return {
      ok: false,
      error: "Team login is for today only. Past days are in owner reports.",
    };
  }
  return { ok: true, today };
}
