import { NextResponse } from "next/server";
import { isHisabAuthed, isHisabOwnerAuthed, isHisabStaffAuthed } from "@/lib/hisab/auth";
import { todayIsoPakistan } from "@/lib/hisab/date";
import { filterMonthDataForStaff } from "@/lib/hisab/staff-scope";
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
    const owner = await isHisabOwnerAuthed();
    const staff = await isHisabStaffAuthed();
    const today = todayIsoPakistan();
    let data = await loadMonth(parsed.year, parsed.month);
    const staffOnly = staff && !owner;
    if (staffOnly) {
      data = filterMonthDataForStaff(data, today);
    }
    return NextResponse.json(
      {
        data,
        storage: storageMode(),
        role: owner ? "owner" : "staff",
        today,
        staffTodayOnly: staffOnly,
      },
      {
        headers: {
          "Cache-Control": "private, no-store, max-age=0, must-revalidate",
        },
      }
    );
  } catch (err) {
    const message =
      err instanceof HisabStorageError ? err.message : "Could not load ledger data.";
    console.error("[hisab/month GET]", err);
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
