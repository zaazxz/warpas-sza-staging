import { getDb, saveDb } from "@/lib/data-service";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_THEME } from "@/types";

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.theme ?? DEFAULT_THEME);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();
    db.theme = { ...DEFAULT_THEME, ...body };
    saveDb(db);
    return NextResponse.json(db.theme);
  } catch {
    return NextResponse.json({ error: "Failed to update theme" }, { status: 500 });
  }
}
