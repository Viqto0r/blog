import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { errorHandler, fetchStartHandler } from '../helpers'
import { db, getDocByUid } from '../../api/firebaseApi'
import { addAuthorInArticle } from './articlesSlice'
import { doc, updateDoc } from 'firebase/firestore'

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const getCurrentArticle = createAsyncThunk(
  'article/getArticle',
  async (pathname) => {
    try {
      const article = await getDocByUid('articles', pathname)
      return await addAuthorInArticle({ ...article, uid: pathname }, pathname)
    } catch (e) {
      console.log(e)
    }
  },
  {
    getPendingMeta: () => ({ initial: {} }),
  }
)

export const updateCurrentArticle = createAsyncThunk(
  'article/updateCurrentArticle',
  async ({ newData, uid }) => {
    try {
      const docRef = doc(db, 'articles', uid)
      await updateDoc(docRef, newData)
      return { ...newData, uid }
    } catch (e) {
      console.log(e)
    }
  }
)

const currentArticlesSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    clearCurrentArticle() {
      return initialState
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCurrentArticle.pending, fetchStartHandler)
      .addCase(getCurrentArticle.rejected, errorHandler)
      .addCase(getCurrentArticle.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.isLoading = false
        state.data = payload
      })

    builder
      .addCase(updateCurrentArticle.pending, fetchStartHandler)
      .addCase(updateCurrentArticle.rejected, errorHandler)
      .addCase(updateCurrentArticle.fulfilled, (state, { payload }) => {
        state.data = { ...state.data, ...payload }
        state.isLoading = false
      })
  },
})
export const getCurrentArticleSelector = createSelector(
  (state) => state.currentArticle,
  (state) => state.data
)
export const { clearCurrentArticle } = currentArticlesSlice.actions
export default currentArticlesSlice.reducer
