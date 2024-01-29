import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getLastPath } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentArticle,
  updateCurrentArticle,
} from '../store/slices/currentArticleSlice'

const useArticleState = () => {
  const { state, pathname } = useLocation()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('effect ')
    ;(async () => {
      try {
        if (!state) {
          console.log('Захожу по ссылке')
          const path = getLastPath(pathname)
          dispatch(getCurrentArticle(path))
        } else {
          console.log('Захожу через лист')
          const { uid, ...newData } = state
          dispatch(updateCurrentArticle({ newData, uid }))
        }
      } catch (e) {
        console.log(e)
      }
    })()
  }, [])
  const article = useSelector((state) => state.currentArticle.data)
  console.log(article)
  return article
}

export default useArticleState
