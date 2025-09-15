"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Target, Search, TrendingUp, DollarSign, Users, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface Career {
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

const SAMPLE_CAREERS: Career[] = []

export default function CareerMatchesPage() {
  const router = useRouter()
  const [careers, setCareers] = useState<Career[]>(SAMPLE_CAREERS)
  const [filteredCareers, setFilteredCareers] = useState<Career[]>(SAMPLE_CAREERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("match")
  const [filterCategory, setFilterCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCareers() {
      try {
        setLoading(true)
        const profileId = typeof window !== "undefined" ? localStorage.getItem("profileId") : null
        const { getMatches } = await import("@/lib/api")
        const res = await getMatches(profileId || "demo")
        setCareers(res.careers)
        setFilteredCareers(res.careers)
      } catch (e) {
        setError("Failed to load matches. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchCareers()
  }, [])

  useEffect(() => {
    let filtered = careers.filter(
      (career) =>
        career.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        career.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    if (filterCategory !== "all") {
      filtered = filtered.filter((career) => career.category === filterCategory)
    }

    // Sort careers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "match":
          return b.matchScore - a.matchScore
        case "salary":
          // Simple salary comparison based on the first number
          const salaryA = Number.parseInt(a.averageSalary.match(/\d+/)?.[0] || "0")
          const salaryB = Number.parseInt(b.averageSalary.match(/\d+/)?.[0] || "0")
          return salaryB - salaryA
        case "growth":
          const growthA = Number.parseInt(a.growthRate.replace("%", "").replace("+", ""))
          const growthB = Number.parseInt(b.growthRate.replace("%", "").replace("+", ""))
          return growthB - growthA
        case "title":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    setFilteredCareers(filtered)
  }, [searchTerm, sortBy, filterCategory, careers])

  const handleViewRoadmap = (careerId: string) => {
    router.push(`/career-roadmap/${careerId}`)
  }

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500"
    if (score >= 80) return "bg-blue-500"
    if (score >= 70) return "bg-yellow-500"
    return "bg-gray-500"
  }

  const categories = ["all", ...Array.from(new Set(careers.map((c) => c.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Navigator</span>
            </div>
            <Button variant="outline" onClick={() => router.push("/")}>
              Home
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">Loading your matches...</h3>
            <p className="text-muted-foreground">Please wait a moment.</p>
          </div>
        )}

        {error && (
          <div className="text-center py-6 mb-6 border border-red-200 bg-red-50 rounded">
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">Your Career Matches</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your profile, we've found careers that align with your interests, skills, and values. Explore each
            option to learn more about the path ahead.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Match Score</SelectItem>
              <SelectItem value="salary">Salary</SelectItem>
              <SelectItem value="growth">Growth Rate</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Career Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCareers.map((career) => (
            <Card
              key={career.id}
              className="border-2 hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{career.title}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {career.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col items-end">
                    <div
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getMatchScoreColor(career.matchScore)}`}
                    >
                      {career.matchScore}% Match
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{career.description}</p>

                {/* Key Stats */}
                <div className="grid grid-cols-2 gap-4 py-3 border-t border-b">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Avg. Salary</p>
                      <p className="text-sm font-semibold">{career.averageSalary}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="text-xs text-muted-foreground">Growth Rate</p>
                      <p className="text-sm font-semibold text-green-600">{career.growthRate}</p>
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div>
                  <p className="text-sm font-medium mb-2">Key Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {career.requiredSkills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {career.requiredSkills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{career.requiredSkills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Work Environment */}
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{career.workEnvironment} Work</span>
                </div>

                {/* Action Button */}
                <Button onClick={() => handleViewRoadmap(career.id)} className="w-full mt-4">
                  View Roadmap
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No careers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or filters to find more career options.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Need more personalized guidance?</h3>
          <p className="text-muted-foreground mb-4">
            Our AI can provide even more detailed recommendations based on your specific situation.
          </p>
          <Button variant="outline">Get Personalized Advice</Button>
        </div>
      </div>
    </div>
  )
}
