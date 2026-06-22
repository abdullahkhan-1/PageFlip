import { useState, useRef, type DragEvent } from 'react'
import confetti from 'canvas-confetti'
import { motion, useReducedMotion } from 'framer-motion'
import { uploadBook } from '../lib/books'
import type { Book } from '../types/database'

interface BookUploadProps {
  onUploadComplete: (book: Book) => void
}

export default function BookUpload({ onUploadComplete }: BookUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('')
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const fireUploadSparkles = () => {
    if (prefersReducedMotion || typeof window === 'undefined') return

    const rect = dropzoneRef.current?.getBoundingClientRect()
    const origin = rect
      ? {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height * 0.38) / window.innerHeight
      }
      : { x: 0.5, y: 0.35 }

    confetti({
      particleCount: 44,
      spread: 58,
      startVelocity: 26,
      gravity: 0.85,
      scalar: 0.72,
      ticks: 120,
      origin,
      colors: ['#d4a853', '#f0e6d3', '#fff0a8', '#8b6a2e']
    })
  }

  const handleFile = async (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file')
      return
    }
    if (file.size > 50 * 1024 * 1024) {
      setError('File must be under 50MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const book = await uploadBook(file, (p) => {
        setProgress(p.percent)
        setStage(p.stage)
      })
      fireUploadSparkles()
      onUploadComplete(book)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  return (
    <div className="book-upload">
      <motion.div
        ref={dropzoneRef}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`book-upload-dropzone${isDragging ? ' is-dragging' : ''}`}
        animate={prefersReducedMotion
          ? undefined
          : {
            scale: isDragging ? 1.012 : 1,
            boxShadow: isDragging
              ? '0 0 42px rgba(212,168,83,0.24), inset 0 0 48px rgba(74,14,14,0.28)'
              : 'inset 0 0 38px rgba(45,27,78,0.22)'
          }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
          }}
        />

        <div className="book-upload-content">
          {!uploading ? (
            <>
              <motion.div
                className="book-upload-icon"
                animate={prefersReducedMotion ? undefined : { y: [0, -4, 0], rotate: [-1, 1, -1] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                PDF
              </motion.div>
              <p className="book-upload-title">
                Drop a PDF here, or click to browse
              </p>
              <p className="book-upload-copy">Max file size: 50MB</p>
            </>
          ) : (
            <>
              <p className="book-upload-stage">
                {stage}...
              </p>
              <div className="book-upload-progress">
                <motion.div
                  className="book-upload-progress-bar"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
            </>
          )}
        </div>
      </motion.div>

      {error && (
        <motion.p
          className="book-upload-error"
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}
