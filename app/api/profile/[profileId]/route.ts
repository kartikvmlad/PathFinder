import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(_request: Request, { params }: { params: { profileId: string } }) {
  try {
    const { profileId } = params
    if (!profileId) return NextResponse.json({ error: "profileId is required" }, { status: 400 })
    const filePath = path.join(process.cwd(), "data", "profiles", `${profileId}.json`)
    const data = await fs.readFile(filePath, "utf-8")
    return NextResponse.json(JSON.parse(data))
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 404 })
  }
}


