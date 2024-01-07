import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCollection, getDocByUid } from '../api/firebaseApi'

const addAuthorInArticle = async ({ authorUid, ...article }) => {
  const { email, role, avatar = '' } = await getDocByUid('users', authorUid)

  return { ...article, author: { email, role, avatar, uid: authorUid } }
}

const useArticles = () => {
  const [articles, setArticles] = useState()
  const location = useLocation()

  useEffect(() => {
    const getCol = async () => {
      let articles = await getCollection('articles', {
        key: 'category',
        value: location.pathname.slice(1),
      })

      articles = await Promise.all(articles.map(addAuthorInArticle))
      setArticles(articles)
    }

    getCol()
  }, [location])

  return articles
}

export default useArticles
