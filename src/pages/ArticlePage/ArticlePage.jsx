import useArticle from '../../hooks/useArticle'

const ArticlePage = () => {
  const article = useArticle()

  return <p>{article.title}</p>
}

export default ArticlePage
