import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isDayDone } from "@/lib/hisab/calc";
import { isHisabAuthed, isHisabOwnerAuthed, isHisabStaffAuthed } from "@/lib/hisab/auth";
import { assertStaffMayEditDate } from "@/lib/hisab/staff-scope";
import { HisabStorageError, loadMonth, saveMonth } from "@/lib/hisab/storage";
import type { HisabEntry, HisabKind, HisabReceivedVia } from "@/lib/hisab/types";

export const dynamic = "force-dynamic";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function parseDateParts(date: string): { year: number; month: number } | null {
  if (!DATE_RE.test(date)) return null;
  const [y, m] = date.split("-").map(Number);
  if (!y || !m || m < 1 || m > 12) return null;
  return { year: y, month: m };
}

export async function POST(request: Request) {
  if (!(await isHisabAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    date?: string;
    note?: string;
    amount?: number;
    kind?: HisabKind;
    receivedVia?: HisabReceivedVia;
  };

  const date = body.date?.trim() ?? "";
  const note = body.note?.trim() ?? "";
  const amount = Math.round(Number(body.amount));
  const kind = body.kind;

  if (!parseDateParts(date)) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }
  if (!note) {
    return NextResponse.json({ error: "Add a short description." }, { status: 400 });
  }
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ error: "Amount must be greater than zero." }, { status: 400 });
  }
  if (kind !== "sale" && kind !== "expense") {
    return NextResponse.json({ error: "Choose sale or expense." }, { status: 400 });
  }

  const staffOnly = (await isHisabStaffAuthed()) && !(await isHisabOwnerAuthed());
  const gate = await assertStaffMayEditDate(date, staffOnly);
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: 403 });
  }

  const parts = parseDateParts(date)!;
  const monthData = await loadMonth(parts.year, parts.month);
  if (isDayDone(monthData, date)) {
    return NextResponse.json(
      { error: "This day is marked done. Tap Re-open to edit." },
      { status: 409 }
    );
  }
  let receivedVia: HisabReceivedVia | undefined;
  if (kind === "sale") {
    receivedVia = body.receivedVia === "online" ? "online" : "cash";
  }

  const entry: HisabEntry = {
    id: randomUUID(),
    note,
    amount,
    kind,
    ...(receivedVia ? { receivedVia } : {}),
    createdAt: new Date().toISOString(),
  };

  const list = monthData.days[date] ?? [];
  monthData.days[date] = [entry, ...list];
  try {
    await saveMonth(monthData);
  } catch (err) {
    const message =
      err instanceof HisabStorageError ? err.message : "Could not save ledger data.";
    console.error("[hisab/entry POST]", err);
    return NextResponse.json({ error: message }, { status: 503 });
  }

  return NextResponse.json({ entry });
}

export async function DELETE(request: Request) {
  if (!(await isHisabAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { date?: string; id?: string };
  const date = body.date?.trim() ?? "";
  const id = body.id?.trim() ?? "";
  const parts = parseDateParts(date);

  if (!parts || !id) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const staffOnly = (await isHisabStaffAuthed()) && !(await isHisabOwnerAuthed());
  const gate = await assertStaffMayEditDate(date, staffOnly);
  if (!gate.ok) {
    return NextResponse.json({ error: gate.error }, { status: 403 });
  }

  const monthData = await loadMonth(parts.year, parts.month);
  if (isDayDone(monthData, date)) {
    return NextResponse.json(
      { error: "This day is marked done. Tap Re-open to edit." },
      { status: 409 }
    );
  }
  const list = monthData.days[date] ?? [];
  const next = list.filter((e) => e.id !== id);
  if (next.length === list.length) {
    return NextResponse.json({ error: "Entry not found." }, { status: 404 });
  }

  if (next.length === 0) {
    delete monthData.days[date];
    if (monthData.dayDone) delete monthData.dayDone[date];
  } else monthData.days[date] = next;

  try {
    await saveMonth(monthData);
  } catch (err) {
    const message =
      err instanceof HisabStorageError ? err.message : "Could not save ledger data.";
    console.error("[hisab/entry DELETE]", err);
    return NextResponse.json({ error: message }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
