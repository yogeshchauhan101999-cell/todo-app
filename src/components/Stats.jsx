import React from 'react'

/**
 * Displays total, completed, and pending task counts.
 * Recalculated automatically by the parent on every todos change.
 */
function Stats({ todos }) {
  const total = todos.length
  const completed = todos.filter((todo) => todo.completed).length
  const pending = total - completed

  const cards = [
    { label: 'Total Tasks', value: total, icon: 'list', tone: 'tone-indigo' },
    { label: 'Completed', value: completed, icon: 'check', tone: 'tone-green' },
    { label: 'Pending', value: pending, icon: 'clock', tone: 'tone-amber' },
  ]

  return (
    <section className="stats" aria-label="Task statistics">
      {cards.map((card) => (
        <div className={`stat-card ${card.tone}`} key={card.label}>
          <div className="stat-icon" aria-hidden="true">
            {card.icon === 'list' && (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {card.icon === 'check' && (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M4 12l5 5L20 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {card.icon === 'clock' && (
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </div>
          <div className="stat-body">
            <span className="stat-value">{card.value}</span>
            <span className="stat-label">{card.label}</span>
          </div>
        </div>
      ))}
    </section>
  )
}

export default Stats
