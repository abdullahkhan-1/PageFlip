import ProtectedRoute from './components/ProtectedRoute'
import Library from './pages/library'

function App() {
  return (
    <ProtectedRoute>
      <Library />
    </ProtectedRoute>
  )
}

export default App