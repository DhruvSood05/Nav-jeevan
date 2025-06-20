"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, Filter, Layers, List, MapPin, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import TrafficMap from "@/components/TrafficMap"

// Mock data for help requests that syncs with map
const initialHelpRequests = [
  {
    id: "RC-2025-0001",
    name: "John Smith",
    type: "Medical Emergency",
    urgency: "critical",
    lat: 28.6139,
    lng: 77.209,
    time: "2 minutes ago",
    people: 1,
    status: "active",
    description: "Heart attack patient needs immediate attention",
  },
  {
    id: "RC-2025-0002",
    name: "Maria Garcia",
    type: "Food & Water",
    urgency: "medium",
    lat: 28.6289,
    lng: 77.2065,
    time: "15 minutes ago",
    people: 5,
    status: "responding",
    description: "Family needs food supplies",
    assignedVolunteer: "John Doe",
  },
  {
    id: "RC-2025-0003",
    name: "David Lee",
    type: "Evacuation",
    urgency: "high",
    lat: 28.6169,
    lng: 77.2295,
    time: "5 minutes ago",
    people: 3,
    status: "active",
    description: "Building collapse, people trapped",
  },
  {
    id: "RC-2025-0004",
    name: "Sarah Johnson",
    type: "Shelter",
    urgency: "medium",
    lat: 28.6304,
    lng: 77.2177,
    time: "30 minutes ago",
    people: 4,
    status: "resolved",
    description: "Family needs temporary shelter",
  },
]

export default function MapPage() {
  const { toast } = useToast()
  const [showSidebar, setShowSidebar] = useState(true)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [helpRequests, setHelpRequests] = useState(initialHelpRequests)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHelpRequests((prev) => {
        const updated = prev.map((request) => {
          // Randomly update timestamps
          if (Math.random() < 0.3) {
            const minutes = Math.floor(Math.random() * 60) + 1
            return {
              ...request,
              time: `${minutes} minutes ago`,
            }
          }
          return request
        })

        // Occasionally add new requests
        if (Math.random() < 0.1 && updated.length < 8) {
          const newRequest = {
            id: `RC-2025-${String(Date.now()).slice(-4)}`,
            name: ["Alex Johnson", "Emma Wilson", "Michael Brown", "Lisa Davis"][Math.floor(Math.random() * 4)],
            type: ["Medical Emergency", "Food & Water", "Evacuation", "Shelter"][Math.floor(Math.random() * 4)],
            urgency: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as any,
            lat: 28.6 + Math.random() * 0.1,
            lng: 77.2 + Math.random() * 0.1,
            time: "Just now",
            people: Math.floor(Math.random() * 5) + 1,
            status: "active" as any,
            description: "New emergency reported via mobile app",
          }

          toast({
            title: "New Emergency Alert",
            description: `${newRequest.type} reported - ${newRequest.urgency} priority`,
          })

          return [...updated, newRequest]
        }

        return updated
      })
      setLastUpdate(new Date())
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [toast])

  const handleMarkerClick = (location: any) => {
    const matchingRequest = helpRequests.find(
      (req) => Math.abs(req.lat - location.lat) < 0.001 && Math.abs(req.lng - location.lng) < 0.001,
    )
    if (matchingRequest) {
      setSelectedRequest(matchingRequest.id)
    }
  }

  const activeRequests = helpRequests.filter((req) => req.status === "active")
  const respondingRequests = helpRequests.filter((req) => req.status === "responding")

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <div className={`${showSidebar ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r bg-white`}>
        <div className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold">Live Relief Map</h2>
              <p className="text-xs text-gray-500">Last update: {lastUpdate.toLocaleTimeString()}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="requests" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="requests">
                Active
                <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 rounded-full">
                  {activeRequests.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="responding">
                Responding
                <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
                  {respondingRequests.length}
                </span>
              </TabsTrigger>
            </TabsList>

            <div className="py-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input className="pl-8" placeholder="Search location..." />
              </div>

              <div className="flex items-center gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="food">Food & Water</SelectItem>
                    <SelectItem value="shelter">Shelter</SelectItem>
                    <SelectItem value="evacuation">Evacuation</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="requests" className="flex-1 overflow-auto space-y-2">
              {activeRequests.map((request) => (
                <Card
                  key={request.id}
                  className={`cursor-pointer transition-colors ${
                    selectedRequest === request.id ? "bg-red-50 border-red-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{request.type}</div>
                        <div className="text-xs text-gray-500">{request.time}</div>
                      </div>
                      <UrgencyBadge urgency={request.urgency} />
                    </div>
                    <div className="mt-2 flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {request.lat.toFixed(4)}, {request.lng.toFixed(4)}
                    </div>
                    <div className="mt-1 text-xs text-gray-600">
                      {request.people} {request.people === 1 ? "person" : "people"} affected
                    </div>
                    <div className="mt-1 text-xs text-gray-700">{request.description}</div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="responding" className="flex-1 overflow-auto space-y-2">
              {respondingRequests.map((request) => (
                <Card
                  key={request.id}
                  className={`cursor-pointer transition-colors border-blue-200 bg-blue-50 ${
                    selectedRequest === request.id ? "bg-blue-100" : "hover:bg-blue-100"
                  }`}
                  onClick={() => setSelectedRequest(request.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-sm">{request.type}</div>
                        <div className="text-xs text-blue-600">Help en route</div>
                      </div>
                      <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">RESPONDING</span>
                    </div>
                    <div className="mt-2 text-xs text-blue-700">Assigned: {request.assignedVolunteer}</div>
                    <div className="mt-1 text-xs text-gray-600">
                      {request.people} {request.people === 1 ? "person" : "people"} • {request.time}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {!showSidebar && (
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 left-4 z-10 bg-white"
            onClick={() => setShowSidebar(true)}
          >
            <List className="h-4 w-4 mr-2" />
            Show List
          </Button>
        )}

        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="sm" className="bg-white">
            <Layers className="h-4 w-4 mr-2" />
            Layers
          </Button>
          <Link href="/request-help">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Request Help
            </Button>
          </Link>
        </div>

        {/* Real Map Integration */}
        <TrafficMap onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  )
}

function UrgencyBadge({ urgency }: { urgency: string }) {
  let color = ""
  let text = ""

  switch (urgency) {
    case "critical":
      color = "bg-red-100 text-red-800"
      text = "Critical"
      break
    case "high":
      color = "bg-orange-100 text-orange-800"
      text = "High"
      break
    case "medium":
      color = "bg-yellow-100 text-yellow-800"
      text = "Medium"
      break
    case "low":
      color = "bg-green-100 text-green-800"
      text = "Low"
      break
    default:
      color = "bg-gray-100 text-gray-600"
      text = urgency
  }

  return <span className={`text-xs px-1.5 py-0.5 rounded-full ${color}`}>{text}</span>
}
