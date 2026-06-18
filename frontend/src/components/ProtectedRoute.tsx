import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Auth from '../pages/Auth'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthenticated(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (authenticated === null) {
    return (
      <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#666', fontFamily: 'sans-serif' }}>Loading...</p>
      </div>
    )
  }

  if (!authenticated) return <Auth />

  return <>{children}</>
}