"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { AlertTriangle, Filter, List, MapPin, Search, X } from "lucide-react"

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
  const [showSidebar, setShowSidebar] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [helpRequests, setHelpRequests] = useState(initialHelpRequests)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHelpRequests((prev) => {
        const updated = prev.map((request) => {
          if (Math.random() < 0.3) {
            const minutes = Math.floor(Math.random() * 60) + 1
            return {
              ...request,
              time: `${minutes} minutes ago`,
            }
          }
          return request
        })

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
    }, 5000)

    return () => clearInterval(interval)
  }, [toast])

  const handleMarkerClick = (location: any) => {
    const matchingRequest = helpRequests.find(
      (req) => Math.abs(req.lat - location.lat) < 0.001 && Math.abs(req.lng - location.lng) < 0.001,
    )
    if (matchingRequest) {
      setSelectedRequest(matchingRequest.id)
      setShowSidebar(true)
    }
  }

  const activeRequests = helpRequests.filter((req) => req.status === "active")
  const respondingRequests = helpRequests.filter((req) => req.status === "responding")

  return (
    <div className="flex h-[calc(100vh-4rem)] relative">
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowSidebar(false)} />
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl">
            <SidebarContent
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              lastUpdate={lastUpdate}
              activeRequests={activeRequests}
              respondingRequests={respondingRequests}
              selectedRequest={selectedRequest}
              setSelectedRequest={setSelectedRequest}
              isMobile={true}
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:block ${showSidebar ? "w-80" : "w-0"} transition-all duration-300 overflow-hidden border-r bg-white`}
      >
        <SidebarContent
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          lastUpdate={lastUpdate}
          activeRequests={activeRequests}
          respondingRequests={respondingRequests}
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest}
        />
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        {/* Mobile Controls */}
        <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center lg:hidden">
          <Button variant="outline" size="sm" className="bg-white shadow-lg" onClick={() => setShowSidebar(true)}>
            <List className="h-4 w-4 mr-2" />
            Emergency List
          </Button>

          <Link href="/request-help">
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white shadow-lg">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Request Help
            </Button>
          </Link>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:block">
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
            <Link href="/request-help">
              <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Request Help
              </Button>
            </Link>
          </div>
        </div>

        {/* Map Component */}
        <TrafficMap onMarkerClick={handleMarkerClick} />
      </div>
    </div>
  )
}

// Sidebar Content Component
function SidebarContent({
  showSidebar,
  setShowSidebar,
  lastUpdate,
  activeRequests,
  respondingRequests,
  selectedRequest,
  setSelectedRequest,
  isMobile = false,
}: {
  showSidebar: boolean
  setShowSidebar: (show: boolean) => void
  lastUpdate: Date
  activeRequests: any[]
  respondingRequests: any[]
  selectedRequest: string | null
  setSelectedRequest: (id: string) => void
  isMobile?: boolean
}) {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">Live Relief Map</h2>
          <p className="text-xs text-gray-500">Last update: {lastUpdate.toLocaleTimeString()}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setShowSidebar(false)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="requests" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="requests" className="text-sm">
            Active
            <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 rounded-full">{activeRequests.length}</span>
          </TabsTrigger>
          <TabsTrigger value="responding" className="text-sm">
            Responding
            <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 rounded-full">
              {respondingRequests.length}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className="space-y-3 mb-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input className="pl-8 h-9" placeholder="Search location..." />
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="flex-1 h-9">
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

            <Button variant="outline" size="sm">
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
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-sm">{request.type}</div>
                    <div className="text-xs text-gray-500">{request.time}</div>
                  </div>
                  <UrgencyBadge urgency={request.urgency} />
                </div>
                <div className="flex items-center text-xs text-gray-500 mb-1">
                  <MapPin className="h-3 w-3 mr-1" />
                  {request.lat.toFixed(4)}, {request.lng.toFixed(4)}
                </div>
                <div className="text-xs text-gray-600 mb-1">
                  {request.people} {request.people === 1 ? "person" : "people"} affected
                </div>
                <div className="text-xs text-gray-700">{request.description}</div>
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
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium text-sm">{request.type}</div>
                    <div className="text-xs text-blue-600">Help en route</div>
                  </div>
                  <span className="text-xs px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-800">RESPONDING</span>
                </div>
                <div className="text-xs text-blue-700 mb-1">Assigned: {request.assignedVolunteer}</div>
                <div className="text-xs text-gray-600">
                  {request.people} {request.people === 1 ? "person" : "people"} • {request.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
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
