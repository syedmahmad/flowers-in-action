export type HisabKind = "sale" | "expense";

/** How a sale was received (ignored for expenses). */
export type HisabReceivedVia = "cash" | "online";

export interface HisabEntry {
  id: string;
  note: string;
  /** Always positive PKR */
  amount: number;
  kind: HisabKind;
  /** Sales only — defaults to cash when missing (older entries). */
  receivedVia?: HisabReceivedVia;
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
  salesCash: number;
  salesOnline: number;
  expenses: number;
  net: number;
  entryCount: number;
  done: boolean;
}

export interface HisabMonthSummary {
  year: number;
  month: number;
  sales: number;
  salesCash: number;
  salesOnline: number;
  expenses: number;
  net: number;
  days: HisabDaySummary[];
}
