import { motion, AnimatePresence } from 'framer-motion'
import { useBooking } from '../../context/BookingContext.jsx'
import { formatCurrency } from '../../utils/formatters.js'

const StepReview = ({ onSuccess }) => {
  const { bookingData, confirmBooking, prevStep } = useBooking()
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = async () => {
    const result = await confirmBooking()
    if (result.success) {
      setConfirmed(true)
      onSuccess()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Booking Summary
        </h3>
        
        <div className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Device Information</h4>
            <p className="text-gray-600 dark:text-gray-400 capitalize">
              {bookingData.device.brand} {bookingData.device.model}
            </p>
            <p className="text-gray-600 dark:text-gray-400 capitalize">
              Issue: {bookingData.device.issue.replace('-', ' ')}
            </p>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Service Details</h4>
            <p className="text-gray-600 dark:text-gray-400">
              📍 {bookingData.location.address}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              🕐 {bookingData.location.timeSlot}
            </p>
            {bookingData.location.notes && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                📝 {bookingData.location.notes}
              </p>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Cost Estimate</h4>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
              className="text-3xl font-bold text-primary-500"
            >
              {formatCurrency(bookingData.estimatedCost)}
            </motion.div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Final price may vary after inspection
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {!confirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex gap-4"
          >
            <motion.button
              onClick={prevStep}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 glass-card px-6 py-3 rounded-xl"
            >
              Back
            </motion.button>
            <motion.button
              onClick={handleConfirm}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 btn-primary"
            >
              Confirm Booking
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {confirmed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="text-6xl mb-4"
          >
            ✅
          </motion.div>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Processing your booking...
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default StepReview