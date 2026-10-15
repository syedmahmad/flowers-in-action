import { NextResponse } from "next/server";
import { isHisabAuthed } from "@/lib/hisab/auth";
import { HisabStorageError, loadMonth, storageMode } from "@/lib/hisab/storage";

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
  if (!(await isHisabAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = parseYearMonth(new URL(request.url).searchParams);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid year or month." }, { status: 400 });
  }

  try {
    const data = await loadMonth(parsed.year, parsed.month);
    return NextResponse.json({
      data,
      storage: storageMode(),
    });
  } catch (err) {
    const message =
      err instanceof HisabStorageError ? err.message : "Could not load ledger data.";
    console.error("[hisab/month GET]", err);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
