import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import UserPage from './pages/UserPage/UserPage'
import AdminPage from './pages/AdminPage/AdminPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <UserPage />,
  },
  {
    path: 'admin',
    element: <AdminPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
