import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles } from '../store/slices/articlesSlice'

const useArticles = () => {
  const location = useLocation()
  const { data: articles, isLoading } = useSelector(
    (state) => state.articlesList
  )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticles(location.pathname.slice(1)))
  }, [location])
  return { articles, isLoading }
}

export default useArticles
