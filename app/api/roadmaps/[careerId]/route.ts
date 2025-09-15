import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(request: Request, { params }: { params: { careerId: string } }) {
  try {
    const { careerId } = params
    if (!careerId) {
      return NextResponse.json({ error: "careerId is required" }, { status: 400 })
    }
    const { searchParams } = new URL(request.url)
    const profileId = searchParams.get("profileId")

    // Load profile if available
    let profile: any = null
    if (profileId) {
      try {
        const p = path.join(process.cwd(), "data", "profiles", `${profileId}.json`)
        const buf = await fs.readFile(p, "utf-8")
        profile = JSON.parse(buf)
      } catch {}
    }

    // Return a static roadmap similar to SAMPLE_ROADMAP for now
    const roadmap = {
      id: careerId,
      title: careerId === "1" ? "Software Engineer" : "Career Roadmap",
      description:
        "A comprehensive path to succeed in this career, covering fundamentals, tools, and real projects.",
      totalDuration: "12-18 months",
      difficulty: (profile?.personality?.conscientiousness ?? 50) > 70 ? ("Advanced" as const) : ("Intermediate" as const),
      averageSalary: "₹8-15 LPA",
      jobGrowth: "+22%",
      workEnvironment: "Hybrid",
      skillGaps: (() => {
        const gaps = ["React.js", "System Design", "Cloud Platforms"]
        const interests: string[] = Array.isArray(profile?.interests) ? profile.interests : []
        const interestText = interests.join(" ").toLowerCase()
        if (interestText.includes("design")) {
          gaps.unshift("Design Systems")
        }
        if (interestText.includes("health")) {
          gaps.unshift("Healthcare Domain Basics")
        }
        return gaps
      })(),
      steps: [
        {
          id: "1",
          title: "Foundations",
          description: "Learn programming basics and problem solving.",
          duration: "2-3 months",
          status: "completed" as const,
          skills: ["JavaScript", "Python", "Data Structures", "Algorithms"],
          resources: [
            { title: "JavaScript Basics", type: "course", url: "#", provider: "Udemy", duration: "20h", cost: "₹999" },
            { title: "LeetCode Practice", type: "project", url: "#", provider: "LeetCode", duration: "Ongoing", cost: "Free" },
          ],
        },
        {
          id: "2",
          title: "Frontend Framework",
          description: "Build modern UIs with React.",
          duration: "2-3 months",
          status: "current" as const,
          skills: ["React", "JSX", "State Management"],
          resources: [
            { title: "React Guide", type: "course", url: "#", provider: "Udemy", duration: "40h", cost: "₹1,799" },
            { title: "React Docs", type: "book", url: "#", provider: "React", duration: "Reference", cost: "Free" },
          ],
        },
        {
          id: "3",
          title: "Backend & Projects",
          description: "Learn Node.js and ship full-stack projects.",
          duration: "3-4 months",
          status: "upcoming" as const,
          skills: (() => {
            const base = ["Node.js", "APIs", "Databases", "Deployment"]
            if (profile?.workPreferences?.environment === "lab") base.push("Data Pipelines")
            if (profile?.workPreferences?.environment === "remote") base.push("Async Collaboration")
            return base
          })(),
          resources: [
            { title: "Node.js Course", type: "course", url: "#", provider: "Udemy", duration: "30h", cost: "₹1,299" },
            { title: "Deploy on Vercel", type: "project", url: "#", provider: "Vercel", duration: "1w", cost: "Free" },
          ],
        },
      ],
      marketInsights: {
        demandLevel: "High" as const,
        trendingSkills: ["React", "TypeScript", "Cloud Computing", "DevOps"],
        topCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"],
        averageExperience: "2-3 years to mid-level",
      },
    }

    return NextResponse.json(roadmap)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json({ error: message }, { status: 500 })
  }
}


