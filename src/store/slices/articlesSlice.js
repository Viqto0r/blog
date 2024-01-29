import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { errorHandler, fetchStartHandler } from '../helpers'
import { getCollection, getDocByUid } from '../../api/firebaseApi'

export const addAuthorInArticle = async ({ authorUid, uid, ...article }) => {
  const { email, role, avatar = '' } = await getDocByUid('users', authorUid)
  return { ...article, uid, author: { email, role, avatar, uid: authorUid } }
}

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (categoryValue) => {
    try {
      const articles = await getCollection('articles', {
        key: 'category',
        value: categoryValue,
      })
      return await Promise.all(
        articles.map((article) => addAuthorInArticle(article))
      )
    } catch (e) {
      console.log(e)
    }
  },
  {
    getPendingMeta: () => ({ initial: [] }),
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArticles.pending, fetchStartHandler)
      .addCase(getArticles.rejected, errorHandler)
      .addCase(getArticles.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload
      })
  },
})

export const getArticlesSelector = createSelector(
  (state) => state.articlesList,
  (state) => state.data
)
export default articlesSlice.reducer
