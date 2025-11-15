import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useChatAI } from '../../hooks/useChatAI.jsx'
import ChatBubble from './ChatBubble.jsx'
import TypingIndicator from './TypingIndicator.jsx'
import QuickActions from './QuickActions.jsx'

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, isTyping, sendMessage, quickAction } = useChatAI()

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary-500 rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen 
            ? '0 0 0 0 rgba(13, 148, 136, 0.7)'
            : ['0 0 0 0 rgba(13, 148, 136, 0.7)', '0 0 0 20px rgba(13, 148, 136, 0)', '0 0 0 0 rgba(13, 148, 136, 0)']
        }}
        transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 90 : 0 }}
          className="text-2xl"
        >
          🤖
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] glass-card rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-500 text-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">MobileFixPro AI</h3>
                  <p className="text-xs opacity-90">Online</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-xl hover:rotate-90 transition-transform"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[calc(100%-140px)] overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map(message => (
                  <ChatBubble key={message.id} message={message} />
                ))}
              </AnimatePresence>
              {isTyping && <TypingIndicator />}
            </div>

            {/* Quick Actions */}
            <QuickActions onAction={quickAction} />

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg"
                  disabled={!input.trim() || isTyping}
                >
                  Send
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatBot