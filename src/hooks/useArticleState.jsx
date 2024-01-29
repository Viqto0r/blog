import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLastPath } from '../utils/utils'
import { useDispatch } from 'react-redux'
import {
  clearCurrentArticle,
  getCurrentArticle,
  updateCurrentArticle,
} from '../store/slices/currentArticleSlice'

const useArticleState = () => {
  const { state, pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      try {
        if (!state) {
          const path = getLastPath(pathname)
          dispatch(getCurrentArticle(path))
        } else {
          const { uid, ...newData } = state
          dispatch(updateCurrentArticle({ newData, uid }))
        }
      } catch (e) {
        console.log(e)
      }
    })()
    return () => {
      dispatch(clearCurrentArticle())
    }
  }, [])
}

export default useArticleState
