import crypto from "crypto";
import { cookies } from "next/headers";

const STAFF_COOKIE = "hisab_session";
const OWNER_COOKIE = "hisab_owner_session";
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function normalizePin(value: string): string {
  return value.trim().replace(/^["']|["']$/g, "");
}

function baseSecret(): string {
  return process.env.HISAB_SECRET || process.env.HISAB_PIN || "";
}

function staffSessionToken(): string {
  return crypto.createHmac("sha256", baseSecret()).update("hisab-staff-v1").digest("hex");
}

function ownerSessionToken(): string {
  const ownerPin = readHisabOwnerPinFromEnv();
  const secret = process.env.HISAB_SECRET || ownerPin || process.env.HISAB_PIN || "";
  return crypto.createHmac("sha256", secret).update("hisab-owner-v1").digest("hex");
}

function timingEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

export function readHisabPinFromEnv(): string {
  return normalizePin(process.env.HISAB_PIN ?? "");
}

export function readHisabOwnerPinFromEnv(): string {
  return normalizePin(process.env.HISAB_OWNER_PIN ?? "");
}

export function verifyPin(pin: string): boolean {
  const expected = readHisabPinFromEnv();
  const entered = normalizePin(pin);
  if (!expected || entered.length > 128) return false;
  return timingEqual(entered, expected);
}

export function verifyOwnerPin(pin: string): boolean {
  const expected = readHisabOwnerPinFromEnv();
  const entered = normalizePin(pin);
  if (!expected || entered.length > 128) return false;
  return timingEqual(entered, expected);
}

export async function setHisabStaffSession(): Promise<void> {
  const jar = await cookies();
  jar.set(STAFF_COOKIE, staffSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function setHisabOwnerSession(): Promise<void> {
  const jar = await cookies();
  jar.set(OWNER_COOKIE, ownerSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

/** @deprecated use setHisabStaffSession */
export async function setHisabSession(): Promise<void> {
  await setHisabStaffSession();
}

export async function clearHisabSession(): Promise<void> {
  const jar = await cookies();
  jar.delete(STAFF_COOKIE);
  jar.delete(OWNER_COOKIE);
}

export async function isHisabStaffAuthed(): Promise<boolean> {
  if (!readHisabPinFromEnv()) return false;
  const jar = await cookies();
  const value = jar.get(STAFF_COOKIE)?.value;
  if (!value) return false;
  return timingEqual(value, staffSessionToken());
}

export async function isHisabOwnerAuthed(): Promise<boolean> {
  if (!readHisabOwnerPinFromEnv()) return false;
  const jar = await cookies();
  const value = jar.get(OWNER_COOKIE)?.value;
  if (!value) return false;
  return timingEqual(value, ownerSessionToken());
}

/** Staff or owner — allowed to add/edit day lines */
export async function isHisabAuthed(): Promise<boolean> {
  return (await isHisabStaffAuthed()) || (await isHisabOwnerAuthed());
}
