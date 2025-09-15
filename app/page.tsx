"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowRight, ArrowLeft, Star, CheckCircle, BookOpen, Award } from "lucide-react"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type UserData = {
  name: string
  age: string
  academicLevel: string
  problemSolving: string
  subjects: string
  hobbies: string
}

type CareerField = {
  id: string
  title: string
  description: string
  lesson: string
  quiz: {
    question: string
    options: string[]
    correct: number
  }[]
}

const careerFields: CareerField[] = [
  {
    id: "technology",
    title: "Technology & Innovation",
    description: "Build the future with code, apps, and digital solutions that change the world.",
    lesson: `# Welcome to Technology & Innovation!

Technology is everywhere around us - from the apps on your phone to the games you play, and even the smart devices in your home. People in technology careers create, improve, and maintain all these amazing digital tools.

## What do tech professionals do?
- **Software Developers** write code to create apps and websites
- **Data Scientists** analyze information to solve problems
- **Cybersecurity Experts** protect our digital world from hackers
- **UX Designers** make technology easy and fun to use

## Why is technology exciting?
Technology lets you solve real problems and make people's lives better. You could create the next viral app, help doctors save lives with medical software, or even work on space exploration projects!

The best part? Technology is always changing, so you'll never stop learning new things.`,
    quiz: [
      {
        question: "What do software developers primarily do?",
        options: ["Write code to create apps", "Fix computers", "Sell technology", "Teach people about computers"],
        correct: 0,
      },
      {
        question: "Which career focuses on making technology easy to use?",
        options: ["Data Scientist", "UX Designer", "Cybersecurity Expert", "Software Developer"],
        correct: 1,
      },
    ],
  },
  {
    id: "healthcare",
    title: "Healthcare & Medicine",
    description: "Help people stay healthy and save lives through medical care and research.",
    lesson: `# Welcome to Healthcare & Medicine!

Healthcare professionals are real-life heroes who help people feel better, stay healthy, and save lives every day. This field combines science, compassion, and problem-solving to make a difference in people's lives.

## What do healthcare professionals do?
- **Doctors** diagnose and treat patients
- **Nurses** provide care and support to patients
- **Medical Researchers** discover new treatments and cures
- **Physical Therapists** help people recover from injuries

## Why is healthcare rewarding?
Every day, you get to help people and make a real difference in their lives. You might help a child feel better when they're sick, assist someone in walking again after an injury, or even discover a new medicine that helps millions of people.

Healthcare combines science with caring for others - it's perfect if you love learning about how the body works and want to help people.`,
    quiz: [
      {
        question: "What do medical researchers primarily focus on?",
        options: [
          "Treating patients directly",
          "Discovering new treatments",
          "Managing hospitals",
          "Teaching medical students",
        ],
        correct: 1,
      },
      {
        question: "Which healthcare professional helps people recover from injuries?",
        options: ["Doctor", "Nurse", "Physical Therapist", "Medical Researcher"],
        correct: 2,
      },
    ],
  },
  {
    id: "creative",
    title: "Creative Arts & Design",
    description: "Express yourself and inspire others through art, design, and creative storytelling.",
    lesson: `# Welcome to Creative Arts & Design!

Creative professionals use their imagination and artistic skills to create beautiful, meaningful, and inspiring work. They tell stories, design products, and create experiences that touch people's hearts and minds.

## What do creative professionals do?
- **Graphic Designers** create visual designs for brands and products
- **Animators** bring characters and stories to life
- **Writers** craft stories, articles, and scripts
- **Game Designers** create fun and engaging video games

## Why is creativity important?
Creative work makes the world more beautiful and interesting. You could design the characters in the next big animated movie, write a book that inspires millions, or create artwork that hangs in museums.

Creativity lets you express your unique perspective and share it with the world. Plus, creative skills are needed in almost every industry - from advertising to technology to entertainment.`,
    quiz: [
      {
        question: "What do animators primarily create?",
        options: ["Written stories", "Moving characters and scenes", "Music compositions", "Building designs"],
        correct: 1,
      },
      {
        question: "Which creative professional designs fun interactive experiences?",
        options: ["Graphic Designer", "Writer", "Game Designer", "Animator"],
        correct: 2,
      },
    ],
  },
]

export default function PathfinderAI() {
  const [currentScreen, setCurrentScreen] = useState(1)
  const [currentStep, setCurrentStep] = useState(1)
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    academicLevel: "",
    problemSolving: "",
    subjects: "",
    hobbies: "",
  })
  const [selectedField, setSelectedField] = useState<CareerField | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<number[]>([])
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0)
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [showLesson, setShowLesson] = useState(true)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [activeRecommendationTab, setActiveRecommendationTab] = useState(0)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const interestOptions = [
    "🎮 Gaming & Technology",
    "🎨 Art & Design",
    "🔬 Science & Research",
    "💼 Business & Finance",
    "🏥 Healthcare",
    "🎭 Entertainment & Media",
    "🌱 Environment & Nature",
    "🏗️ Engineering & Construction",
    "📚 Education & Teaching",
    "⚖️ Law & Justice",
    "🍳 Culinary Arts",
    "✈️ Travel & Tourism",
  ]

  const subjectOptions = [
    "📊 Mathematics",
    "🔬 Science",
    "📖 English/Literature",
    "🌍 History",
    "🎨 Art",
    "🎵 Music",
    "💻 Computer Science",
    "🏃 Physical Education",
    "🌐 Geography",
    "🗣️ Foreign Languages",
    "🧪 Chemistry",
    "🔬 Biology",
    "⚡ Physics",
    "📈 Economics",
    "🏛️ Civics/Government",
    "🎭 Drama/Theater",
  ]

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) => (prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]))
  }

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) => (prev.includes(subject) ? prev.filter((s) => s !== subject) : [...prev, subject]))
  }

  const nextStep = () => {
    if (currentStep === 2) {
      setUserData((prev) => ({
        ...prev,
        problemSolving: selectedInterests.join(", "),
        subjects: selectedSubjects.join(", "),
      }))
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      setCurrentScreen(2)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const selectCareerField = (field: CareerField) => {
    setSelectedField(field)
    setShowLesson(true)
    setCurrentQuizQuestion(0)
    setQuizAnswers([])
  }

  const startQuiz = () => {
    setShowLesson(false)
  }

  const answerQuiz = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex]
    setQuizAnswers(newAnswers)

    if (currentQuizQuestion < selectedField!.quiz.length - 1) {
      setCurrentQuizQuestion(currentQuizQuestion + 1)
    } else {
      // Quiz completed, show feedback form
      setCurrentQuizQuestion(-1)
    }
  }

  const submitFeedback = () => {
    setCurrentScreen(3)
  }

  const getQuizScore = () => {
    if (!selectedField) return 0
    let correct = 0
    quizAnswers.forEach((answer, index) => {
      if (answer === selectedField.quiz[index].correct) {
        correct++
      }
    })
    return (correct / selectedField.quiz.length) * 100
  }

  const getRecommendations = () => {
    const score = getQuizScore()
    const field = selectedField?.title || "Technology"

    const recommendations = [
      {
        career: `Senior ${field} Specialist`,
        confidence: "High",
        reason:
          "Your excellent quiz performance and strong interest alignment suggest you have great potential in this field.",
        skills: ["Technical Skills", "Leadership", "Problem Solving"],
        salary: "$75,000 - $120,000",
        growth: "15% annually",
      },
      {
        career: `${field} Consultant`,
        confidence: "Medium-High",
        reason: "Your analytical thinking and communication skills make you well-suited for consulting roles.",
        skills: ["Communication", "Analysis", "Client Relations"],
        salary: "$60,000 - $95,000",
        growth: "12% annually",
      },
      {
        career: `${field} Researcher`,
        confidence: "Medium",
        reason: "Your curiosity and attention to detail indicate strong potential in research-focused roles.",
        skills: ["Research", "Data Analysis", "Critical Thinking"],
        salary: "$55,000 - $85,000",
        growth: "8% annually",
      },
    ]

    return recommendations
  }

  const skillsData = {
    labels: ["Technical Skills", "Soft Skills", "Domain Knowledge", "Communication", "Problem Solving"],
    datasets: [
      {
        label: "Skill Importance (%)",
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(139, 92, 246, 0.8)",
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(139, 92, 246, 1)",
        ],
        borderWidth: 2,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Skills Breakdown for Your Career Path",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 50,
      },
    },
  }

  // Screen 1: User Onboarding & Initial Assessment
  if (currentScreen === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">Pathfinder AI</h1>
            <p className="text-gray-600">Your Personalized Career Journey Starts Here</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Multi-Step Form */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-center text-xl text-gray-800">
                {currentStep === 1 && "Let's Get to Know You!"}
                {currentStep === 2 && "What Interests You?"}
                {currentStep === 3 && "Tell Us More About Yourself"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">What's your name?</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Enter your name"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">How old are you?</Label>
                    <Input
                      id="age"
                      value={userData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      placeholder="Enter your age"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="academic">What's your current academic level?</Label>
                    <Input
                      id="academic"
                      value={userData.academicLevel}
                      onChange={(e) => handleInputChange("academicLevel", e.target.value)}
                      placeholder="e.g., High School, College, University"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      What interests you most? (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {interestOptions.map((interest) => (
                        <div
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center text-sm font-medium ${
                            selectedInterests.includes(interest)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-25"
                          }`}
                        >
                          {interest}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label className="text-base font-medium mb-4 block">
                      Which school subjects do you enjoy? (Select all that apply)
                    </Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {subjectOptions.map((subject) => (
                        <div
                          key={subject}
                          onClick={() => toggleSubject(subject)}
                          className={`p-3 rounded-lg border-2 cursor-pointer transition-all text-center text-sm font-medium ${
                            selectedSubjects.includes(subject)
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-25"
                          }`}
                        >
                          {subject}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hobbies">What are your hobbies?</Label>
                    <Textarea
                      id="hobbies"
                      value={userData.hobbies}
                      onChange={(e) => handleInputChange("hobbies", e.target.value)}
                      placeholder="Tell us about your hobbies and activities you enjoy in your free time..."
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button onClick={nextStep} className="flex items-center bg-blue-600 hover:bg-blue-700">
                  {currentStep === totalSteps ? "Continue" : "Next"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Screen 2: Interactive Learning & Validation
  if (currentScreen === 2) {
    if (!selectedField) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-blue-600 mb-2">Explore Career Fields</h1>
              <p className="text-gray-600">Choose a field that interests you to learn more and test your knowledge</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {careerFields.map((field) => (
                <Card
                  key={field.id}
                  className="shadow-lg border-0 hover:shadow-xl transition-shadow cursor-pointer h-full"
                >
                  <CardContent className="p-6 text-center flex flex-col h-full">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">{field.title}</h3>
                    <p className="text-gray-600 mb-4 flex-grow">{field.description}</p>
                    <Button
                      onClick={() => selectCareerField(field)}
                      className="w-full bg-blue-600 hover:bg-blue-700 mt-auto"
                    >
                      Explore this Field
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )
    }

    if (showLesson) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
          <div className="max-w-4xl mx-auto pt-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600">{selectedField.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {selectedField.lesson.split("\n").map((line, index) => {
                    if (line.startsWith("# ")) {
                      return (
                        <h1 key={index} className="text-2xl font-bold text-gray-800 mb-4">
                          {line.substring(2)}
                        </h1>
                      )
                    } else if (line.startsWith("## ")) {
                      return (
                        <h2 key={index} className="text-xl font-semibold text-gray-700 mb-3 mt-6">
                          {line.substring(3)}
                        </h2>
                      )
                    } else if (line.startsWith("- ")) {
                      return (
                        <li key={index} className="text-gray-600 mb-1">
                          {line.substring(2)}
                        </li>
                      )
                    } else if (line.trim()) {
                      return (
                        <p key={index} className="text-gray-600 mb-3 leading-relaxed">
                          {line}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setSelectedField(null)}>
                    Back to Fields
                  </Button>
                  <Button onClick={startQuiz} className="bg-blue-600 hover:bg-blue-700">
                    Take the Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    if (currentQuizQuestion >= 0 && currentQuizQuestion < selectedField.quiz.length) {
      const question = selectedField.quiz[currentQuizQuestion]
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
          <div className="max-w-2xl mx-auto pt-8">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="text-xl text-blue-600">
                  Quiz Question {currentQuizQuestion + 1} of {selectedField.quiz.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">{question.question}</h3>
                <RadioGroup onValueChange={(value) => answerQuiz(Number.parseInt(value))}>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    }

    // Feedback form after quiz
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-blue-600">How was your experience?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="text-base font-medium">How much did you like learning this?</Label>
                <div className="flex space-x-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= userRating ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                      onClick={() => setUserRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="comment">What did you like best? (Optional)</Label>
                <Textarea
                  id="comment"
                  value={userComment}
                  onChange={(e) => setUserComment(e.target.value)}
                  placeholder="Tell us what you enjoyed most about this experience..."
                  className="mt-1"
                />
              </div>
              <Button
                onClick={submitFeedback}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={userRating === 0}
              >
                Get My Career Recommendation
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Screen 3: Final Recommendation & Action Plan
  const recommendations = getRecommendations()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">Your Career Recommendations</h1>
          <p className="text-gray-600">Based on your interests and quiz performance</p>
        </div>

        <div className="mb-8">
          <div className="flex border-b border-gray-200 bg-white rounded-t-lg">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveRecommendationTab(index)}
                className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeRecommendationTab === index
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                Recommendation {index + 1}
              </button>
            ))}
          </div>

          <Card className="shadow-lg border-0 rounded-t-none">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {recommendations[activeRecommendationTab].career}
              </h2>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mb-4">
                <CheckCircle className="w-4 h-4 mr-1" />
                {recommendations[activeRecommendationTab].confidence} Match
              </div>
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold text-blue-800 mb-2">Why This Path?</h3>
                <p className="text-blue-700">{recommendations[activeRecommendationTab].reason}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Key Skills</h4>
                  <ul className="text-sm text-gray-600">
                    {recommendations[activeRecommendationTab].skills.map((skill, idx) => (
                      <li key={idx}>• {skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Salary Range</h4>
                  <p className="text-sm text-gray-600">{recommendations[activeRecommendationTab].salary}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Job Growth</h4>
                  <p className="text-sm text-gray-600">{recommendations[activeRecommendationTab].growth}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Roadmap */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Skills Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <Bar data={skillsData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* Action Steps */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Your Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Explore Online Courses</h3>
                  <p className="text-gray-600">
                    Start with beginner-friendly courses on platforms like Coursera or Khan Academy
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Join Communities</h3>
                  <p className="text-gray-600">
                    Connect with others in your field through online forums and local meetups
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Build Projects</h3>
                  <p className="text-gray-600">Start small projects to practice your skills and build a portfolio</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Seek Mentorship</h3>
                  <p className="text-gray-600">Find experienced professionals who can guide your career journey</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Stay Updated</h3>
                  <p className="text-gray-600">Follow industry trends and continue learning throughout your career</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 pb-8">
          <Button
            onClick={() => {
              setCurrentScreen(1)
              setCurrentStep(1)
              setSelectedField(null)
              setUserData({
                name: "",
                age: "",
                academicLevel: "",
                problemSolving: "",
                subjects: "",
                hobbies: "",
              })
            }}
            variant="outline"
            className="mr-4"
          >
            Start Over
          </Button>
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.print()
              }
            }}
          >
            Download My Roadmap
          </Button>
        </div>
      </div>
    </div>
  )
}
