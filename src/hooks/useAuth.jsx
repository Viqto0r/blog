import { useDispatch } from 'react-redux'
import { auth } from '../api/firebaseApi'
import { getCurrentUser } from '../store/slices/currentUserSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useCallback, useState } from 'react'

const useAuth = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const authHandler = useCallback(() => {
    onAuthStateChanged(auth, async (user) => {
      console.log('Юзер заходит')
      if (!user) {
        console.log('Юзер не авторизован')
        setLoading(false)
        return false
      }
      console.log('Установка данных юзера в стейт')
      dispatch(getCurrentUser(user.uid))
      console.log('Юзер авторизован, данные в стейт установлены')
      setLoading(false)
      return user
    }),
      [dispatch, getCurrentUser]
  })

  return {
    loading,
    authHandler,
  }
}

export default useAuth
