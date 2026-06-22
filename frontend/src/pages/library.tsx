import { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './Library.css'
import { supabase } from '../lib/supabase'
import { getUserBooks } from '../lib/books'
import BookUpload from '../components/BookUpload'
import BookCover from '../components/BookCover'
import BookSkeleton from '../components/BookSkeleton'
import LibraryToolbar from '../components/LibraryToolbar'
import type { Book } from '../types/database'

export default function Library() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'reading'>('all')
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const ambientY = useTransform(scrollY, [0, 900], [0, prefersReducedMotion ? 0 : -80])

  const loadBooks = async () => {
    setLoading(true)
    try {
      const data = await getUserBooks()
      setBooks(data)
    } catch (err) {
      console.error('Failed to load books:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Keep the existing mount-time load behavior while satisfying the React compiler lint rule.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBooks()
  }, [])

  const handleUploadComplete = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev])
    setShowUpload(false)
  }

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase())
      const progress = book.page_count > 0 ? book.current_page / book.page_count : 0

      if (filter === 'unread' && progress > 0) return false
      if (filter === 'reading' && (progress === 0 || progress >= 0.98)) return false

      return matchesSearch
    })
  }, [books, search, filter])

  return (
    <motion.div className="library-page">
      <motion.div className="library-ambient" style={{ y: ambientY }} aria-hidden="true" />
      <div className="library-shell">
        <motion.div
          className="library-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          <h1 className="library-title">Your Library</h1>
        </motion.div>

        <div className="library-control-panel">
          {!loading && books.length > 0 && (
            <LibraryToolbar
              search={search}
              onSearchChange={setSearch}
              filter={filter}
              onFilterChange={setFilter}
            />
          )}

          <div className="library-actions">
            <motion.button
              onClick={() => setShowUpload(!showUpload)}
              className="library-button library-button-primary"
              whileHover={prefersReducedMotion ? undefined : { y: -1, scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {showUpload ? 'Close' : '+ Add Book'}
            </motion.button>
            <motion.button
              onClick={() => supabase.auth.signOut()}
              className="library-button library-button-secondary"
              whileHover={prefersReducedMotion ? undefined : { y: -1 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              Log out
            </motion.button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {showUpload && (
            <motion.div
              className="library-upload-panel"
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <BookUpload onUploadComplete={handleUploadComplete} />
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="library-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: prefersReducedMotion ? 0 : i * 0.05 }}
              >
                <BookSkeleton />
              </motion.div>
            ))}
          </div>
        ) : books.length === 0 ? (
          <motion.div
            className="library-empty"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="library-candle"
              animate={prefersReducedMotion ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden="true"
            />
            <p className="library-empty-title">Your shelf is empty</p>
            <p className="library-empty-copy">Upload your first book to begin</p>
          </motion.div>
        ) : filteredBooks.length === 0 ? (
          <motion.div
            className="library-empty library-empty-filtered"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="library-empty-title">No books match your search</p>
            <p className="library-empty-copy">The restricted shelf remains quiet.</p>
          </motion.div>
        ) : (
          <div className="library-grid">
            <AnimatePresence mode="popLayout">
              {filteredBooks.map((book, index) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: index === 0 ? -28 : 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
                  transition={{
                    duration: 0.36,
                    ease: 'easeOut',
                    delay: prefersReducedMotion ? 0 : Math.min(index, 12) * 0.05
                  }}
                >
                  <BookCover
                    book={book}
                    onClick={() => console.log('Open book:', book.title)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  )
}
