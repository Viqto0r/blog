import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db, getUserByUid } from '../../api/firebaseApi'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

const initialState = {
  currentUser: {
    email: null,
    role: 'guest',
  },
  isLoading: false,
  isError: false,
  errorMessage: '',
}

export const login = createAsyncThunk(
  'currentUser/login',
  async ({ email, password }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    await getUserByUid(user.uid)
  }
)

export const logout = createAsyncThunk('currentUser/logout', async () => {
  await signOut(auth)
})

const filterUserData = ({ agreement, confirm, ...rest }) => rest

export const registerUser = createAsyncThunk(
  'currentUser/registerUser',
  async (userData) => {
    const filteredUserData = filterUserData(userData)

    const { user } = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    )
    await setDoc(doc(db, 'users', user.uid), filteredUserData)
  }
)

export const getCurrentUser = createAsyncThunk(
  'currentUser/getCurrentUser',
  async (uid) => await getUserByUid(uid)
)

const fetchStartHandler = (state) => {
  state.isLoading = true
  state.isError = false
  state.errorMessage = ''
}

const errorHandler = (state, { error }) => {
  state.isLoading = false
  state.isError = true
  state.errorMessage = error.message
}

export const authSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    changeCurrentUserData: (state, { payload }) => {
      state.currentUser = { ...state.currentUser, ...payload }
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
        state.currentUser = payload
      })

    builder
      .addCase(registerUser.pending, fetchStartHandler)
      .addCase(registerUser.rejected, errorHandler)
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false
      })
  },
})
export const { changeCurrentUserData } = authSlice.actions

export default authSlice.reducer
