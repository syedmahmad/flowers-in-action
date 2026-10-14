import { NextResponse } from "next/server";
import { isDayDone } from "@/lib/hisab/calc";
import { isHisabAuthed } from "@/lib/hisab/auth";
import { loadMonth, saveMonth } from "@/lib/hisab/storage";

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

  const body = (await request.json()) as { date?: string; done?: boolean };
  const date = body.date?.trim() ?? "";
  const parts = parseDateParts(date);
  if (!parts) {
    return NextResponse.json({ error: "Invalid date." }, { status: 400 });
  }
  if (typeof body.done !== "boolean") {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const monthData = await loadMonth(parts.year, parts.month);
  if (!monthData.dayDone) monthData.dayDone = {};

  const entries = monthData.days[date] ?? [];

  if (body.done) {
    if (entries.length === 0) {
      return NextResponse.json(
        { error: "Add at least one line before marking this day done." },
        { status: 400 }
      );
    }
    monthData.dayDone[date] = new Date().toISOString();
  } else {
    delete monthData.dayDone[date];
  }

  await saveMonth(monthData);

  return NextResponse.json({
    done: isDayDone(monthData, date),
    doneAt: monthData.dayDone[date] ?? null,
  });
}
