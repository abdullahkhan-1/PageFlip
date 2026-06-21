import ProtectedRoute from './components/ProtectedRoute'
import Library from './pages/Library'

function App() {
  return (
    <ProtectedRoute>
      <Library />
    </ProtectedRoute>
  )
}

export default App