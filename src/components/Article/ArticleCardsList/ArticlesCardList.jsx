import { List } from 'antd'
import ArticleCard from '../ArticleCard/ArticleCard'
import useArticles from '../../../hooks/useArticles'

const ArticleCardsList = () => {
  const { articles, isLoading } = useArticles()

  return (
    <List
      grid={{
        gutter: 16,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      loading={isLoading}
      style={{ padding: '0 8px' }}
      itemLayout='vertical'
      size='large'
      dataSource={articles}
      renderItem={(item) => <ArticleCard {...item} />}
    />
  )
}

export default ArticleCardsList
