import { Outlet, createBrowserRouter } from 'react-router-dom'

import AdminPage from '../pages/AdminPage/AdminPage'
import UserPage from '../pages/UserPage/UserPage'
import UserPageMain from '../components/Main/UserPageMain/UserPageMain'
import Main from '../components/Main/Main'
import ArticlesList from '../components/ArticlesList/ArticlesLIst'
import ArticlePage from '../pages/ArticlePage/ArticlePage'

// Сделать страницу статьи

const router = createBrowserRouter([
  {
    path: '',
    element: <UserPage />,
    children: [
      {
        path: ':categories?',
        element: <ArticlesList />,
      },
      {
        path: 'article/:uid',
        element: <ArticlePage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <AdminPage />,
  },
])

export default router
