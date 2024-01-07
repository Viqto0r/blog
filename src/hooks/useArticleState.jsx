import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getDocByUid } from '../api/firebaseApi'
import { getLastPath } from '../utils/utils'

const useArticleState = () => {
  const { state, pathname } = useLocation()
  const [article, setArticle] = useState({})

  useEffect(() => {
    ;(async () => {
      let article = state
      if (!article) {
        article = await getDocByUid('articles', getLastPath(pathname))
      }
      setArticle(article)
    })()
  }, [])

  return article
}

export default useArticleState
