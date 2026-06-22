import { useRef, useState, type MouseEvent } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Book } from '../types/database'

interface BookCoverProps {
  book: Book
  onClick: () => void
}

export default function BookCover({ book, onClick }: BookCoverProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return

    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    // Max tilt of 10 degrees, inverted so it tilts toward the cursor
    const rotateY = ((x - centerX) / centerX) * 10
    const rotateX = -((y - centerY) / centerY) * 10

    setTilt({ x: rotateX, y: rotateY })
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
  }

  const progressPercent = book.page_count > 0
    ? Math.round((book.current_page / book.page_count) * 100)
    : 0

  const idleDelay = (book.id.charCodeAt(0) % 6) * 0.22

  return (
    <motion.div
      onClick={onClick}
      className="book-cover-shell"
      animate={prefersReducedMotion || isHovering ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: idleDelay }}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="book-cover-card"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${isHovering ? 'translateZ(8px)' : 'translateZ(0)'}`,
          transition: isHovering ? 'transform 0.1s ease-out' : 'transform 0.4s ease-out'
        }}
      >
        <div
          className="book-cover-image"
          style={{
            backgroundImage: book.cover_url ? `url(${book.cover_url})` : 'linear-gradient(145deg, #2d1b4e, #4a0e0e 62%, #16100d)',
            boxShadow: isHovering
              ? '0 24px 48px rgba(0,0,0,0.68), 0 0 34px rgba(212,168,83,0.24)'
              : '0 8px 18px rgba(0,0,0,0.48), 0 0 18px rgba(45,27,78,0.2)'
          }}
        >
          <motion.div
            className="book-cover-sheen"
            initial={false}
            animate={isHovering && !prefersReducedMotion
              ? { opacity: 1, x: ['-120%', '120%'] }
              : { opacity: 0, x: '-120%' }}
            transition={{ duration: 0.72, ease: 'easeOut' }}
          />

          <div className="book-cover-spine" />
        </div>

        {progressPercent > 0 && (
          <div className="book-progress">
            <svg width="28" height="28">
              <circle cx="14" cy="14" r="11" fill="rgba(10,8,20,0.7)" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <motion.circle
                cx="14"
                cy="14"
                r="11"
                fill="none"
                stroke="#d4a853"
                strokeWidth="2.5"
                strokeDasharray={`${2 * Math.PI * 11}`}
                initial={prefersReducedMotion ? false : { strokeDashoffset: `${2 * Math.PI * 11}` }}
                animate={{ strokeDashoffset: `${2 * Math.PI * 11 * (1 - progressPercent / 100)}` }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <span className="book-progress-label">
              {progressPercent}
            </span>
          </div>
        )}
      </div>

      <p className="book-title">
        {book.title}
      </p>
      <p className="book-meta">
        {book.page_count} pages
      </p>
    </motion.div>
  )
}
