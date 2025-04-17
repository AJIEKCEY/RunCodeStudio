import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRoutes'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
