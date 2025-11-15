import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (serverUrl) => {
  const socketRef = useRef(null)
  const [connected, setConnected] = useState(false)
  const [technicianLocation, setTechnicianLocation] = useState(null)
  const [eta, setEta] = useState(null)

  useEffect(() => {
    if (!serverUrl) return

    const socket = io(serverUrl, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5
    })

    socketRef.current = socket

    socket.on('connect', () => {
      setConnected(true)
      console.log('Socket connected:', socket.id)
    })

    socket.on('disconnect', () => {
      setConnected(false)
    })

    socket.on('technician-location', (data) => {
      setTechnicianLocation({
        position: [data.lat, data.lng],
        heading: data.heading,
        timestamp: data.timestamp
      })
    })

    socket.on('eta-update', (data) => {
      setEta(data.eta)
    })

    return () => {
      socket.disconnect()
    }
  }, [serverUrl])

  const sendLocationUpdate = (location) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('customer-location', location)
    }
  }

  return {
    socket: socketRef.current,
    connected,
    technicianLocation,
    eta,
    sendLocationUpdate
  }
}