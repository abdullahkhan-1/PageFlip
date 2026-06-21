import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { getUserBooks } from '../lib/books'
import BookUpload from '../components/BookUpload'
import type { Book } from '../types/database'

export default function Library() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [showUpload, setShowUpload] = useState(false)

  useEffect(() => {
    loadBooks()
  }, [])

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

  const handleUploadComplete = (newBook: Book) => {
    setBooks((prev) => [newBook, ...prev])
    setShowUpload(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#d4a853', fontSize: '24px', fontFamily: 'Georgia, serif', fontWeight: 500 }}>
            📚 Your Library
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setShowUpload(!showUpload)}
              style={{
                padding: '9px 18px',
                background: '#d4a853',
                color: '#000',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {showUpload ? 'Cancel' : '+ Upload Book'}
            </button>
            <button
              onClick={() => supabase.auth.signOut()}
              style={{
                padding: '9px 18px',
                background: 'transparent',
                color: '#888',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Sign out
            </button>
          </div>
        </div>

        {showUpload && (
          <div style={{ marginBottom: '2rem' }}>
            <BookUpload onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {loading ? (
          <p style={{ color: '#666' }}>Loading your library...</p>
        ) : books.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#555' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🕯️</div>
            <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px' }}>Your shelf is empty</p>
            <p style={{ fontSize: '13px', marginTop: '6px' }}>Upload your first book to begin</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1.5rem'
          }}>
            {books.map((book) => (
              <div key={book.id} style={{ cursor: 'pointer' }}>
                <div style={{
                  aspectRatio: '3 / 4.2',
                  background: book.cover_url ? `url(${book.cover_url})` : '#1a1a1a',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '6px',
                  border: '1px solid #2a2a2a',
                  marginBottom: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                }} />
                <p style={{
                  color: '#f0e6d3',
                  fontSize: '13px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {book.title}
                </p>
                <p style={{ color: '#555', fontSize: '11px' }}>{book.page_count} pages</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}