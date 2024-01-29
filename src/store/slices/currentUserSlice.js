import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db, getDocByUid } from '../../api/firebaseApi'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { errorHandler, fetchStartHandler } from '../helpers'

const initialState = {
  data: {
    email: null,
    role: 'guest',
    uid: null,
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const login = createAsyncThunk(
  'currentUser/login',
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    await getDocByUid('users', user.uid)
  }
)

export const logout = createAsyncThunk('currentUser/logout', async () => {
  await signOut(auth)
})

const filterUserData = ({ agreement, confirm, ...rest }) => rest

export const registerUser = createAsyncThunk(
  'currentUser/registerUser',
  async (userData) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
    const filteredUserData = filterUserData(userData)

    await setDoc(doc(db, 'users', user.uid), filteredUserData)
  }
)

export const getCurrentUser = createAsyncThunk(
  'currentUser/getCurrentUser',
  async (uid) => {
    const currentUser = await getDocByUid('users', uid)
    return { ...currentUser, uid }
  }
)

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    changeCurrentUserData: (state, { payload }) => {
      state.data = { ...state.data, ...payload }
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, fetchStartHandler)
      .addCase(login.rejected, errorHandler)
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false
      })

    builder
      .addCase(logout.pending, fetchStartHandler)
      .addCase(logout.rejected, errorHandler)
      .addCase(logout.fulfilled, () => {
        return initialState
      })

    builder
      .addCase(getCurrentUser.pending, fetchStartHandler)
      .addCase(getCurrentUser.rejected, errorHandler)
      .addCase(getCurrentUser.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.data = payload
      })

    builder
      .addCase(registerUser.pending, fetchStartHandler)
      .addCase(registerUser.rejected, errorHandler)
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
      })
  },
})
export const { changeCurrentUserData } = currentUserSlice.actions

export default currentUserSlice.reducer
