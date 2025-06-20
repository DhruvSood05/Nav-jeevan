"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle, Loader2, MapPin, User, Clock } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function RequestHelpPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState({ lat: "", lng: "" })
  const [gettingLocation, setGettingLocation] = useState(false)
  const [urgencyLevel, setUrgencyLevel] = useState("medium")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    // Simulate API call with realistic delay
    setTimeout(() => {
      setLoading(false)
      toast({
        title: "Emergency request submitted successfully!",
        description: "You will be matched with nearby volunteers and emergency responders.",
      })
      router.push("/request-confirmation")
    }, 2000)
  }

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
        variant: "destructive",
      })
      return
    }

    setGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude.toString(),
          lng: position.coords.longitude.toString(),
        })
        setGettingLocation(false)
        toast({
          title: "Location detected successfully",
          description: "Your precise location has been added to the emergency request.",
        })
      },
      (error) => {
        setGettingLocation(false)
        toast({
          title: "Error getting location",
          description: error.message,
          variant: "destructive",
        })
      },
    )
  }

  const urgencyColors = {
    critical: "from-red-600 to-red-700",
    high: "from-orange-500 to-orange-600",
    medium: "from-yellow-500 to-yellow-600",
    low: "from-green-500 to-green-600",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 py-6 sm:py-8 lg:py-12">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Emergency Help Request</h1>
            <p className="text-sm sm:text-base text-gray-600 px-4">
              Our system will instantly connect you with nearby volunteers and emergency responders
            </p>
          </div>

          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <CardTitle className="flex items-center justify-center text-xl sm:text-2xl text-red-600">
                <AlertTriangle className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Emergency Request Form
              </CardTitle>
              <CardDescription className="text-sm sm:text-base px-2 sm:px-0">
                Fill out this form to request immediate assistance. All fields are important for proper coordination.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 sm:space-y-8 px-4 sm:px-6">
                {/* Personal Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center">
                    <User className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    Personal Information
                  </h3>

                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm sm:text-base">
                        Full Name *
                      </Label>
                      <Input id="name" placeholder="Enter your full name" required className="h-10 sm:h-12" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-sm sm:text-base">
                        Contact Number *
                      </Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        required
                        className="h-10 sm:h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Emergency Details */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center">
                    <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                    Emergency Details
                  </h3>

                  <div className="space-y-4">
                    <Label className="text-sm sm:text-base">Emergency Type *</Label>
                    <RadioGroup defaultValue="medical" className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[
                        { value: "medical", label: "Medical Emergency" },
                        { value: "food", label: "Food & Water" },
                        { value: "shelter", label: "Shelter" },
                        { value: "evacuation", label: "Evacuation" },
                        { value: "fire", label: "Fire Emergency" },
                        { value: "other", label: "Other" },
                      ].map((type) => (
                        <div
                          key={type.value}
                          className="flex items-center space-x-3 p-3 sm:p-4 rounded-lg border-2 border-gray-200 hover:border-red-300 transition-colors"
                        >
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value} className="cursor-pointer text-sm sm:text-base">
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm sm:text-base">Urgency Level *</Label>
                    <Select value={urgencyLevel} onValueChange={setUrgencyLevel}>
                      <SelectTrigger className="h-10 sm:h-12">
                        <SelectValue placeholder="Select urgency level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="critical">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                            <span className="font-semibold text-red-600">Critical - Life Threatening</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="high">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
                            <span className="text-orange-600">High - Urgent Assistance Needed</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="medium">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                            <span className="text-yellow-600">Medium - Need Help Soon</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="low">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                            <span className="text-green-600">Low - Assistance Required</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center">
                    <MapPin className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    Location Information
                  </h3>

                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <Label className="text-sm sm:text-base">GPS Coordinates *</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={getCurrentLocation}
                        disabled={gettingLocation}
                        className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100 w-full sm:w-auto"
                      >
                        {gettingLocation ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Detecting...
                          </>
                        ) : (
                          <>
                            <MapPin className="mr-2 h-4 w-4" />
                            Auto-Detect Location
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Latitude"
                        value={location.lat}
                        onChange={(e) => setLocation({ ...location, lat: e.target.value })}
                        required
                        className="h-10 sm:h-12"
                      />
                      <Input
                        placeholder="Longitude"
                        value={location.lng}
                        onChange={(e) => setLocation({ ...location, lng: e.target.value })}
                        required
                        className="h-10 sm:h-12"
                      />
                    </div>

                    <Input placeholder="Street Address (Optional but helpful)" className="h-10 sm:h-12" />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-base sm:text-lg font-semibold flex items-center">
                    <Clock className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                    Additional Information
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-sm sm:text-base">
                        Describe Your Emergency Situation *
                      </Label>
                      <Textarea
                        id="description"
                        placeholder="Please provide detailed information about your emergency, specific needs, and any relevant circumstances..."
                        rows={4}
                        required
                        className="resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="people" className="text-sm sm:text-base">
                        Number of People Needing Assistance *
                      </Label>
                      <Select defaultValue="1">
                        <SelectTrigger className="h-10 sm:h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Person" : "People"}
                            </SelectItem>
                          ))}
                          <SelectItem value="10+">More than 10 people</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-6 sm:pt-8 px-4 sm:px-6">
                <Button
                  type="submit"
                  className={`w-full h-12 sm:h-14 text-sm sm:text-lg font-semibold bg-gradient-to-r ${urgencyColors[urgencyLevel as keyof typeof urgencyColors]} hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      Submitting Emergency Request...
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Submit Emergency Request
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* Help Information */}
          <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-blue-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What happens next?</h3>
            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
              <li>• System instantly analyzes and prioritizes your request</li>
              <li>• Nearby volunteers and responders are automatically notified</li>
              <li>• You'll receive SMS updates on response status</li>
              <li>• Emergency services are contacted for critical situations</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
