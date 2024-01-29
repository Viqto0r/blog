import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getArticles, getArticlesSelector } from '../store/slices/articlesSlice'

const useArticles = () => {
  const location = useLocation()
  const articles = useSelector(getArticlesSelector)
  const isLoading = useSelector((state) => state.articlesList.isLoading)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getArticles(location.pathname.slice(1)))
  }, [location])
  return { articles, isLoading }
}

export default useArticles
