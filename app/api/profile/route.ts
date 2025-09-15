import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // Simple validation
    if (!body || typeof body.academics !== "string") {
      return NextResponse.json({ error: "Invalid profile payload" }, { status: 400 })
    }
    // Create a pseudo profileId
    const created = await prisma.profile.create({
      data: {
        academics: body.academics,
        interests: JSON.stringify(body.interests ?? []),
        personality: JSON.stringify(body.personality ?? {}),
        workPreferences: JSON.stringify(body.workPreferences ?? {}),
        values: JSON.stringify(body.values ?? []),
      },
      select: { id: true, savedAt: true },
    })
    return NextResponse.json({ profileId: created.id, savedAt: created.savedAt.toISOString() })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


