import { createBrowserRouter } from 'react-router-dom'

import AdminPage from '../pages/AdminPage/AdminPage'
import UserPage from '../pages/UserPage/UserPage'
import ArticlePage from '../pages/ArticlePage/ArticlePage'
import ArticleCardsList from '../components/Article/ArticleCardsList/ArticlesCardList'

ArticleCardsList

const router = createBrowserRouter([
  {
    path: '',
    element: <UserPage />,
    children: [
      {
        path: ':categories?',
        element: <ArticleCardsList />,
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
