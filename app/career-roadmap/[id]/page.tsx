"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  ArrowLeft,
  CheckCircle,
  Circle,
  Clock,
  BookOpen,
  TrendingUp,
  DollarSign,
  Users,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"

interface RoadmapStep {
  id: string
  title: string
  description: string
  duration: string
  status: "completed" | "current" | "upcoming"
  skills: string[]
  resources: {
    title: string
    type: "course" | "book" | "certification" | "project"
    url: string
    provider: string
    duration: string
    cost: string
  }[]
}

interface CareerRoadmap {
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

const SAMPLE_ROADMAP: CareerRoadmap = {
  id: "1",
  title: "Software Engineer",
  description:
    "A comprehensive path to becoming a skilled software engineer, covering programming fundamentals, web development, and industry best practices.",
  totalDuration: "12-18 months",
  difficulty: "Intermediate",
  averageSalary: "₹8-15 LPA",
  jobGrowth: "+22%",
  workEnvironment: "Hybrid",
  skillGaps: ["React.js", "System Design", "Cloud Platforms"],
  steps: [
    {
      id: "1",
      title: "Programming Fundamentals",
      description:
        "Master the basics of programming with JavaScript and Python. Learn data structures, algorithms, and problem-solving techniques.",
      duration: "2-3 months",
      status: "completed",
      skills: ["JavaScript", "Python", "Data Structures", "Algorithms"],
      resources: [
        {
          title: "JavaScript: The Complete Guide",
          type: "course",
          url: "#",
          provider: "Udemy",
          duration: "52 hours",
          cost: "₹1,299",
        },
        {
          title: "Python for Everybody",
          type: "course",
          url: "#",
          provider: "Coursera",
          duration: "8 weeks",
          cost: "Free",
        },
        {
          title: "LeetCode Practice",
          type: "project",
          url: "#",
          provider: "LeetCode",
          duration: "Ongoing",
          cost: "Free",
        },
      ],
    },
    {
      id: "2",
      title: "Web Development Basics",
      description:
        "Learn HTML, CSS, and responsive design. Build your first interactive websites and understand web fundamentals.",
      duration: "1-2 months",
      status: "completed",
      skills: ["HTML", "CSS", "Responsive Design", "Git"],
      resources: [
        {
          title: "The Complete Web Developer Course",
          type: "course",
          url: "#",
          provider: "Udemy",
          duration: "30 hours",
          cost: "₹1,599",
        },
        {
          title: "MDN Web Docs",
          type: "book",
          url: "#",
          provider: "Mozilla",
          duration: "Reference",
          cost: "Free",
        },
      ],
    },
    {
      id: "3",
      title: "Frontend Framework (React)",
      description:
        "Master React.js to build modern, interactive user interfaces. Learn component-based architecture and state management.",
      duration: "2-3 months",
      status: "current",
      skills: ["React.js", "JSX", "State Management", "Component Design"],
      resources: [
        {
          title: "React - The Complete Guide",
          type: "course",
          url: "#",
          provider: "Udemy",
          duration: "48 hours",
          cost: "₹1,799",
        },
        {
          title: "React Official Documentation",
          type: "book",
          url: "#",
          provider: "React Team",
          duration: "Reference",
          cost: "Free",
        },
        {
          title: "Build a Portfolio Website",
          type: "project",
          url: "#",
          provider: "Self-guided",
          duration: "2 weeks",
          cost: "Free",
        },
      ],
    },
    {
      id: "4",
      title: "Backend Development",
      description:
        "Learn server-side development with Node.js and Express. Understand databases, APIs, and server architecture.",
      duration: "2-3 months",
      status: "upcoming",
      skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      resources: [
        {
          title: "Node.js Developer Course",
          type: "course",
          url: "#",
          provider: "Udemy",
          duration: "35 hours",
          cost: "₹1,499",
        },
        {
          title: "MongoDB University",
          type: "certification",
          url: "#",
          provider: "MongoDB",
          duration: "6 weeks",
          cost: "Free",
        },
      ],
    },
    {
      id: "5",
      title: "Full-Stack Projects",
      description:
        "Build complete applications combining frontend and backend. Create a portfolio showcasing your skills.",
      duration: "2-3 months",
      status: "upcoming",
      skills: ["Full-Stack Development", "Project Management", "Deployment"],
      resources: [
        {
          title: "Full-Stack Web Development",
          type: "course",
          url: "#",
          provider: "Coursera",
          duration: "12 weeks",
          cost: "₹3,999",
        },
        {
          title: "Deploy on Vercel/Netlify",
          type: "project",
          url: "#",
          provider: "Self-guided",
          duration: "1 week",
          cost: "Free",
        },
      ],
    },
    {
      id: "6",
      title: "Advanced Topics & Job Prep",
      description:
        "Learn system design, testing, and prepare for technical interviews. Build professional network and apply for positions.",
      duration: "2-3 months",
      status: "upcoming",
      skills: ["System Design", "Testing", "Interview Skills", "Networking"],
      resources: [
        {
          title: "System Design Interview",
          type: "book",
          url: "#",
          provider: "Alex Xu",
          duration: "4 weeks",
          cost: "₹2,499",
        },
        {
          title: "Mock Interviews",
          type: "project",
          url: "#",
          provider: "Pramp",
          duration: "Ongoing",
          cost: "Free",
        },
      ],
    },
  ],
  marketInsights: {
    demandLevel: "High",
    trendingSkills: ["React", "TypeScript", "Cloud Computing", "DevOps"],
    topCompanies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"],
    averageExperience: "2-3 years to mid-level",
  },
}

export default function CareerRoadmapPage() {
  const router = useRouter()
  const params = useParams()
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null)
  const [activeTab, setActiveTab] = useState("roadmap")

  useEffect(() => {
    // In a real app, fetch roadmap data based on params.id
    setRoadmap(SAMPLE_ROADMAP)
  }, [params.id])

  if (!roadmap) {
    return <div>Loading...</div>
  }

  const completedSteps = roadmap.steps.filter((step) => step.status === "completed").length
  const progressPercentage = (completedSteps / roadmap.steps.length) * 100

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />
      case "current":
        return <Circle className="w-6 h-6 text-blue-500 fill-blue-500" />
      default:
        return <Circle className="w-6 h-6 text-gray-300" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <BookOpen className="w-4 h-4" />
      case "certification":
        return <Target className="w-4 h-4" />
      case "project":
        return <Users className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

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
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Career Overview */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-4">{roadmap.title} Roadmap</h1>
              <p className="text-lg text-muted-foreground mb-6">{roadmap.description}</p>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {completedSteps} of {roadmap.steps.length} steps completed
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Career Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold">{roadmap.totalDuration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Difficulty</p>
                      <Badge className={getDifficultyColor(roadmap.difficulty)}>{roadmap.difficulty}</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Avg. Salary</p>
                        <p className="text-sm font-semibold">{roadmap.averageSalary}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-muted-foreground">Job Growth</p>
                        <p className="text-sm font-semibold text-green-600">{roadmap.jobGrowth}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Skill Gaps Alert */}
        {roadmap.skillGaps.length > 0 && (
          <Card className="mb-8 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Skill Gaps Identified</h3>
                  <p className="text-sm text-yellow-700 mb-3">
                    Based on your profile, focus on these areas to strengthen your candidacy:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.skillGaps.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-yellow-300 text-yellow-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="roadmap">Learning Roadmap</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="insights">Market Insights</TabsTrigger>
          </TabsList>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            {roadmap.steps.map((step, index) => (
              <Card
                key={step.id}
                className={`border-2 ${step.status === "current" ? "border-blue-200 bg-blue-50" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="flex flex-col items-center">
                      {getStepIcon(step.status)}
                      {index < roadmap.steps.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{step.duration}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-2">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Skills */}
                    <div>
                      <p className="text-sm font-medium mb-2">Skills You'll Learn</p>
                      <div className="flex flex-wrap gap-2">
                        {step.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Top Resources */}
                    <div>
                      <p className="text-sm font-medium mb-2">Recommended Resources</p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {step.resources.slice(0, 2).map((resource) => (
                          <div key={resource.title} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                            {getResourceIcon(resource.type)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{resource.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {resource.provider} • {resource.duration} • {resource.cost}
                              </p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-muted-foreground" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            {roadmap.steps.map((step) => (
              <Card key={step.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{step.title} Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {step.resources.map((resource) => (
                      <Card key={resource.title} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-start space-x-3">
                            {getResourceIcon(resource.type)}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{resource.provider}</p>
                              <div className="flex justify-between items-center text-xs">
                                <span className="text-muted-foreground">{resource.duration}</span>
                                <span className="font-medium text-green-600">{resource.cost}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="w-full mt-3 bg-transparent">
                            <ExternalLink className="w-3 h-3 mr-2" />
                            View Resource
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Market Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Market Demand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Demand Level</p>
                      <Badge
                        className={
                          roadmap.marketInsights.demandLevel === "High"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }
                      >
                        {roadmap.marketInsights.demandLevel}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time to Mid-Level</p>
                      <p className="font-semibold">{roadmap.marketInsights.averageExperience}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Trending Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.marketInsights.trendingSkills.map((skill) => (
                      <Badge key={skill} variant="outline" className="border-blue-200 text-blue-800">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Top Hiring Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {roadmap.marketInsights.topCompanies.map((company) => (
                      <div key={company} className="text-center p-3 bg-muted/50 rounded-lg">
                        <p className="font-medium text-sm">{company}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button className="flex-1">Start Learning Path</Button>
          <Button variant="outline" className="flex-1 bg-transparent">
            Download Roadmap PDF
          </Button>
          <Button variant="outline" onClick={() => router.push("/career-matches")}>
            Explore Other Careers
          </Button>
        </div>
      </div>
    </div>
  )
}
