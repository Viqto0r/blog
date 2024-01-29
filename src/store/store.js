import { configureStore } from '@reduxjs/toolkit'
import currentUser from './slices/currentUserSlice'
import usersData from './slices/usersSlice'
import articlesList from './slices/articlesSlice'
import currentArticle from './slices/currentArticleSlice'

export const store = configureStore({
  reducer: {
    currentUser,
    usersData,
    articlesList,
    currentArticle,
  },
})
