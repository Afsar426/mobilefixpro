const QuickActions = ({ onAction }) => {
  const actions = [
    { id: 'book-repair', label: '📅 Book Repair', action: 'book-repair' },
    { id: 'get-estimate', label: '💰 Get Estimate', action: 'get-estimate' },
    { id: 'track-tech', label: '📍 Track Tech', action: 'track-tech' },
    { id: 'common-issues', label: '🔧 Common Issues', action: 'common-issues' }
  ]

  return (
    <div className="p-4 pt-2 border-t border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick Actions:</p>
      <div className="flex flex-wrap gap-2">
        {actions.map(({ id, label, action }) => (
          <button
            key={id}
            onClick={() => onAction(action)}
            className="px-3 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full text-xs hover:bg-primary-200 dark:hover:bg-primary-900/60 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default QuickActions