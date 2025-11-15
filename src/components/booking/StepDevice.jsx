import { motion } from 'framer-motion'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext.jsx'

const deviceBrands = [
  { value: 'apple', label: '🍎 Apple' },
  { value: 'samsung', label: '📱 Samsung' },
  { value: 'google', label: '🟢 Google' },
  { value: 'other', label: '⚡ Other' }
]

const issues = [
  { value: 'screen', label: '💔 Cracked Screen', price: '2000' },
  { value: 'battery', label: '🔋 Battery Replacement', price: '800' },
  { value: 'charging', label: '🔌 Charging Port', price: '400' },
  { value: 'water-damage', label: '💧 Water Damage', price: '3200' },
  { value: 'camera', label: '📷 Camera Issue', price: '4000' },
  { value: 'other', label: '❓ Other', price: 'Quote' }
]

const StepDevice = () => {
  const { bookingData, updateDevice, nextStep } = useBooking()
  const [formData, setFormData] = useState(bookingData.device)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateDevice(formData)
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
          Device Brand
        </label>
        <div className="grid grid-cols-2 gap-4">
          {deviceBrands.map(brand => (
            <motion.div
              key={brand.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="radio"
                id={brand.value}
                name="brand"
                value={brand.value}
                checked={formData.brand === brand.value}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="sr-only"
              />
              <label
                htmlFor={brand.value}
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.brand === brand.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                }`}
              >
                <span className="text-lg">{brand.label}</span>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Device Model
        </label>
        <input
          type="text"
          value={formData.model}
          onChange={(e) => setFormData({ ...formData, model: e.target.value })}
          placeholder="e.g., iPhone 14 Pro"
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Issue Type
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {issues.map(issue => (
            <motion.div
              key={issue.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="radio"
                id={issue.value}
                name="issue"
                value={issue.value}
                checked={formData.issue === issue.value}
                onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                className="sr-only"
              />
              <label
                htmlFor={issue.value}
                className={`block p-4 border rounded-xl cursor-pointer transition-all ${
                  formData.issue === issue.value
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
                }`}
              >
                <div className="font-medium">{issue.label}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{issue.price}</div>
              </label>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        type="submit"
        disabled={!formData.brand || !formData.model || !formData.issue}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue to Location
      </motion.button>
    </motion.form>
  )
}

export default StepDevice