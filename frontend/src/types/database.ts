export interface Book {
    id: string
    user_id: string
    title: string
    author: string
    page_count: number
    cover_url: string | null
    file_path: string
    current_page: number
    created_at: string
    updated_at: string
  }
  
  export interface User {
    id: string
    email: string
  }