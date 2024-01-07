import { Typography } from 'antd'
import useArticleState from '../../hooks/useArticleState'
import _Image from '../../components/_Image/_Image'

const ArticlePage = () => {
  const article = useArticleState()

  return (
    <>
      <Typography.Title>{article.title}</Typography.Title>
      <_Image path={article.img} />
      <Typography.Paragraph>{article.text}</Typography.Paragraph>
    </>
  )
}

export default ArticlePage
