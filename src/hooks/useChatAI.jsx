import { useState } from 'react'
import { apiClient } from '../utils/apiClient'

export const useChatAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hi! I\'m MobileFixPro AI. I can help diagnose phone issues, provide repair estimates, and book a technician. What seems to be the problem?',
      timestamp: Date.now()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = async (userMessage) => {
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMsg])
    setIsTyping(true)

    try {
      // In production, move this to a backend API route
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are MobileFixPro AI Assistant. You diagnose phone issues, estimate repair costs, assist in booking technicians, and provide helpful repair advice. Keep messages short, friendly, and actionable. Always include a CTA button if relevant: [Book Now], [Get Estimate], [Track Technician].'
            },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          stream: false,
          max_tokens: 150
        })
      })

      const data = await response.json()
      const aiResponse = data.choices[0].message.content

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, aiMsg])
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting. Please try again or call us directly.',
        timestamp: Date.now()
      }])
    } finally {
      setIsTyping(false)
    }
  }

  const quickAction = (action) => {
    const actions = {
      'book-repair': 'I want to book a repair',
      'get-estimate': 'How much does screen repair cost?',
      'track-tech': 'Where is my technician?'
    }
    sendMessage(actions[action] || action)
  }

  return {
    messages,
    isTyping,
    sendMessage,
    quickAction
  }
}