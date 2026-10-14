import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { isDayDone } from "@/lib/hisab/calc";
import { isHisabAuthed } from "@/lib/hisab/auth";
import { loadMonth, saveMonth } from "@/lib/hisab/storage";
import type { HisabEntry, HisabKind } from "@/lib/hisab/types";

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

  const parts = parseDateParts(date)!;
  const monthData = await loadMonth(parts.year, parts.month);
  if (isDayDone(monthData, date)) {
    return NextResponse.json(
      { error: "This day is marked done. Tap Re-open to edit." },
      { status: 409 }
    );
  }
  const entry: HisabEntry = {
    id: randomUUID(),
    note,
    amount,
    kind,
    createdAt: new Date().toISOString(),
  };

  const list = monthData.days[date] ?? [];
  monthData.days[date] = [entry, ...list];
  await saveMonth(monthData);

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

  await saveMonth(monthData);
  return NextResponse.json({ ok: true });
}
