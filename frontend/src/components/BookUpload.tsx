import { useState, useRef, type DragEvent } from 'react'
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
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${isDragging ? '#d4a853' : '#333'}`,
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          background: isDragging ? 'rgba(212, 168, 83, 0.05)' : 'transparent',
          transition: 'all 0.2s ease'
        }}
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

        {!uploading ? (
          <>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>📖</div>
            <p style={{ color: '#f0e6d3', fontSize: '15px', marginBottom: '4px', fontFamily: 'Georgia, serif' }}>
              Drop a PDF here, or click to browse
            </p>
            <p style={{ color: '#666', fontSize: '13px' }}>Max file size: 50MB</p>
          </>
        ) : (
          <>
            <p style={{ color: '#d4a853', fontSize: '14px', marginBottom: '12px', textTransform: 'capitalize' }}>
              {stage}...
            </p>
            <div style={{
              width: '100%',
              height: '6px',
              background: '#222',
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: '#d4a853',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </>
        )}
      </div>

      {error && (
        <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '12px', textAlign: 'center' }}>
          {error}
        </p>
      )}
    </div>
  )
}