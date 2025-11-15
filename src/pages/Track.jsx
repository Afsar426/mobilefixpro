import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import TrackMap from '../components/tracking/TrackMap.jsx'
import { useToast } from '../hooks/useToast.js'

const Track = () => {
  const { bookingId } = useParams()
  const [technician, setTechnician] = useState(null)
  const { toast, showToast } = useToast()

  useEffect(() => {
    // Simulate loading technician data
    setTimeout(() => {
      setTechnician({
        name: 'Afshu',
        rating: 4.9,
        phone: '+91 7667208713',
        vehicle: 'Honda Civic - Blue',
        plate: 'BR-456',
        position: [40.7128, -74.0060]
      })
    }, 1000)

    // Request location updates
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          showToast('Location shared for better tracking', 'success')
        },
        () => {
          showToast('Enable location for live tracking', 'warning')
        }
      )
    }
  }, [bookingId, showToast])

  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-4">
            Track Your Repair
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Real-time technician location for booking #{bookingId || 'MFP-12345'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <TrackMap bookingId={bookingId} />
            </motion.div>
          </div>

          {/* Technician Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <AnimatePresence>
              {technician ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="glass-card rounded-2xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Technician Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Name</p>
                      <p className="font-bold text-lg">{technician.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Rating</p>
                      <p className="font-bold">⭐ {technician.rating}/5.0</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Vehicle</p>
                      <p className="font-bold">{technician.vehicle}</p>
                      <p className="text-sm text-gray-500">{technician.plate}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Contact</p>
                      <motion.a
                        href={`tel:${technician.phone}`}
                        whileHover={{ scale: 1.05 }}
                        className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg"
                      >
                        📞 Call Technician
                      </motion.a>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full glass-card px-4 py-3 rounded-xl"
                      onClick={() => showToast('Cancel request sent', 'info')}
                    >
                      Cancel Booking
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className="glass-card rounded-2xl p-6 text-center"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-gray-600 dark:text-gray-400">Loading technician info...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Status Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-card rounded-2xl p-6"
            >
              <h4 className="font-bold text-gray-900 dark:text-white mb-4">Status Updates</h4>
              <div className="space-y-3 text-sm">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-green-500">✓</span>
                  <span className="text-gray-600 dark:text-gray-400">Technician assigned</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <span className="text-blue-500 animate-pulse">⏳</span>
                  <span className="text-gray-600 dark:text-gray-400">En route to your location</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-3 opacity-50"
                >
                  <span className="text-gray-400">○</span>
                  <span className="text-gray-400">Arrival at location</span>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-3 opacity-50"
                >
                  <span className="text-gray-400">○</span>
                  <span className="text-gray-400">Repair completed</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed bottom-6 left-6 px-6 py-3 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : 
              toast.type === 'warning' ? 'bg-yellow-500' : 
              'bg-blue-500'
            } text-white font-bold`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Track