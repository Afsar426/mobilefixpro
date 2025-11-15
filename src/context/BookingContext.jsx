import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export const useBooking = () => useContext(BookingContext)

export function BookingProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    device: {
      brand: '',
      model: '',
      issue: ''
    },
    location: {
      address: '',
      timeSlot: '',
      notes: ''
    },
    estimatedCost: 0
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const calculateEstimate = (device, issue) => {
    const basePrices = {
      'screen': 150,
      'battery': 80,
      'charging': 90,
      'water-damage': 200,
      'camera': 120,
      'other': 100
    }
    
    const brandMultiplier = {
      'apple': 1.5,
      'samsung': 1.3,
      'google': 1.2,
      'other': 1.0
    }

    const base = basePrices[issue] || 100
    const multiplier = brandMultiplier[device.brand] || 1.0
    
    return Math.round(base * multiplier)
  }

  const updateDevice = (deviceData) => {
    const cost = calculateEstimate(deviceData, deviceData.issue)
    setBookingData(prev => ({
      ...prev,
      device: deviceData,
      estimatedCost: cost
    }))
  }

  const updateLocation = (locationData) => {
    setBookingData(prev => ({
      ...prev,
      location: locationData
    }))
  }

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4))
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1))
  
  const resetBooking = () => {
    setCurrentStep(1)
    setBookingData({
      device: { brand: '', model: '', issue: '' },
      location: { address: '', timeSlot: '', notes: '' },
      estimatedCost: 0
    })
  }

  const confirmBooking = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    return { success: true, bookingId: 'MFP-' + Date.now() }
  }

  return (
    <BookingContext.Provider value={{
      currentStep,
      bookingData,
      isSubmitting,
      updateDevice,
      updateLocation,
      nextStep,
      prevStep,
      resetBooking,
      confirmBooking
    }}>
      {children}
    </BookingContext.Provider>
  )
}