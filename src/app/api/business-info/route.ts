import { getDb, saveDb } from "@/lib/data-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.business);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();
    
    db.business = {
      ...db.business,
      ...body
    };
    
    saveDb(db);
    return NextResponse.json(db.business);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update business info" }, { status: 500 });
  }
}
