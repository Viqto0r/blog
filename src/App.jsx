import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Spin } from 'antd'

import router from './routes/router'
import useAuth from './hooks/useAuth'

function App() {
  const { authHandler, loading } = useAuth()
  console.log(loading)
  useEffect(() => {
    authHandler()
  }, [])

  return loading ? <Spin /> : <RouterProvider router={router} />
}

export default App
