"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { formatPkr, signedAmount, summarizeDay } from "@/lib/hisab/calc";
import type { HisabKind, HisabMonthData } from "@/lib/hisab/types";

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function monthFromDate(date: string): { year: number; month: number } {
  const [y, m] = date.split("-").map(Number);
  return { year: y, month: m };
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

async function apiErrorMessage(res: Response, fallback: string): Promise<string> {
  try {
    const j = (await res.json()) as { error?: string };
    return j.error ?? fallback;
  } catch {
    return fallback;
  }
}

export function DailyHisabApp() {
  const searchParams = useSearchParams();
  const dateFromUrl = searchParams.get("date");
  const initialDate =
    dateFromUrl && DATE_RE.test(dateFromUrl) ? dateFromUrl : todayIso();

  const [authed, setAuthed] = useState<boolean | null>(null);
  const [pin, setPin] = useState("");
  const [loginError, setLoginError] = useState("");
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [monthData, setMonthData] = useState<HisabMonthData | null>(null);
  const [storage, setStorage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [kind, setKind] = useState<HisabKind>("sale");

  const { year, month } = monthFromDate(selectedDate);

  const loadMonth = useCallback(async () => {
    setLoading(true);
    setFormError("");
    try {
      const res = await fetch(`/api/hisab/month?year=${year}&month=${month}`, {
        credentials: "include",
      });
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (!res.ok) {
        setFormError(await apiErrorMessage(res, "Could not load ledger."));
        return;
      }
      const json = (await res.json()) as {
        data: HisabMonthData;
        storage: string;
      };
      setMonthData(json.data);
      setStorage(json.storage);
      setAuthed(true);
    } catch {
      setFormError("Could not load data. Try again.");
    } finally {
      setLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    void loadMonth();
  }, [loadMonth]);

  const dayEntries = monthData?.days[selectedDate] ?? [];
  const daySummary = useMemo(() => summarizeDay(selectedDate, dayEntries), [selectedDate, dayEntries]);
  const dayClosed = Boolean(monthData?.dayDone?.[selectedDate]);
  const dayDoneAt = monthData?.dayDone?.[selectedDate];

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/hisab/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ pin, role: "staff" }),
    });
    if (!res.ok) {
      const j = (await res.json()) as { error?: string };
      setLoginError(j.error ?? "Login failed.");
      return;
    }
    setPin("");
    setAuthed(true);
    await loadMonth();
  }

  async function handleLogout() {
    await fetch("/api/hisab/logout", { method: "POST", credentials: "include" });
    setAuthed(false);
    setMonthData(null);
  }

  async function addEntry(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    const res = await fetch("/api/hisab/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        date: selectedDate,
        note,
        amount: Number(amount),
        kind,
      }),
    });
    if (!res.ok) {
      setFormError(await apiErrorMessage(res, "Could not save."));
      return;
    }
    setAmount("");
    setNote("");
    await loadMonth();
  }

  async function removeEntry(id: string) {
    if (!confirm("Remove this line?")) return;
    const res = await fetch("/api/hisab/entry", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date: selectedDate, id }),
    });
    if (!res.ok) {
      setFormError(await apiErrorMessage(res, "Could not remove."));
      return;
    }
    await loadMonth();
  }

  async function setDayStatus(done: boolean) {
    setFormError("");
    const res = await fetch("/api/hisab/day-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ date: selectedDate, done }),
    });
    if (!res.ok) {
      setFormError(await apiErrorMessage(res, "Could not update day."));
      return;
    }
    await loadMonth();
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
          className="relative w-full max-w-sm rounded-2xl border border-maroon/15 bg-white p-6 shadow-lg"
        >
          <h1 className="heading-serif mb-1 text-2xl font-semibold text-maroon-deep">
            Daily Hisab
          </h1>
          <p className="mb-6 text-sm text-charcoal/65">
            Team PIN for daily entry only. Month and year totals are not shown here.
          </p>
          <input
            type="text"
            name="username"
            autoComplete="username"
            value="hisab-staff"
            readOnly
            tabIndex={-1}
            aria-hidden
            className="pointer-events-none absolute h-0 w-0 opacity-0"
          />
          <label className="mb-2 block text-sm font-medium text-charcoal">PIN</label>
          <input
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            name="password"
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
            Open ledger
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
            <h1 className="heading-serif text-xl font-semibold text-maroon-deep">Daily Hisab</h1>
            <p className="text-xs text-charcoal/55">
              {storage === "blob" ? "Saved on Vercel Blob" : "Local dev file (.data/hisab)"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void handleLogout()}
            className="text-sm font-medium text-maroon underline-offset-2 hover:underline"
          >
            Lock
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 pt-4">
          <>
            <label className="mb-1 block text-sm font-medium text-charcoal">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mb-4 w-full rounded-xl border border-maroon/20 px-3 py-2"
            />

            {dayClosed && (
              <div className="mb-4 rounded-2xl border border-green-natural/30 bg-green-natural/15 px-4 py-3">
                <p className="text-center font-semibold text-green-natural">
                  ✓ This day&apos;s hisab is done
                </p>
                {dayDoneAt && (
                  <p className="mt-1 text-center text-xs text-charcoal/55">
                    Marked{" "}
                    {new Date(dayDoneAt).toLocaleString("en-PK", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => void setDayStatus(false)}
                  className="mt-3 w-full rounded-xl border border-maroon/25 bg-white py-2.5 text-sm font-semibold text-maroon"
                >
                  Re-open to edit
                </button>
              </div>
            )}

            <div
              className={`mb-4 rounded-2xl px-4 py-3 text-center ${
                daySummary.net >= 0 ? "bg-green-natural/10" : "bg-red-500/10"
              }`}
            >
              <p className="text-xs uppercase tracking-wide text-charcoal/60">Net for this day</p>
              <p className="text-2xl font-bold text-maroon-deep">PKR {formatPkr(daySummary.net)}</p>
              <p className="mt-1 text-xs text-charcoal/65">
                Sales {formatPkr(daySummary.sales)} · Expenses {formatPkr(daySummary.expenses)}
              </p>
            </div>

            {!dayClosed && (
            <form onSubmit={addEntry} className="mb-6 rounded-2xl border border-maroon/10 bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-maroon">Add a line</p>
              <div className="mb-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setKind("sale")}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold ${
                    kind === "sale" ? "bg-green-natural text-white" : "bg-blush"
                  }`}
                >
                  + Sale
                </button>
                <button
                  type="button"
                  onClick={() => setKind("expense")}
                  className={`flex-1 rounded-xl py-2 text-sm font-bold ${
                    kind === "expense" ? "bg-red-600 text-white" : "bg-blush"
                  }`}
                >
                  − Expense
                </button>
              </div>
              <input
                type="number"
                min={1}
                step={1}
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount (PKR)"
                className="mb-2 w-full rounded-xl border border-maroon/20 px-3 py-3 text-lg"
              />
              <input
                type="text"
                required
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. pink bouquet, flower bill Hanif, lunch"
                className="mb-3 w-full rounded-xl border border-maroon/20 px-3 py-3"
              />
              {formError && <p className="mb-2 text-sm text-red-700">{formError}</p>}
              <button type="submit" className="w-full rounded-xl bg-maroon py-3 font-semibold text-white">
                Add line
              </button>
            </form>
            )}

            {formError && dayClosed && (
              <p className="mb-4 text-sm text-red-700">{formError}</p>
            )}

            <ul className="space-y-2">
              {dayEntries.length === 0 && (
                <li className="rounded-xl bg-blush/60 px-4 py-6 text-center text-sm text-charcoal/60">
                  No lines yet for this date.
                </li>
              )}
              {dayEntries.map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center gap-3 rounded-xl border border-maroon/8 bg-white px-3 py-3"
                >
                  <span
                    className={`shrink-0 text-lg font-bold ${
                      entry.kind === "sale" ? "text-green-natural" : "text-red-600"
                    }`}
                  >
                    {entry.kind === "sale" ? "+" : "−"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-charcoal">{entry.note}</p>
                    <p className="text-sm text-charcoal/55">PKR {formatPkr(entry.amount)}</p>
                  </div>
                  <p className="shrink-0 font-semibold text-maroon">
                    {formatPkr(signedAmount(entry))}
                  </p>
                  {!dayClosed && (
                    <button
                      type="button"
                      onClick={() => void removeEntry(entry.id)}
                      className="shrink-0 text-xs text-charcoal/45 hover:text-red-600"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {!dayClosed && dayEntries.length > 0 && (
              <button
                type="button"
                onClick={() => void setDayStatus(true)}
                className="mt-6 w-full rounded-xl border-2 border-green-natural bg-green-natural py-3.5 text-base font-bold text-white shadow-sm"
              >
                Done for this day
              </button>
            )}
          </>
      </main>
    </div>
  );
}
