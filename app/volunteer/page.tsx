"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Filter,
  Heart,
  Loader2,
  MapPin,
  Phone,
  User,
  Zap,
  Star,
  Award,
} from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

// Enhanced mock data with more realistic information
const helpRequests = [
  {
    id: "RC-2025-0001",
    name: "John Smith",
    type: "Medical Emergency",
    urgency: "high",
    location: "2.1 miles away",
    coordinates: "37.7749, -122.4194",
    time: "10 minutes ago",
    people: 2,
    description: "Elderly person with breathing difficulties, oxygen tank running low",
    estimatedTime: "15-20 min",
    skills: ["Medical", "First Aid"],
    reward: 50,
  },
  {
    id: "RC-2025-0002",
    name: "Maria Garcia",
    type: "Food & Water",
    urgency: "medium",
    location: "0.8 miles away",
    coordinates: "37.7833, -122.4167",
    time: "25 minutes ago",
    people: 4,
    description: "Family with young children needs food and clean water after flooding",
    estimatedTime: "30-45 min",
    skills: ["Transportation", "Supply Distribution"],
    reward: 30,
  },
  {
    id: "RC-2025-0003",
    name: "David Lee",
    type: "Evacuation",
    urgency: "critical",
    location: "1.5 miles away",
    coordinates: "37.7694, -122.4862",
    time: "5 minutes ago",
    people: 1,
    description: "Trapped in building with rising flood waters, need immediate evacuation",
    estimatedTime: "ASAP",
    skills: ["Rescue", "Emergency Response"],
    reward: 100,
  },
  {
    id: "RC-2025-0004",
    name: "Sarah Johnson",
    type: "Shelter",
    urgency: "medium",
    location: "3.2 miles away",
    coordinates: "37.7831, -122.4039",
    time: "1 hour ago",
    people: 3,
    description: "Family displaced by fire needs temporary shelter and basic supplies",
    estimatedTime: "1-2 hours",
    skills: ["Coordination", "Social Work"],
    reward: 40,
  },
]

const acceptedRequests = [
  {
    id: "RC-2025-0005",
    name: "Robert Chen",
    type: "Medical Emergency",
    urgency: "medium",
    location: "1.7 miles away",
    coordinates: "37.7699, -122.4275",
    time: "35 minutes ago",
    people: 1,
    description: "Elderly person needs medication delivery",
    status: "en-route",
    estimatedArrival: "8 minutes",
  },
]

export default function VolunteerPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")

  const handleAcceptRequest = (id: string) => {
    setLoading(id)

    setTimeout(() => {
      setLoading(null)
      toast({
        title: "Request accepted successfully!",
        description: "You've been matched with this emergency. Navigation details sent to your phone.",
      })
    }, 1500)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getUrgencyBg = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-50 border-red-200"
      case "high":
        return "bg-orange-50 border-orange-200"
      case "medium":
        return "bg-yellow-50 border-yellow-200"
      case "low":
        return "bg-green-50 border-green-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const filteredRequests =
    filter === "all" ? helpRequests : helpRequests.filter((request) => request.urgency === filter)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col xl:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.div
            className="w-full xl:w-80 space-y-4 sm:space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Volunteer Profile Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="flex items-center justify-center text-green-600 text-lg sm:text-xl">
                  <Award className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Volunteer Dashboard
                </CardTitle>
                <CardDescription className="text-sm">Emergency response matching</CardDescription>
                <Badge className="mt-2 bg-green-100 text-green-800 border-green-200 text-xs">
                  <Star className="mr-1 h-3 w-3" />
                  Level 3 Responder
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm">Filter by Urgency</Label>
                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="h-10 sm:h-12">
                      <SelectValue placeholder="Filter by urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Requests</SelectItem>
                      <SelectItem value="critical">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                          Critical
                        </div>
                      </SelectItem>
                      <SelectItem value="high">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mr-2" />
                          High
                        </div>
                      </SelectItem>
                      <SelectItem value="medium">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                          Medium
                        </div>
                      </SelectItem>
                      <SelectItem value="low">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                          Low
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Search by Location</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-10 h-10 sm:h-12 text-sm" placeholder="Enter location or radius" />
                  </div>
                </div>

                <Link href="/map" className="block">
                  <Button
                    variant="outline"
                    className="w-full h-10 sm:h-12 bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100 text-sm"
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    View Nav Jeevan Map
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg flex items-center">
                  <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-yellow-500" />
                  Your Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-green-600">12</div>
                    <div className="text-xs text-green-700">Requests Completed</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-blue-600">1</div>
                    <div className="text-xs text-blue-700">Currently Active</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-purple-600">28</div>
                    <div className="text-xs text-purple-700">People Helped</div>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg sm:text-2xl font-bold text-orange-600">4.9</div>
                    <div className="text-xs text-orange-700">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Tabs defaultValue="requests" className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <TabsList className="bg-white/80 backdrop-blur-sm shadow-lg w-full sm:w-auto">
                  <TabsTrigger value="requests" className="relative text-sm">
                    Open Requests
                    <Badge className="absolute -top-2 -right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                      {helpRequests.length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="accepted" className="text-sm">
                    Active Missions
                    <Badge className="ml-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-green-500 text-white">
                      {acceptedRequests.length}
                    </Badge>
                  </TabsTrigger>
                </TabsList>

                <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm text-sm w-full sm:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                </Button>
              </div>

              <TabsContent value="requests" className="space-y-4 sm:space-y-6">
                {filteredRequests.length === 0 ? (
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                      <AlertCircle className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                      <p className="text-center text-muted-foreground mb-4 text-sm sm:text-base">
                        No help requests match your current filters
                      </p>
                      <Button variant="link" onClick={() => setFilter("all")} className="text-sm">
                        Clear filters to see all requests
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4 sm:gap-6">
                    {filteredRequests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card
                          className={`shadow-xl border-2 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 ${getUrgencyBg(request.urgency)}`}
                        >
                          <CardHeader className="pb-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${request.urgency === "critical" ? "bg-red-500 animate-pulse" : request.urgency === "high" ? "bg-orange-500" : request.urgency === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
                                />
                                <CardTitle className="text-lg sm:text-xl">{request.type}</CardTitle>
                              </div>
                              <div className="text-right">
                                <Badge className={`${getUrgencyColor(request.urgency)} bg-white/80 text-xs`}>
                                  {request.urgency.toUpperCase()}
                                </Badge>
                                <div className="text-xs sm:text-sm text-muted-foreground mt-1 flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {request.time}
                                </div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                  <User className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-sm sm:text-base">{request.name}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                      {request.people} {request.people === 1 ? "person" : "people"} needing assistance
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-green-600 text-sm sm:text-base">
                                      {request.location}
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                      {request.coordinates}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4 text-blue-600" />
                                  <span className="text-xs sm:text-sm font-medium">
                                    Est. Time: {request.estimatedTime}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Star className="h-4 w-4 text-yellow-500" />
                                  <span className="text-xs sm:text-sm font-medium">
                                    Reward: {request.reward} points
                                  </span>
                                </div>

                                <div className="flex flex-wrap gap-1">
                                  {request.skills.map((skill, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="p-3 sm:p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
                              <p className="text-xs sm:text-sm">{request.description}</p>
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 pt-4">
                            <Button variant="outline" size="sm" className="bg-white/80 w-full sm:w-auto text-sm">
                              <Phone className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-sm"
                              onClick={() => handleAcceptRequest(request.id)}
                              disabled={loading === request.id}
                            >
                              {loading === request.id ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Accepting...
                                </>
                              ) : (
                                <>
                                  <Heart className="mr-2 h-4 w-4" />
                                  Accept Mission
                                </>
                              )}
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="accepted" className="space-y-4 sm:space-y-6">
                {acceptedRequests.length === 0 ? (
                  <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                    <CardContent className="flex flex-col items-center justify-center py-8 sm:py-12">
                      <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-4" />
                      <p className="text-center text-muted-foreground mb-4 text-sm sm:text-base">No active missions</p>
                      <Button
                        variant="link"
                        onClick={() => (document.querySelector('[value="requests"]') as HTMLElement | null)?.click()}
                        className="text-sm"
                      >
                        Browse available requests
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {acceptedRequests.map((request, index) => (
                      <motion.div
                        key={request.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="shadow-xl border-2 border-green-200 bg-green-50/80 backdrop-blur-sm">
                          <CardHeader className="bg-green-100/50">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-0">
                              <CardTitle className="text-lg sm:text-xl flex items-center">
                                {request.type}
                                <Badge className="ml-3 bg-green-500 text-white text-xs">Active Mission</Badge>
                              </CardTitle>
                              <div className="text-right">
                                <div className="text-sm font-medium text-green-700">
                                  ETA: {request.estimatedArrival}
                                </div>
                                <div className="text-xs text-muted-foreground">{request.time}</div>
                              </div>
                            </div>
                          </CardHeader>

                          <CardContent className="space-y-4 pt-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <div className="flex items-start space-x-3">
                                  <User className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-sm sm:text-base">{request.name}</div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                      {request.people} {request.people === 1 ? "person" : "people"}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start space-x-3">
                                  <MapPin className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
                                  <div>
                                    <div className="font-medium text-green-600 text-sm sm:text-base">
                                      {request.location}
                                    </div>
                                    <div className="text-xs sm:text-sm text-muted-foreground">
                                      {request.coordinates}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="p-3 sm:p-4 bg-green-100 rounded-lg">
                                <div className="text-sm font-medium text-green-800 mb-2">Mission Status</div>
                                <div className="text-lg font-bold text-green-700 capitalize">{request.status}</div>
                                <div className="text-xs text-green-600 mt-1">Update your status when you arrive</div>
                              </div>
                            </div>

                            <div className="p-3 sm:p-4 bg-white rounded-lg border border-green-200">
                              <p className="text-xs sm:text-sm">{request.description}</p>
                            </div>
                          </CardContent>

                          <CardFooter className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-0 pt-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-white border-green-300 text-green-700 hover:bg-green-50 w-full sm:w-auto text-sm"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              Call Victim
                            </Button>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white w-full sm:w-auto text-sm"
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Complete
                            </Button>
                          </CardFooter>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
