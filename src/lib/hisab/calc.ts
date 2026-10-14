import type { HisabEntry, HisabMonthData, HisabDaySummary, HisabMonthSummary } from "./types";

export function signedAmount(entry: HisabEntry): number {
  return entry.kind === "sale" ? entry.amount : -entry.amount;
}

export function summarizeDay(date: string, entries: HisabEntry[]): HisabDaySummary {
  let sales = 0;
  let expenses = 0;
  for (const e of entries) {
    if (e.kind === "sale") sales += e.amount;
    else expenses += e.amount;
  }
  return {
    date,
    sales,
    expenses,
    net: sales - expenses,
    entryCount: entries.length,
    done: false,
  };
}

export function isDayDone(data: HisabMonthData, date: string): boolean {
  return Boolean(data.dayDone?.[date]);
}

export function summarizeMonth(data: HisabMonthData): HisabMonthSummary {
  const dates = new Set([
    ...Object.keys(data.days),
    ...Object.keys(data.dayDone ?? {}),
  ]);
  const days: HisabDaySummary[] = [...dates]
    .sort()
    .map((date) => ({
      ...summarizeDay(date, data.days[date] ?? []),
      done: isDayDone(data, date),
    }));

  let sales = 0;
  let expenses = 0;
  for (const d of days) {
    sales += d.sales;
    expenses += d.expenses;
  }

  return {
    year: data.year,
    month: data.month,
    sales,
    expenses,
    net: sales - expenses,
    days,
  };
}

export function formatPkr(n: number): string {
  const sign = n < 0 ? "-" : "";
  return `${sign}${Math.abs(n).toLocaleString("en-PK")}`;
}

export function topExpenses(entries: HisabEntry[], limit = 3): HisabEntry[] {
  return entries
    .filter((e) => e.kind === "expense")
    .sort((a, b) => b.amount - a.amount)
    .slice(0, limit);
}

export interface HisabYearMonthRow {
  month: number;
  sales: number;
  expenses: number;
  net: number;
  hasEntries: boolean;
}

export interface HisabYearSummary {
  year: number;
  sales: number;
  expenses: number;
  net: number;
  months: HisabYearMonthRow[];
}

export function summarizeYear(
  year: number,
  monthDataList: HisabMonthData[]
): HisabYearSummary {
  const months: HisabYearMonthRow[] = [];
  let sales = 0;
  let expenses = 0;

  for (let m = 1; m <= 12; m++) {
    const data = monthDataList.find((d) => d.year === year && d.month === m);
    if (!data) {
      months.push({ month: m, sales: 0, expenses: 0, net: 0, hasEntries: false });
      continue;
    }
    const summary = summarizeMonth(data);
    const hasEntries = summary.days.some((d) => d.entryCount > 0);
    months.push({
      month: m,
      sales: summary.sales,
      expenses: summary.expenses,
      net: summary.net,
      hasEntries,
    });
    sales += summary.sales;
    expenses += summary.expenses;
  }

  return { year, sales, expenses, net: sales - expenses, months };
}
