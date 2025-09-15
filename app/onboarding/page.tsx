"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Rocket, Star, Heart, Sparkles, Users } from "lucide-react"
import { useRouter } from "next/navigation"

interface FormData {
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

const INTERESTS = [
  "🖥️ Technology & Computers",
  "🏥 Healthcare & Medicine",
  "📚 Teaching & Education",
  "💰 Money & Finance",
  "🎨 Arts & Design",
  "📱 Social Media & Marketing",
  "🔧 Building & Engineering",
  "🔬 Science & Research",
  "🤝 Helping People",
  "💼 Business & Leadership",
  "🌱 Environment & Nature",
  "⚽ Sports & Fitness",
  "📺 Movies & Media",
  "⚖️ Law & Justice",
  "✈️ Travel & Adventure",
]

const VALUES = [
  "⚖️ Work-life balance",
  "💰 High salary",
  "🔒 Job security",
  "🎨 Creativity",
  "❤️ Helping others",
  "👑 Leadership",
  "💡 Innovation",
  "🕐 Flexibility",
  "🏆 Recognition",
  "📖 Learning opportunities",
  "🌍 Making a difference",
  "🚀 Independence",
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 5

  const [formData, setFormData] = useState<FormData>({
    academics: "",
    interests: [],
    personality: {
      openness: 50,
      conscientiousness: 50,
      extraversion: 50,
      agreeableness: 50,
      neuroticism: 50,
    },
    workPreferences: {
      environment: "",
      schedule: "",
      teamSize: "",
    },
    values: [],
  })

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      // Generate user profile and navigate to career matches
      localStorage.setItem("userProfile", JSON.stringify(formData))
      router.push("/career-matches")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      router.push("/")
    }
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleValueToggle = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      values: prev.values.includes(value) ? prev.values.filter((v) => v !== value) : [...prev.values, value],
    }))
  }

  const handlePersonalityChange = (trait: keyof FormData["personality"], value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      personality: {
        ...prev.personality,
        [trait]: value[0],
      },
    }))
  }

  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <Rocket className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Career Navigator</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-2xl">🎯</div>
            <div className="mx-4 flex-1">
              <Progress value={progress} className="h-3 bg-green-100" />
            </div>
            <div className="text-2xl">🏆</div>
          </div>
          <p className="text-sm text-muted-foreground text-center font-medium">
            {Math.round(progress)}% Complete - You're doing great! ✨
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-lg rounded-2xl bg-gradient-to-br from-card to-green-50/30">
          <CardHeader className="text-center pb-4">
            <div className="text-4xl mb-2">
              {currentStep === 1 && "📚"}
              {currentStep === 2 && "❤️"}
              {currentStep === 3 && "🌟"}
              {currentStep === 4 && "💼"}
              {currentStep === 5 && "🎯"}
            </div>
            <CardTitle className="text-2xl">
              {currentStep === 1 && "Tell us about your school life! 📚"}
              {currentStep === 2 && "What do you love doing? ❤️"}
              {currentStep === 3 && "Let's learn about your personality! 🌟"}
              {currentStep === 4 && "How do you like to work? 💼"}
              {currentStep === 5 && "What matters most to you? 🎯"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Academic Achievements */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="academics" className="text-base font-medium">
                    Tell us what you love learning about in school! 🎓
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Share your favorite subjects, grades, or any cool projects you've done!
                  </p>
                  <Textarea
                    id="academics"
                    placeholder="e.g., I love math and science! I got an A in my computer class and built a robot for the science fair..."
                    value={formData.academics}
                    onChange={(e) => setFormData((prev) => ({ ...prev, academics: e.target.value }))}
                    className="mt-2 min-h-[120px] rounded-xl"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Interests */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  Pick all the things that make you excited! (Choose as many as you want) 🎉
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {INTERESTS.map((interest) => (
                    <div
                      key={interest}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      <Checkbox
                        id={interest}
                        checked={formData.interests.includes(interest)}
                        onCheckedChange={() => handleInterestToggle(interest)}
                        className="rounded-md"
                      />
                      <Label htmlFor={interest} className="text-sm font-normal cursor-pointer flex-1">
                        {interest}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Personality Traits */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <p className="text-muted-foreground text-center">
                  Move the sliders to show us what you're like! There are no wrong answers! 😊
                </p>

                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50">
                    <div className="flex items-center mb-2">
                      <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
                      <Label className="text-sm font-medium">How Creative Are You?</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Do you love trying new things and being creative?
                    </p>
                    <Slider
                      value={[formData.personality.openness]}
                      onValueChange={(value) => handlePersonalityChange("openness", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>I like routine 📋</span>
                      <span className="font-medium">{formData.personality.openness}</span>
                      <span>I love new ideas! 💡</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-green-500 mr-2" />
                      <Label className="text-sm font-medium">How Organized Are You?</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Do you like to plan things and stay organized?</p>
                    <Slider
                      value={[formData.personality.conscientiousness]}
                      onValueChange={(value) => handlePersonalityChange("conscientiousness", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>I'm flexible 🌊</span>
                      <span className="font-medium">{formData.personality.conscientiousness}</span>
                      <span>I love organizing! 📚</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-orange-50 to-red-50">
                    <div className="flex items-center mb-2">
                      <Users className="w-5 h-5 text-orange-500 mr-2" />
                      <Label className="text-sm font-medium">How Social Are You?</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Do you love being around people and making friends?
                    </p>
                    <Slider
                      value={[formData.personality.extraversion]}
                      onValueChange={(value) => handlePersonalityChange("extraversion", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>I like quiet time 🤫</span>
                      <span className="font-medium">{formData.personality.extraversion}</span>
                      <span>I love parties! 🎉</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-pink-50 to-rose-50">
                    <div className="flex items-center mb-2">
                      <Heart className="w-5 h-5 text-pink-500 mr-2" />
                      <Label className="text-sm font-medium">How Helpful Are You?</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Do you like helping others and working together?
                    </p>
                    <Slider
                      value={[formData.personality.agreeableness]}
                      onValueChange={(value) => handlePersonalityChange("agreeableness", value)}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>I like competing 🏆</span>
                      <span className="font-medium">{formData.personality.agreeableness}</span>
                      <span>I love helping! 🤝</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-blue-50">
                    <div className="flex items-center mb-2">
                      <Rocket className="w-5 h-5 text-indigo-500 mr-2" />
                      <Label className="text-sm font-medium">How Calm Are You?</Label>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">Do you stay calm when things get stressful?</p>
                    <Slider
                      value={[100 - formData.personality.neuroticism]}
                      onValueChange={(value) => handlePersonalityChange("neuroticism", [100 - value[0]])}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>I feel things deeply 💭</span>
                      <span className="font-medium">{100 - formData.personality.neuroticism}</span>
                      <span>I stay super calm! 😌</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Work Preferences */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Where would you like to work? 🏢</Label>
                  <Select
                    value={formData.workPreferences.environment}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workPreferences: { ...prev.workPreferences, environment: value },
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue placeholder="Pick your dream workplace!" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">🏢 Cool Office Building</SelectItem>
                      <SelectItem value="remote">🏠 From Home (Remote)</SelectItem>
                      <SelectItem value="hybrid">🔄 Mix of Both (Hybrid)</SelectItem>
                      <SelectItem value="field">🌍 Out in the World</SelectItem>
                      <SelectItem value="lab">🔬 Science Lab</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">When do you like to work? ⏰</Label>
                  <Select
                    value={formData.workPreferences.schedule}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workPreferences: { ...prev.workPreferences, schedule: value },
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue placeholder="Choose your ideal schedule!" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9to5">🕘 Regular Hours (9-5)</SelectItem>
                      <SelectItem value="flexible">🕐 Flexible Hours</SelectItem>
                      <SelectItem value="shifts">🔄 Different Shifts</SelectItem>
                      <SelectItem value="project">📋 Project-based</SelectItem>
                      <SelectItem value="freelance">🚀 Be My Own Boss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">How many people do you want to work with? 👥</Label>
                  <Select
                    value={formData.workPreferences.teamSize}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        workPreferences: { ...prev.workPreferences, teamSize: value },
                      }))
                    }
                  >
                    <SelectTrigger className="mt-2 rounded-xl">
                      <SelectValue placeholder="Pick your team size!" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="solo">🧑‍💻 Work by Myself</SelectItem>
                      <SelectItem value="small">👥 Small Team (2-5 people)</SelectItem>
                      <SelectItem value="medium">👨‍👩‍👧‍👦 Medium Team (6-15 people)</SelectItem>
                      <SelectItem value="large">🏟️ Big Team (15+ people)</SelectItem>
                      <SelectItem value="varies">🤷‍♀️ I don't mind!</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Step 5: Values */}
            {currentStep === 5 && (
              <div className="space-y-4">
                <p className="text-muted-foreground text-center">
                  What's most important to you in your future job? Pick your favorites! 🌟
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {VALUES.map((value) => (
                    <div
                      key={value}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-green-50 transition-colors"
                    >
                      <Checkbox
                        id={value}
                        checked={formData.values.includes(value)}
                        onCheckedChange={() => handleValueToggle(value)}
                        className="rounded-md"
                      />
                      <Label htmlFor={value} className="text-sm font-normal cursor-pointer flex-1">
                        {value}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack} className="rounded-xl bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 1 ? "🏠 Home" : "⬅️ Back"}
              </Button>
              <Button
                onClick={handleNext}
                className="rounded-xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
              >
                {currentStep === totalSteps ? "🎉 Create My Profile!" : "Next ➡️"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
