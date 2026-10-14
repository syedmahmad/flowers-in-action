import { NextResponse } from "next/server";
import { clearHisabSession } from "@/lib/hisab/auth";

export const dynamic = "force-dynamic";

export async function POST() {
  await clearHisabSession();
  return NextResponse.json({ ok: true });
}
