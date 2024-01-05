import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getCollection } from '../../api/firebaseApi'
import { List } from 'antd'
import Article from '../Article/Article'
import { createArticleData } from '../Main/UserPageMain/UserPageMain-data'

const ArticlesList = () => {
  const [articles, setArticles] = useState()
  const location = useLocation()

  useEffect(() => {
    const getCol = async () => {
      let articles = await getCollection('articles', {
        key: 'category',
        value: location.pathname.slice(1),
      })

      articles.map(async (article) => {
        return await createArticleData(article)
      })
      setArticles(articles)
    }

    getCol()
  }, [location])
  return (
    <List
      grid={{
        gutter: 16,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      style={{ padding: '0 8px' }}
      itemLayout='vertical'
      size='large'
      dataSource={articles}
      renderItem={(item) => <Article {...item} />}
    />
  )
}

export default ArticlesList
