import fs from "fs/promises";
import path from "path";
import { head, put } from "@vercel/blob";
import type { HisabMonthData } from "./types";

function blobPath(year: number, month: number): string {
  return `hisab/${year}-${String(month).padStart(2, "0")}.json`;
}

function localPath(year: number, month: number): string {
  return path.join(process.cwd(), ".data", "hisab", `${year}-${String(month).padStart(2, "0")}.json`);
}

function emptyMonth(year: number, month: number): HisabMonthData {
  return {
    version: 1,
    year,
    month,
    days: {},
    dayDone: {},
    updatedAt: new Date().toISOString(),
  };
}

function useBlob(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readLocal(year: number, month: number): Promise<HisabMonthData> {
  const file = localPath(year, month);
  try {
    const raw = await fs.readFile(file, "utf8");
    return JSON.parse(raw) as HisabMonthData;
  } catch {
    return emptyMonth(year, month);
  }
}

async function writeLocal(data: HisabMonthData): Promise<void> {
  const file = localPath(data.year, data.month);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf8");
}

async function readBlob(year: number, month: number): Promise<HisabMonthData> {
  const pathname = blobPath(year, month);
  try {
    const meta = await head(pathname);
    const res = await fetch(meta.url);
    if (!res.ok) return emptyMonth(year, month);
    return (await res.json()) as HisabMonthData;
  } catch {
    return emptyMonth(year, month);
  }
}

async function writeBlob(data: HisabMonthData): Promise<void> {
  const pathname = blobPath(data.year, data.month);
  await put(pathname, JSON.stringify(data), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export async function loadMonth(year: number, month: number): Promise<HisabMonthData> {
  if (useBlob()) return readBlob(year, month);
  return readLocal(year, month);
}

export async function saveMonth(data: HisabMonthData): Promise<void> {
  const next = { ...data, updatedAt: new Date().toISOString() };
  if (useBlob()) await writeBlob(next);
  else await writeLocal(next);
}

export function storageMode(): "blob" | "local" {
  return useBlob() ? "blob" : "local";
}
