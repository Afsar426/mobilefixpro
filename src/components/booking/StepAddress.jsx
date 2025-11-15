import { motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext.jsx'

const timeSlots = [
  'Today, 9:00 AM - 11:00 AM',
  'Today, 11:00 AM - 1:00 PM',
  'Today, 1:00 PM - 3:00 PM',
  'Tomorrow, 9:00 AM - 11:00 AM',
  'Tomorrow, 11:00 AM - 1:00 PM'
]

const StepAddress = () => {
  const { bookingData, updateLocation, nextStep, prevStep } = useBooking()
  const [formData, setFormData] = useState(bookingData.location)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateLocation(formData)
    nextStep()
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Service Address
        </label>
        <textarea
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Enter your full address..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Preferred Time Slot
        </label>
        <div className="grid grid-cols-1 gap-3">
          {timeSlots.map(slot => (
            <motion.div
              key={slot}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                id={slot}
                name="timeSlot"
                value={slot}
                checked={formData.timeSlot === slot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="sr-only"
              />
              <label
                htmlFor={slot}
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.timeSlot === slot
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                }`}
              >
                {slot}
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Additional Notes (Optional)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any specific instructions..."
          rows={2}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      <div className="flex gap-4">
        <motion.button
          type="button"
          onClick={prevStep}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 glass-card px-6 py-3 rounded-xl"
        >
          Back
        </motion.button>
        <motion.button
          type="submit"
          disabled={!formData.address || !formData.timeSlot}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Review Booking
        </motion.button>
      </div>
    </motion.form>
  )
}

export default StepAddress