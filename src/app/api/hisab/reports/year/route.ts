import { NextResponse } from "next/server";
import { isHisabOwnerAuthed } from "@/lib/hisab/auth";
import { summarizeYear } from "@/lib/hisab/calc";
import { loadMonth } from "@/lib/hisab/storage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isHisabOwnerAuthed())) {
    return NextResponse.json({ error: "Owner access required." }, { status: 403 });
  }

  const year = Number(new URL(request.url).searchParams.get("year"));
  if (!Number.isInteger(year) || year < 2000 || year > 2100) {
    return NextResponse.json({ error: "Invalid year." }, { status: 400 });
  }

  const monthDataList = await Promise.all(
    Array.from({ length: 12 }, (_, i) => loadMonth(year, i + 1))
  );
  const summary = summarizeYear(year, monthDataList);

  return NextResponse.json({ summary });
}
