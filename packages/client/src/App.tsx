import { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './AppRoutes'

function App() {
  // useEffect(() => {
  //   const fetchServerData = async () => {
  //     const url = `http://localhost:${__SERVER_PORT__}`
  //     const response = await fetch(url)
  //     const data = await response.json()
  //     console.log(data)
  //   }

  //   fetchServerData()
  // }, [])
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
