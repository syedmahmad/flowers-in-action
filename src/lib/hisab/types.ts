export type HisabKind = "sale" | "expense";

export interface HisabEntry {
  id: string;
  note: string;
  /** Always positive PKR */
  amount: number;
  kind: HisabKind;
  createdAt: string;
}

export interface HisabMonthData {
  version: 1;
  year: number;
  month: number;
  days: Record<string, HisabEntry[]>;
  /** Date (YYYY-MM-DD) → ISO time when team marked that day complete */
  dayDone?: Record<string, string>;
  updatedAt: string;
}

export interface HisabDaySummary {
  date: string;
  sales: number;
  expenses: number;
  net: number;
  entryCount: number;
  done: boolean;
}

export interface HisabMonthSummary {
  year: number;
  month: number;
  sales: number;
  expenses: number;
  net: number;
  days: HisabDaySummary[];
}
