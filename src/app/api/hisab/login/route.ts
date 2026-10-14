import { NextResponse } from "next/server";
import {
  readHisabOwnerPinFromEnv,
  readHisabPinFromEnv,
  setHisabOwnerSession,
  setHisabStaffSession,
  verifyOwnerPin,
  verifyPin,
} from "@/lib/hisab/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json()) as { pin?: string; role?: string };
  const pin = body.pin?.trim() ?? "";
  const role = body.role === "owner" ? "owner" : "staff";

  if (role === "owner") {
    if (!readHisabOwnerPinFromEnv()) {
      return NextResponse.json(
        {
          error:
            "HISAB_OWNER_PIN is not set. Add HISAB_OWNER_PIN=yourpin to .env.local, then restart npm run dev.",
        },
        { status: 503 }
      );
    }
    if (!verifyOwnerPin(pin)) {
      return NextResponse.json({ error: "Wrong PIN." }, { status: 401 });
    }
    await setHisabOwnerSession();
    return NextResponse.json({ ok: true, role: "owner" });
  }

  if (!readHisabPinFromEnv()) {
    return NextResponse.json(
      {
        error:
          "HISAB_PIN is not set. Add HISAB_PIN=yourpin to .env.local, then restart npm run dev.",
      },
      { status: 503 }
    );
  }

  if (!verifyPin(pin)) {
    return NextResponse.json({ error: "Wrong PIN." }, { status: 401 });
  }

  await setHisabStaffSession();
  return NextResponse.json({ ok: true, role: "staff" });
}
