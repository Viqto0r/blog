import { useDispatch } from 'react-redux'
import {
  auth,
  getDataFromDB,
  loginFB,
  logoutFB,
  sendDataInDB,
} from '../api/firebaseApi'
import { loginUser, logoutUser } from '../store/slices/currentUserSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useCallback } from 'react'

const useAuth = () => {
  const dispatch = useDispatch()

  const loginHandler = useCallback(({ email, password }) => {
    loginFB(email, password)
  }, [])

  const logoutHandler = useCallback(() => {
    logoutFB()
  }, [])

  const authHandler = useCallback(
    (newUserData, hideFormsHandler) =>
      onAuthStateChanged(auth, async (user) => {
        if (!user) {
          console.log('logout')
          dispatch(logoutUser())
          return
        }
        try {
          let userDataFromDB = await getDataFromDB('users', user.uid)
          if (!userDataFromDB) {
            await sendDataInDB('users', user, newUserData)
            userDataFromDB = await getDataFromDB('users', user.uid)
          }
          dispatch(
            loginUser({
              ...userDataFromDB,
            })
          )
          hideFormsHandler(null)
        } catch (e) {
          console.log('Ошибка аутентификации')
        }
      }),
    [dispatch]
  )

  return {
    authHandler,
    loginHandler,
    logoutHandler,
  }
}

export default useAuth
