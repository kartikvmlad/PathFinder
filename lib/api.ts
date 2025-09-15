export type ProfileInput = {
  academics: string
  interests: string[]
  personality: {
    openness: number
    conscientiousness: number
    extraversion: number
    agreeableness: number
    neuroticism: number
  }
  workPreferences: {
    environment: string
    schedule: string
    teamSize: string
  }
  values: string[]
}

export type Career = {
  id: string
  title: string
  description: string
  matchScore: number
  averageSalary: string
  growthRate: string
  requiredSkills: string[]
  workEnvironment: string
  category: string
}

export type RoadmapResource = {
  title: string
  type: "course" | "book" | "certification" | "project"
  url: string
  provider: string
  duration: string
  cost: string
}

export type RoadmapStep = {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "upcoming"
  skills: string[]
  resources: RoadmapResource[]
}

export type CareerRoadmap = {
  id: string
  title: string
  description: string
  totalDuration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  averageSalary: string
  jobGrowth: string
  workEnvironment: string
  steps: RoadmapStep[]
  skillGaps: string[]
  marketInsights: {
    demandLevel: "High" | "Medium" | "Low"
    trendingSkills: string[]
    topCompanies: string[]
    averageExperience: string
  }
}

async function http<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`)
  }
  return (await res.json()) as T
}

export async function saveProfile(profile: ProfileInput): Promise<{ profileId: string; savedAt: string }> {
  return http("/api/profile", { method: "POST", body: JSON.stringify(profile) })
}

export async function getMatches(profileId: string): Promise<{ careers: Career[] }> {
  const params = new URLSearchParams({ profileId })
  return http(`/api/matches?${params.toString()}`)
}

export async function getRoadmap(careerId: string, profileId: string): Promise<CareerRoadmap> {
  const params = new URLSearchParams({ profileId })
  return http(`/api/roadmaps/${encodeURIComponent(careerId)}?${params.toString()}`)
}


