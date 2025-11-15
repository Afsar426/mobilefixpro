const TypingIndicator = () => {
  return (
    <div className="flex justify-start">
      <div className="px-4 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 rounded-bl-sm">
        <div className="typing-indicator flex space-x-1">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator