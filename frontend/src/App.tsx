import { supabase } from './lib/supabase'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', background: '#0f0f0f', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h1 style={{ color: '#d4a853', fontFamily: 'sans-serif' }}>📚 Book Reader — Library coming soon</h1>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{ padding: '8px 16px', background: '#2a2a2a', color: '#aaa', border: '1px solid #333', borderRadius: '8px', cursor: 'pointer', fontFamily: 'sans-serif' }}
        >
          Sign out
        </button>
      </div>
    </ProtectedRoute>
  )
}

export default App