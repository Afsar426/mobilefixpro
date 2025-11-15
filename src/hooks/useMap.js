import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-rotatedmarker'

export const useMap = (containerId) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState(null)
  const [technicianMarker, setTechnicianMarker] = useState(null)
  const [routeLine, setRouteLine] = useState(null)

  useEffect(() => {
    if (!containerId || mapRef.current) return

    const mapInstance = L.map(containerId, {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([40.7128, -74.0060], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapInstance)

    mapRef.current = mapInstance
    setMap(mapInstance)

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [containerId])

  const addTechnicianMarker = (position) => {
    if (!mapRef.current) return

    const customIcon = L.divIcon({
      className: 'pulse-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    })

    const marker = L.marker(position, {
      icon: customIcon,
      rotationAngle: 0
    }).addTo(mapRef.current)

    setTechnicianMarker(marker)
    return marker
  }

  const updateTechnicianPosition = (newPosition, heading) => {
    if (!technicianMarker) return

    const currentPos = technicianMarker.getLatLng()
    
    // Smooth interpolation
    const animationDuration = 1000 // 1 second
    const steps = 20
    const stepDuration = animationDuration / steps
    
    const latStep = (newPosition[0] - currentPos.lat) / steps
    const lngStep = (newPosition[1] - currentPos.lng) / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const interpolatedPos = [
        currentPos.lat + latStep * currentStep,
        currentPos.lng + lngStep * currentStep
      ]
      
      technicianMarker.setLatLng(interpolatedPos)
      technicianMarker.setRotationAngle(heading || 0)
      
      if (currentStep >= steps) {
        clearInterval(interval)
      }
    }, stepDuration)
  }

  const drawRoute = (coordinates) => {
    if (!mapRef.current) return

    if (routeLine) {
      mapRef.current.removeLayer(routeLine)
    }

    const polyline = L.polyline(coordinates, {
      color: '#0d9488',
      weight: 4,
      opacity: 0.8,
      smoothFactor: 1
    }).addTo(mapRef.current)

    setRouteLine(polyline)
    return polyline
  }

  const animateRoute = (coordinates, duration = 3000) => {
    if (!coordinates || coordinates.length < 2) return

    const polyline = drawRoute([coordinates[0]])
    const totalPoints = coordinates.length
    let currentPoint = 1

    const interval = setInterval(() => {
      if (currentPoint >= totalPoints) {
        clearInterval(interval)
        return
      }

      const segmentCoords = coordinates.slice(0, currentPoint + 1)
      polyline.setLatLngs(segmentCoords)
      currentPoint++
    }, duration / totalPoints)
  }

  const calculateDistance = (pos1, pos2) => {
    return mapRef.current.distance(pos1, pos2) / 1000 // Convert to km
  }

  const fitBounds = (bounds) => {
    if (!mapRef.current) return
    mapRef.current.fitBounds(bounds, { padding: [20, 20] })
  }

  const centerOnPosition = (position) => {
    if (!mapRef.current) return
    mapRef.current.panTo(position, { duration: 1 })
  }

  return {
    map,
    addTechnicianMarker,
    updateTechnicianPosition,
    drawRoute,
    animateRoute,
    calculateDistance,
    fitBounds,
    centerOnPosition
  }
}