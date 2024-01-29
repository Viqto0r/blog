import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { errorHandler, fetchStartHandler } from '../helpers'
import { getCollection, getDocByUid } from '../../api/firebaseApi'

export const addAuthorInArticle = async ({ authorUid, uid, ...article }) => {
  console.log(uid)
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
      console.log(articles)
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
        console.log(payload)
        state.isLoading = false
        state.data = payload
      })
  },
})

export default articlesSlice.reducer
