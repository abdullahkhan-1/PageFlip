import { supabase } from './supabase'
import * as pdfjsLib from 'pdfjs-dist'
import type { Book } from '../types/database'

// Point PDF.js to its worker file (served from node_modules via Vite)
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).toString()

interface UploadProgress {
  stage: 'reading' | 'uploading' | 'thumbnail' | 'saving' | 'done'
  percent: number
}

export async function uploadBook(
  file: File,
  onProgress?: (p: UploadProgress) => void
): Promise<Book> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('You must be signed in to upload a book')

  // 1. Read the PDF to get page count + extract page 1 as a cover image
  onProgress?.({ stage: 'reading', percent: 10 })
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const pageCount = pdf.numPages

  // 2. Render first page to canvas for the cover thumbnail
  onProgress?.({ stage: 'thumbnail', percent: 30 })
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 1.0 })
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  canvas.width = viewport.width
  canvas.height = viewport.height
  await page.render({ canvasContext: context, viewport, canvas }).promise

  const coverBlob: Blob = await new Promise((resolve) =>
    canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.85)
  )

  // 3. Upload original PDF to storage at user_id/timestamp_filename.pdf
  onProgress?.({ stage: 'uploading', percent: 50 })
  const timestamp = Date.now()
  const safeFileName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const pdfPath = `${user.id}/${timestamp}_${safeFileName}`

  const { error: pdfUploadError } = await supabase.storage
    .from('books')
    .upload(pdfPath, file, { contentType: 'application/pdf' })

  if (pdfUploadError) throw pdfUploadError

  // 4. Upload the cover thumbnail
  onProgress?.({ stage: 'uploading', percent: 70 })
  const coverPath = `${user.id}/${timestamp}_cover.webp`

  const { error: coverUploadError } = await supabase.storage
    .from('books')
    .upload(coverPath, coverBlob, { contentType: 'image/webp' })

  if (coverUploadError) throw coverUploadError

  const { data: coverUrlData } = await supabase.storage
    .from('books')
    .createSignedUrl(coverPath, 60 * 60 * 24 * 7) // 7-day signed URL

  // 5. Save metadata row to the books table
  onProgress?.({ stage: 'saving', percent: 90 })
  const title = file.name.replace(/\.pdf$/i, '')

  const { data: bookRow, error: dbError } = await supabase
    .from('books')
    .insert({
      user_id: user.id,
      title,
      author: 'Unknown',
      page_count: pageCount,
      cover_url: coverUrlData?.signedUrl ?? null,
      file_path: pdfPath,
      current_page: 1
    })
    .select()
    .single()

  if (dbError) throw dbError

  onProgress?.({ stage: 'done', percent: 100 })
  return bookRow as Book
}

export async function getUserBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) throw error
  return data as Book[]
}

export async function deleteBook(book: Book): Promise<void> {
  await supabase.storage.from('books').remove([book.file_path])
  const { error } = await supabase.from('books').delete().eq('id', book.id)
  if (error) throw error
}