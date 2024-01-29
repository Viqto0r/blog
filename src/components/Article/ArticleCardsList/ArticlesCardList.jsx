import { List } from 'antd'
import ArticleCard from '../ArticleCard/ArticleCard'
import useArticles from '../../../hooks/useArticles'

const ArticleCardsList = () => {
  const { articles, isLoading } = useArticles()

  return (
    <List
      grid={{
        gutter: 10,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      loading={isLoading}
      style={{ padding: '10px' }}
      itemLayout='vertical'
      size='large'
      dataSource={articles}
      renderItem={(item) => (
        <List.Item style={{ padding: '0' }}>
          <ArticleCard {...item} />
        </List.Item>
      )}
    />
  )
}

export default ArticleCardsList
