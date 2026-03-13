import { NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getDb, saveDb } from "@/lib/data-service"

export async function POST(request: NextRequest) {
  try {
    const { current, new: newPass } = await request.json()

    if (!current || !newPass) {
      return NextResponse.json(
        { error: "Semua field harus diisi" },
        { status: 400 }
      )
    }

    const db = getDb()
    const isPasswordCorrect = await bcrypt.compare(current, db.user.passwordHash)

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: "Password saat ini salah" },
        { status: 401 }
      )
    }

    const salt = bcrypt.genSaltSync(10)
    db.user.passwordHash = bcrypt.hashSync(newPass, salt)
    
    saveDb(db)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Change password error:", error)
    return NextResponse.json(
      { error: "Gagal mengubah password" },
      { status: 500 }
    )
  }
}
