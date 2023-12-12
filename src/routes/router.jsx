import { createBrowserRouter } from 'react-router-dom'

import AdminPage from '../pages/AdminPage/AdminPage'
import UserPage from '../pages/UserPage/UserPage'

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

export default router
