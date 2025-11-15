import { useEffect, useState } from 'react'
import { useMap } from '../../hooks/useMap.js'
import { useSocket } from '../../hooks/useSocket.js'
import { motion } from 'framer-motion'
import { formatETA, calculateETA } from '../../utils/formatters.js'

const TrackMap = ({ bookingId }) => {
  const [containerId] = useState(`map-${Date.now()}`)
  const { map, addTechnicianMarker, updateTechnicianPosition, animateRoute, calculateDistance, centerOnPosition } = useMap(containerId)
  const { socket, connected, technicianLocation, eta } = useSocket(import.meta.env.VITE_SOCKET_SERVER_URL)
  const [journey, setJourney] = useState(null)

  useEffect(() => {
    if (!map) return

    // Initialize technician marker
    const marker = addTechnicianMarker([40.7128, -74.0060])
    
    // Simulate route data
    const mockRoute = [
      [40.7128, -74.0060],
      [40.7138, -74.0070],
      [40.7148, -74.0080],
      [40.7158, -74.0090]
    ]
    
    animateRoute(mockRoute)
  }, [map])

  useEffect(() => {
    if (technicianLocation && map) {
      updateTechnicianPosition(technicianLocation.position, technicianLocation.heading)
      centerOnPosition(technicianLocation.position)
      
      // Calculate journey
      const mockDestination = [40.7158, -74.0090]
      const distance = calculateDistance(technicianLocation.position, mockDestination)
      const calculatedETA = calculateETA(distance)
      
      setJourney({
        distance: distance.toFixed(2),
        eta: eta || calculatedETA
      })
    }
  }, [technicianLocation, map])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Track Your Technician
        </h3>
        <motion.div
          animate={{
            backgroundColor: connected ? '#10b981' : '#ef4444'
          }}
          className="px-3 py-1 rounded-full text-white text-sm flex items-center"
        >
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
          {connected ? 'Live' : 'Connecting...'}
        </motion.div>
      </div>

      <div id={containerId} className="w-full h-96 rounded-xl shadow-lg overflow-hidden" />

      {journey && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 glass-card rounded-xl p-4"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Distance</p>
              <p className="text-xl font-bold text-primary-500">{journey.distance} km</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ETA</p>
              <motion.p 
                key={journey.eta}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-xl font-bold text-secondary-500"
              >
                {formatETA(journey.eta)}
              </motion.p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
              <p className="text-xl font-bold text-accent-500">En Route</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TrackMap