import { NextResponse } from "next/server";
import { isHisabOwnerAuthed } from "@/lib/hisab/auth";
import { summarizeMonth } from "@/lib/hisab/calc";
import { loadMonth, storageMode } from "@/lib/hisab/storage";

export const dynamic = "force-dynamic";

function parseYearMonth(searchParams: URLSearchParams): { year: number; month: number } | null {
  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month"));
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    return null;
  }
  return { year, month };
}

export async function GET(request: Request) {
  if (!(await isHisabOwnerAuthed())) {
    return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  }

  const parsed = parseYearMonth(new URL(request.url).searchParams);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid year or month." }, { status: 400 });
  }

  const data = await loadMonth(parsed.year, parsed.month);
  const summary = summarizeMonth(data);

  return NextResponse.json({
    data,
    summary,
    storage: storageMode(),
  });
}
