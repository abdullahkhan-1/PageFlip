import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface LibraryToolbarProps {
  search: string
  onSearchChange: (value: string) => void
  filter: 'all' | 'unread' | 'reading'
  onFilterChange: (value: 'all' | 'unread' | 'reading') => void
}

export default function LibraryToolbar({ search, onSearchChange, filter, onFilterChange }: LibraryToolbarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const prefersReducedMotion = useReducedMotion()
  const filters: { key: 'all' | 'unread' | 'reading'; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'reading', label: 'Reading' },
    { key: 'unread', label: 'Unread' }
  ]

  return (
    <motion.div
      className="library-toolbar"
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="library-search-wrap">
        <motion.div
          className="library-search-glow"
          initial={false}
          animate={{
            opacity: isSearchFocused ? 1 : 0,
            scale: prefersReducedMotion ? 1 : isSearchFocused ? 1 : 0.86
          }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
        />
        <input
          type="text"
          placeholder="Search titles..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className="library-search"
        />
      </div>
      <div className="library-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => onFilterChange(f.key)}
            className={`library-filter-button${filter === f.key ? ' is-active' : ''}`}
          >
            {filter === f.key && (
              <motion.span
                className="library-filter-indicator"
                layoutId="library-filter-indicator"
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            {f.label}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
