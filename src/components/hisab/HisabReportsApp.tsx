"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  formatPkr,
  saleReceivedVia,
  signedAmount,
  topExpenses,
  type HisabYearSummary,
} from "@/lib/hisab/calc";
import type { HisabEntry, HisabMonthData, HisabMonthSummary } from "@/lib/hisab/types";

function monthLabel(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleDateString("en-PK", {
    month: "long",
    year: "numeric",
  });
}

function shortMonth(month: number): string {
  return new Date(2000, month - 1, 1).toLocaleDateString("en-PK", { month: "short" });
}

export function HisabReportsApp() {
  const now = new Date();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"month" | "year">("month");
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [monthData, setMonthData] = useState<HisabMonthData | null>(null);
  const [summary, setSummary] = useState<HisabMonthSummary | null>(null);
  const [yearSummary, setYearSummary] = useState<HisabYearSummary | null>(null);
  const [expandedDate, setExpandedDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  const loadMonthReport = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`/api/hisab/reports/month?year=${year}&month=${month}`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Could not load month.");
      const json = (await res.json()) as {
        data: HisabMonthData;
        summary: HisabMonthSummary;
      };
      setMonthData(json.data);
      setSummary(json.summary);
      setAuthed(true);
    } catch {
      setLoadError("Could not load month report.");
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  const loadYearReport = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`/api/hisab/reports/year?year=${year}`, {
        credentials: "include",
      });
      if (res.status === 403 || res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) throw new Error("Could not load year.");
      const json = (await res.json()) as { summary: HisabYearSummary };
      setYearSummary(json.summary);
      setAuthed(true);
    } catch {
      setLoadError("Could not load year report.");
    } finally {
      setLoading(false);
    }
  }, [year]);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const res = await fetch(`/api/hisab/reports/month?year=${year}&month=${month}`, {
        credentials: "include",
      });
      setLoading(false);
      if (res.ok) {
        const json = (await res.json()) as {
          data: HisabMonthData;
          summary: HisabMonthSummary;
        };
        setMonthData(json.data);
        setSummary(json.summary);
        setAuthed(true);
      } else if (res.status === 403 || res.status === 401) {
        setAuthed(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (authed !== true) return;
    if (tab === "month") void loadMonthReport();
    else void loadYearReport();
  }, [authed, tab, year, month, loadMonthReport, loadYearReport]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/hisab/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pin, role: "owner" }),
    });
    if (!res.ok) {
      const j = (await res.json()) as { error?: string };
      setLoginError(j.error ?? "Login failed.");
      return;
    }
    setPin("");
    setAuthed(true);
    if (tab === "month") await loadMonthReport();
    else await loadYearReport();
  }

  async function handleLogout() {
    await fetch("/api/hisab/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setMonthData(null);
    setSummary(null);
    setYearSummary(null);
  }

  function exportCsv() {
    if (!summary || !monthData) return;
    const lines = ["date,type,note,amount,received_via"];
    for (const day of summary.days) {
      const entries = monthData.days[day.date] ?? [];
      for (const e of entries) {
        const safe = `"${e.note.replace(/"/g, '""')}"`;
        const via = e.kind === "sale" ? saleReceivedVia(e) : "";
        lines.push(`${day.date},${e.kind},${safe},${e.amount},${via}`);
      }
    }
    lines.push("");
    lines.push(`month_sales,${summary.sales}`);
    lines.push(`month_sales_cash,${summary.salesCash}`);
    lines.push(`month_sales_online,${summary.salesOnline}`);
    lines.push(`month_expenses,${summary.expenses}`);
    lines.push(`month_net,${summary.net}`);
    const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hisab-${year}-${String(month).padStart(2, "0")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function renderDayLines(entries: HisabEntry[]) {
    const sorted = [...entries].sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === "expense" ? -1 : 1;
      return b.amount - a.amount;
    });
    return (
      <ul className="mt-2 space-y-1 border-t border-maroon/10 pt-2">
        {sorted.map((entry) => (
          <li key={entry.id} className="flex justify-between gap-2 text-sm">
            <span className="min-w-0 truncate text-charcoal/80">
              <span className={entry.kind === "expense" ? "text-red-600" : "text-green-natural"}>
                {entry.kind === "sale" ? "+" : "−"}
              </span>{" "}
              {entry.note}
              {entry.kind === "sale" && (
                <span className="ml-1 text-[10px] uppercase text-charcoal/45">
                  ({saleReceivedVia(entry)})
                </span>
              )}
            </span>
            <span className="shrink-0 font-medium">{formatPkr(signedAmount(entry))}</span>
          </li>
        ))}
      </ul>
    );
  }

  if (authed === null && loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory text-charcoal/70">
        Loading…
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-maroon/15 bg-white p-6 shadow-lg"
        >
          <h1 className="heading-serif mb-1 text-2xl font-semibold text-maroon-deep">
            Hisab Reports
          </h1>
          <p className="mb-6 text-sm text-charcoal/65">
            Owner PIN only. Staff use{" "}
            <Link href="/daily-hisab" className="text-maroon underline-offset-2 hover:underline">
              daily entry
            </Link>
            .
          </p>
          <label className="mb-2 block text-sm font-medium text-charcoal">Owner PIN</label>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="mb-4 w-full rounded-xl border border-maroon/20 px-4 py-3 text-lg tracking-widest"
            placeholder="••••"
          />
          {loginError && <p className="mb-3 text-sm text-red-700">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-maroon py-3 font-semibold text-white"
          >
            View reports
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ivory pb-10">
      <header className="sticky top-0 z-10 border-b border-maroon/10 bg-ivory/95 backdrop-blur">
        <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
          <div>
            <h1 className="heading-serif text-xl font-semibold text-maroon-deep">Hisab Reports</h1>
            <p className="text-xs text-charcoal/55">Owner view — not for staff</p>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="text-sm font-medium text-maroon underline-offset-2 hover:underline"
          >
            Lock
          </button>
        </div>
        <div className="mx-auto flex max-w-lg gap-2 px-4 pb-3">
          <button
            type="button"
            onClick={() => setTab("month")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold ${
              tab === "month" ? "bg-maroon text-white" : "bg-blush text-charcoal"
            }`}
          >
            Month
          </button>
          <button
            type="button"
            onClick={() => setTab("year")}
            className={`flex-1 rounded-full py-2 text-sm font-semibold ${
              tab === "year" ? "bg-maroon text-white" : "bg-blush text-charcoal"
            }`}
          >
            Year
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
        <div className="mb-4 flex flex-wrap items-end gap-3">
          <div>
            <label className="mb-1 block text-sm font-medium text-charcoal">Year</label>
            <input
              type="number"
              min={2020}
              max={2100}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-28 rounded-xl border border-maroon/20 px-3 py-2"
            />
          </div>
          {tab === "month" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-charcoal">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(Number(e.target.value))}
                className="rounded-xl border border-maroon/20 px-3 py-2"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option key={m} value={m}>
                    {shortMonth(m)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {loadError && <p className="mb-4 text-sm text-red-700">{loadError}</p>}

        {tab === "month" && summary && (
          <>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="heading-serif text-lg font-semibold text-maroon-deep">
                {monthLabel(year, month)}
              </h2>
              <button
                type="button"
                onClick={exportCsv}
                className="text-sm font-medium text-maroon underline-offset-2 hover:underline"
              >
                Export CSV
              </button>
            </div>
            <p className="mb-4 text-xs text-charcoal/55">
              Rent and fixed bills are tracked separately — subtract from month net yourself.
            </p>

            <div className="mb-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="rounded-xl bg-green-natural/10 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Total received</p>
                <p className="text-sm font-bold text-maroon-deep">{formatPkr(summary.sales)}</p>
              </div>
              <div className="rounded-xl bg-blush/80 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Cash</p>
                <p className="text-sm font-bold text-maroon-deep">{formatPkr(summary.salesCash)}</p>
              </div>
              <div className="rounded-xl bg-blush/80 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Online</p>
                <p className="text-sm font-bold text-maroon-deep">{formatPkr(summary.salesOnline)}</p>
              </div>
              <div className="rounded-xl bg-red-500/10 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Expenses</p>
                <p className="text-sm font-bold text-red-700">
                  {summary.expenses > 0 ? formatPkr(-summary.expenses) : "0"}
                </p>
              </div>
            </div>
            <div className="mb-4 rounded-xl bg-gold-light/40 p-3 text-center">
              <p className="text-[10px] uppercase text-charcoal/55">Month net</p>
              <p className="text-sm font-bold text-maroon-deep">{formatPkr(summary.net)}</p>
            </div>

            <ul className="space-y-2">
              {summary.days.length === 0 && (
                <li className="rounded-xl bg-blush/60 px-4 py-6 text-center text-sm text-charcoal/60">
                  No entries this month yet.
                </li>
              )}
              {[...summary.days].reverse().map((day) => {
                const entries = monthData?.days[day.date] ?? [];
                const big = topExpenses(entries, 2);
                const open = expandedDate === day.date;
                return (
                  <li key={day.date} className="rounded-xl border border-maroon/8 bg-white px-4 py-3">
                    <button
                      type="button"
                      onClick={() => setExpandedDate(open ? null : day.date)}
                      className="flex w-full items-start justify-between gap-2 text-left"
                    >
                      <div className="min-w-0">
                        <p className="flex flex-wrap items-center gap-2 font-medium text-charcoal">
                          {day.date}
                          {day.done && (
                            <span className="rounded-full bg-green-natural/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-green-natural">
                              Done
                            </span>
                          )}
                          {!day.done && day.entryCount > 0 && (
                            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                              Open
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-charcoal/55">{day.entryCount} lines</p>
                        {day.net < 0 && big.length > 0 && !open && (
                          <p className="mt-1 text-xs text-red-700/90">
                            Big costs:{" "}
                            {big.map((e) => `${e.note} (${formatPkr(e.amount)})`).join(" · ")}
                          </p>
                        )}
                      </div>
                      <p
                        className={`shrink-0 font-bold ${day.net >= 0 ? "text-green-natural" : "text-red-600"}`}
                      >
                        {formatPkr(day.net)}
                      </p>
                    </button>
                    {open && entries.length > 0 && renderDayLines(entries)}
                    {open && (
                      <Link
                        href={`/daily-hisab?date=${day.date}`}
                        className="mt-2 inline-block text-xs font-medium text-maroon underline-offset-2 hover:underline"
                      >
                        Open in daily entry →
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {tab === "year" && yearSummary && (
          <>
            <h2 className="heading-serif mb-4 text-lg font-semibold text-maroon-deep">{year}</h2>
            <div className="mb-4 grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-green-natural/10 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Sales</p>
                <p className="text-sm font-bold text-maroon-deep">
                  {formatPkr(yearSummary.sales)}
                </p>
              </div>
              <div className="rounded-xl bg-red-500/10 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Expenses</p>
                <p className="text-sm font-bold text-maroon-deep">
                  {formatPkr(yearSummary.expenses)}
                </p>
              </div>
              <div className="rounded-xl bg-gold-light/40 p-3 text-center">
                <p className="text-[10px] uppercase text-charcoal/55">Net</p>
                <p className="text-sm font-bold text-maroon-deep">{formatPkr(yearSummary.net)}</p>
              </div>
            </div>
            <ul className="space-y-2">
              {[...yearSummary.months].reverse().map((row) => (
                <li key={row.month}>
                  <button
                    type="button"
                    onClick={() => {
                      setMonth(row.month);
                      setTab("month");
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-maroon/8 bg-white px-4 py-3 text-left"
                  >
                    <span className="font-medium text-charcoal">
                      {shortMonth(row.month)} {year}
                    </span>
                    <span
                      className={`font-bold ${
                        !row.hasEntries
                          ? "text-charcoal/35"
                          : row.net >= 0
                            ? "text-green-natural"
                            : "text-red-600"
                      }`}
                    >
                      {row.hasEntries ? formatPkr(row.net) : "—"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  );
}
