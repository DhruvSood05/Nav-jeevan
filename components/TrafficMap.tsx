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
  const [mapError, setMapError] = useState<string | null>(null)
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
  ])

  // Initialize OpenStreetMap with Leaflet
  useEffect(() => {
    if (typeof window === "undefined" || !mapRef.current) return

    const initializeMap = async () => {
      try {
        // Add Leaflet CSS if not already present
        if (!document.querySelector('link[href*="leaflet"]')) {
          const link = document.createElement("link")
          link.rel = "stylesheet"
          link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          document.head.appendChild(link)
        }

        // Load Leaflet JS if not already loaded
        if (!window.L) {
          const script = document.createElement("script")
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
          document.head.appendChild(script)

          await new Promise((resolve) => {
            script.onload = resolve
          })
        }

        // Initialize Leaflet map
        if (window.L && mapRef.current && !leafletMapRef.current) {
          leafletMapRef.current = window.L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: true,
          }).setView([28.6139, 77.209], 13)

          // Add OpenStreetMap tiles
          window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(leafletMapRef.current)

          setIsMapLoaded(true)
          setMapError(null)
        }
      } catch (error) {
        console.error("Error loading map:", error)
        setMapError("Failed to load map")
      }
    }

    initializeMap()

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

      try {
        const customIcon = window.L.divIcon({
          className: "custom-marker",
          html: `
            <div style="
              width: 32px;
              height: 32px;
              background-color: ${color};
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              display: flex;
              align-items: center;
              justify-content: center;
              font-weight: bold;
              font-size: 12px;
              color: white;
              position: relative;
              cursor: pointer;
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
            </div>
            <style>
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            </style>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        })

        const marker = window.L.marker([location.lat, location.lng], { icon: customIcon }).addTo(leafletMapRef.current)

        const popupContent = `
          <div style="min-width: 200px; font-family: system-ui; padding: 8px;">
            <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1f2937;">${location.type}</h3>
            <p style="margin: 0 0 8px 0; font-size: 14px; color: #6b7280;">${location.description}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="
                background: ${color}; 
                color: white; 
                padding: 4px 8px; 
                border-radius: 12px; 
                font-size: 12px; 
                font-weight: 600;
              ">${location.status.toUpperCase()}</span>
              <span style="font-size: 12px; color: #9ca3af;">${location.time}</span>
            </div>
            ${
              location.assignedVolunteer
                ? `<div style="background: #eff6ff; padding: 8px; border-radius: 6px; font-size: 12px; color: #1d4ed8; margin-top: 8px;">
                     👤 Assigned to: ${location.assignedVolunteer}
                   </div>`
                : ""
            }
            <div style="margin-top: 8px; font-size: 11px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 8px;">
              ID: ${location.id} • Priority: ${location.urgency.toUpperCase()}
            </div>
          </div>
        `

        marker.bindPopup(popupContent, {
          maxWidth: 300,
          className: "custom-popup",
        })

        marker.on("click", () => {
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
                width: 24px;
                height: 24px;
                background-color: #10b981;
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                font-size: 10px;
                color: white;
                cursor: pointer;
              ">👤</div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })

          const volunteerMarker = window.L.marker([volunteerLat, volunteerLng], { icon: volunteerIcon }).addTo(
            leafletMapRef.current,
          )

          volunteerMarker.bindPopup(`
            <div style="font-family: system-ui; padding: 8px;">
              <h4 style="margin: 0 0 4px 0; font-size: 14px; color: #1f2937;">Volunteer</h4>
              <p style="margin: 0; font-size: 12px; color: #6b7280;">${location.assignedVolunteer}</p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #10b981;">🚗 En route to ${location.type}</p>
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
              weight: 3,
              opacity: 0.7,
              dashArray: "10, 5",
            },
          ).addTo(leafletMapRef.current)

          markersRef.current.push(volunteerMarker, polyline)
        }
      } catch (error) {
        console.warn("Error adding marker:", error)
      }
    })
  }, [emergencyLocations, isMapLoaded, onMarkerClick])

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

  return (
    <div className="w-full h-full relative">
      <div ref={mapRef} className="w-full h-full" style={{ minHeight: "400px" }} />

      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading emergency map...</p>
            {mapError && <p className="text-sm text-red-600 mt-2">{mapError}</p>}
          </div>
        </div>
      )}

      {/* Real-time Status Indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-2 shadow-lg border z-[1000] text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live Emergency Data</span>
          <span className="text-gray-500 hidden sm:inline">
            {emergencyLocations.filter((l) => l.status === "active").length} Active •{" "}
            {emergencyLocations.filter((l) => l.status === "responding").length} Responding
          </span>
        </div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs z-[1000] text-xs">
        <h3 className="font-semibold mb-2">Emergency Types</h3>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>M - Medical Emergency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>F - Food & Water</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>E - Evacuation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>S - Shelter</span>
          </div>
        </div>
      </div>

      {/* Emergency Counter */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 z-[1000] text-center">
        <div className="text-xl font-bold text-gray-800">{emergencyLocations.length}</div>
        <div className="text-xs text-gray-500">Total Emergencies</div>
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
