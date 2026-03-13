import { getDb, saveDb } from "@/lib/data-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const db = getDb();
  return NextResponse.json(db.menu);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();
    
    const newItem = {
      ...body,
      id: body.id || Math.random().toString(36).substr(2, 9)
    };
    
    db.menu.push(newItem);
    saveDb(db);
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const db = getDb();
    
    const index = db.menu.findIndex(item => item.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    
    db.menu[index] = { ...db.menu[index], ...body };
    saveDb(db);
    return NextResponse.json(db.menu[index]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }
    
    const db = getDb();
    db.menu = db.menu.filter(item => item.id !== id);
    saveDb(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 });
  }
}
