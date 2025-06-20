"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface EmergencyLocation {
  id: number
  lat: number
  lng: number
  type: string
  urgency: "critical" | "high" | "medium" | "low"
  description: string
  time: string
  status: "active" | "responding" | "resolved"
  assignedVolunteer?: string
}

const TrafficMap: React.FC<{ onMarkerClick?: (location: EmergencyLocation) => void }> = ({ onMarkerClick }) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const leafletMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false)
  const [selectedMarker, setSelectedMarker] = useState<EmergencyLocation | null>(null)
  const [emergencyLocations, setEmergencyLocations] = useState<EmergencyLocation[]>([
    {
      id: 1,
      lat: 28.6139,
      lng: 77.209,
      type: "Medical Emergency",
      urgency: "critical",
      description: "Heart attack patient needs immediate attention",
      time: "2 min ago",
      status: "active",
    },
    {
      id: 2,
      lat: 28.6289,
      lng: 77.2065,
      type: "Food & Water",
      urgency: "medium",
      description: "Family of 5 needs food supplies",
      time: "15 min ago",
      status: "responding",
      assignedVolunteer: "John Doe",
    },
    {
      id: 3,
      lat: 28.6169,
      lng: 77.2295,
      type: "Evacuation",
      urgency: "high",
      description: "Building collapse, 3 people trapped",
      time: "5 min ago",
      status: "active",
    },
    {
      id: 4,
      lat: 28.6304,
      lng: 77.2177,
      type: "Shelter",
      urgency: "medium",
      description: "Homeless family needs temporary shelter",
      time: "30 min ago",
      status: "resolved",
    },
    {
      id: 5,
      lat: 28.6089,
      lng: 77.2134,
      type: "Medical Emergency",
      urgency: "high",
      description: "Injured person from accident",
      time: "8 min ago",
      status: "responding",
      assignedVolunteer: "Sarah Smith",
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setEmergencyLocations((prev) => {
        const updated = prev.map((location) => {
          if (Math.random() < 0.1) {
            const newTime = Math.floor(Math.random() * 60) + 1
            return {
              ...location,
              time: `${newTime} min ago`,
            }
          }
          return location
        })

        if (Math.random() < 0.05 && updated.length < 8) {
          const newEmergency: EmergencyLocation = {
            id: Date.now(),
            lat: 28.6 + Math.random() * 0.1,
            lng: 77.2 + Math.random() * 0.1,
            type: ["Medical Emergency", "Food & Water", "Evacuation", "Shelter"][Math.floor(Math.random() * 4)],
            urgency: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as any,
            description: "New emergency reported",
            time: "Just now",
            status: "active",
          }
          return [...updated, newEmergency]
        }

        return updated
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Initialize Leaflet map
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    // Load Leaflet dynamically
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link")
        link.rel = "stylesheet"
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(link)
      }

      // Load Leaflet JS
      if (!window.L) {
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        document.head.appendChild(script)

        await new Promise((resolve) => {
          script.onload = resolve
        })
      }

      // Initialize map
      if (window.L && mapRef.current && !leafletMapRef.current) {
        leafletMapRef.current = window.L.map(mapRef.current).setView([28.6139, 77.209], 13)

        // Add OpenStreetMap tiles
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
        }).addTo(leafletMapRef.current)

        setIsMapLoaded(true)
      }
    }

    loadLeaflet()

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [])

  // Update markers when emergency locations change
  useEffect(() => {
    if (!leafletMapRef.current || !window.L || !isMapLoaded) return

    // Clear existing markers
    markersRef.current.forEach((marker) => {
      leafletMapRef.current.removeLayer(marker)
    })
    markersRef.current = []

    // Add new markers
    emergencyLocations.forEach((location) => {
      const colors = {
        critical: "#ef4444",
        high: "#f97316",
        medium: "#eab308",
        low: "#22c55e",
      }

      const statusColors = {
        active: colors[location.urgency],
        responding: "#3b82f6",
        resolved: "#6b7280",
      }

      const color = statusColors[location.status]

      // Create custom icon
      const customIcon = window.L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            width: 24px;
            height: 24px;
            background-color: ${color};
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 10px;
            color: white;
            position: relative;
            ${location.urgency === "critical" && location.status === "active" ? "animation: pulse 2s infinite;" : ""}
          ">
            ${
              location.type === "Medical Emergency"
                ? "M"
                : location.type === "Food & Water"
                  ? "F"
                  : location.type === "Evacuation"
                    ? "E"
                    : "S"
            }
            ${
              location.urgency === "critical" && location.status === "active"
                ? `<div style="
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    right: -3px;
                    bottom: -3px;
                    border: 2px solid ${color};
                    border-radius: 50%;
                    opacity: 0.6;
                    animation: pulse-ring 2s infinite;
                  "></div>`
                : ""
            }
          </div>
          <style>
            @keyframes pulse-ring {
              0% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.5); opacity: 0.3; }
              100% { transform: scale(2); opacity: 0; }
            }
          </style>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const marker = window.L.marker([location.lat, location.lng], { icon: customIcon }).addTo(leafletMapRef.current)

      // Add popup
      const popupContent = `
        <div style="min-width: 200px; font-family: system-ui;">
          <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${location.type}</h3>
          <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${location.description}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="
              background: ${color}; 
              color: white; 
              padding: 2px 6px; 
              border-radius: 12px; 
              font-size: 10px; 
              font-weight: 600;
            ">${location.status.toUpperCase()}</span>
            <span style="font-size: 11px; color: #888;">${location.time}</span>
          </div>
          ${
            location.assignedVolunteer
              ? `<div style="background: #eff6ff; padding: 6px; border-radius: 4px; font-size: 11px; color: #1d4ed8;">
                   Assigned to: ${location.assignedVolunteer}
                 </div>`
              : ""
          }
          <div style="margin-top: 8px; font-size: 10px; color: #999;">
            ID: ${location.id} • Priority: ${location.urgency}
          </div>
        </div>
      `

      marker.bindPopup(popupContent)

      marker.on("click", () => {
        setSelectedMarker(location)
        onMarkerClick?.(location)
      })

      markersRef.current.push(marker)

      // Add volunteer markers for responding emergencies
      if (location.status === "responding" && location.assignedVolunteer) {
        const volunteerLat = location.lat + (Math.random() - 0.5) * 0.01
        const volunteerLng = location.lng + (Math.random() - 0.5) * 0.01

        const volunteerIcon = window.L.divIcon({
          className: "volunteer-marker",
          html: `
            <div style="
              width: 20px;
              height: 20px;
              background-color: #10b981;
              border: 2px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 8px;
              color: white;
            ">V</div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        })

        const volunteerMarker = window.L.marker([volunteerLat, volunteerLng], { icon: volunteerIcon }).addTo(
          leafletMapRef.current,
        )

        volunteerMarker.bindPopup(`
          <div style="font-family: system-ui;">
            <h4 style="margin: 0 0 4px 0; font-size: 12px;">Volunteer</h4>
            <p style="margin: 0; font-size: 11px; color: #666;">${location.assignedVolunteer}</p>
            <p style="margin: 4px 0 0 0; font-size: 10px; color: #10b981;">En route to ${location.type}</p>
          </div>
        `)

        // Draw line between volunteer and emergency
        const polyline = window.L.polyline(
          [
            [volunteerLat, volunteerLng],
            [location.lat, location.lng],
          ],
          {
            color: "#3b82f6",
            weight: 2,
            opacity: 0.7,
            dashArray: "5, 5",
          },
        ).addTo(leafletMapRef.current)

        markersRef.current.push(volunteerMarker, polyline)
      }
    })
  }, [emergencyLocations, isMapLoaded, onMarkerClick])

  const getStatusColor = (status: string) => {
    const colors = {
      active: "text-red-600 bg-red-50 border-red-200",
      responding: "text-blue-600 bg-blue-50 border-blue-200",
      resolved: "text-green-600 bg-green-50 border-green-200",
    }
    return colors[status as keyof typeof colors] || colors.active
  }

  const getUrgencyColor = (urgency: string) => {
    const colors = {
      critical: "text-red-600",
      high: "text-orange-600",
      medium: "text-yellow-600",
      low: "text-green-600",
    }
    return colors[urgency as keyof typeof colors] || colors.medium
  }

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: "400px" }} />

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading real map data...</p>
          </div>
        </div>
      )}

      {/* Real-time Status Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-4 py-2 shadow-lg border z-[1000]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live Map Data</span>
          <span className="text-xs text-gray-500">
            {emergencyLocations.filter((l) => l.status === "active").length} Active •{" "}
            {emergencyLocations.filter((l) => l.status === "responding").length} Responding
          </span>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-[1000]">
        <h3 className="font-semibold text-sm mb-3">Emergency Status</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Active Emergency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Help En Route</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Volunteer Position</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-xs">Resolved</span>
          </div>
        </div>
        <div className="mt-3 pt-2 border-t">
          <div className="text-xs text-gray-600">
            <div>M - Medical | F - Food</div>
            <div>E - Evacuation | S - Shelter</div>
          </div>
        </div>
      </div>

      {/* Emergency Counter */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000]">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{emergencyLocations.length}</div>
          <div className="text-xs text-gray-500">Total Emergencies</div>
        </div>
      </div>

      {/* Map Attribution */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded z-[1000]">
        Real-time Emergency Map
      </div>
    </div>
  )
}

// Declare global L for TypeScript
declare global {
  interface Window {
    L: any
  }
}

export default TrafficMap
