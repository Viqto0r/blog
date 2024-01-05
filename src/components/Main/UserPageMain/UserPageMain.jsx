import { memo, useEffect, useState } from 'react'
import { List } from 'antd'
import Article from '../../Article/Article'
import { createArticleData } from './UserPageMain-data'
import { Outlet, useLocation } from 'react-router-dom'
import { getCollection } from '../../../api/firebaseApi'

const UserPageMain = () => {
  //const [articles, setArticles] = useState()
  //const location = useLocation()
  //console.log('render')

  //useEffect(() => {
  //  const getCol = async () => {
  //    let articles = await getCollection('articles', {
  //      key: 'category',
  //      value: location.pathname.slice(1),
  //    })

  //    articles.map(async (article) => {
  //      return await createArticleData(article)
  //    })
  //    console.log(location)
  //    console.log(articles)
  //    setArticles(articles)
  //  }

  //  getCol()
  //}, [location])

  return (
    <Outlet />
    //<List
    //  grid={{
    //    gutter: 16,
    //    md: 1,
    //    lg: 2,
    //    xl: 3,
    //    xxl: 4,
    //  }}
    //  style={{ padding: '0 8px' }}
    //  itemLayout='vertical'
    //  size='large'
    //  dataSource={articles}
    //  renderItem={(item) => <Article {...item} />}
    ///>
  )
}

export default memo(UserPageMain)
