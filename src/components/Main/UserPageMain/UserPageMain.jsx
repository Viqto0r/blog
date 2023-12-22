import { memo } from 'react'
import { List } from 'antd'
import Article from '../../Article/Article'
import { data } from './UserPageMain-data'

const UserPageMain = () => {
  return (
    <List
      grid={{
        gutter: 16,
        md: 1,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      itemLayout='vertical'
      size='large'
      dataSource={data}
      renderItem={(item) => <Article {...item} />}
    />
  )
}

export default memo(UserPageMain)
