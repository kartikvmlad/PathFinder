import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get("profileId")
    if (!profileId) {
      return NextResponse.json({ error: "profileId is required" }, { status: 400 })
    }

    // Load profile (if exists)
    let profile: any = null
    try {
      const row = await prisma.profile.findUnique({ where: { id: profileId } })
      if (row) {
        profile = {
          academics: row.academics,
          interests: JSON.parse(row.interests || "[]"),
          personality: JSON.parse(row.personality || "{}"),
          workPreferences: JSON.parse(row.workPreferences || "{}"),
          values: JSON.parse(row.values || "[]"),
        }
      }
    } catch {}

    // Base careers list
    let careers = [
      {
        id: "1",
        title: "Software Engineer",
        description:
          "Design, develop, and maintain software applications and systems. Work with various programming languages and frameworks to create innovative solutions.",
        matchScore: 92,
        averageSalary: "₹8-15 LPA",
        growthRate: "+22%",
        requiredSkills: ["JavaScript", "Python", "React", "Node.js", "SQL"],
        workEnvironment: "Hybrid",
        category: "Technology",
      },
      {
        id: "2",
        title: "Data Scientist",
        description:
          "Analyze complex data to extract insights and build predictive models. Use statistical methods and machine learning to solve business problems.",
        matchScore: 86,
        averageSalary: "₹10-20 LPA",
        growthRate: "+31%",
        requiredSkills: ["Python", "R", "Machine Learning", "Statistics", "SQL"],
        workEnvironment: "Remote",
        category: "Technology",
      },
      {
        id: "3",
        title: "UX Designer",
        description:
          "Create user-centered designs for digital products. Research user needs, design interfaces, and test usability to improve user experiences.",
        matchScore: 81,
        averageSalary: "₹6-12 LPA",
        growthRate: "+18%",
        requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems", "HTML/CSS"],
        workEnvironment: "Hybrid",
        category: "Design",
      },
    ] as any[]

    // Naive personalization: if interests include healthcare, boost non-tech example or add one
    if (profile && Array.isArray(profile.interests)) {
      const interestText = profile.interests.join(" ").toLowerCase()
      if (interestText.includes("health") || interestText.includes("medicine")) {
        careers = [
          {
            id: "7",
            title: "Healthcare Data Analyst",
            description:
              "Analyze healthcare datasets to improve patient outcomes and hospital efficiency. Combine data skills with domain knowledge.",
            matchScore: 90,
            averageSalary: "₹6-12 LPA",
            growthRate: "+20%",
            requiredSkills: ["SQL", "Python", "Statistics", "Healthcare Domain"],
            workEnvironment: "Office",
            category: "Healthcare",
          },
          ...careers,
        ]
      }
      if (interestText.includes("design") || interestText.includes("art")) {
        // Nudge design roles upward by +5 match
        careers = careers.map((c) =>
          c.category === "Design" ? { ...c, matchScore: Math.min(100, (c.matchScore || 0) + 5) } : c,
        )
      }
    }

    return NextResponse.json({ careers })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


