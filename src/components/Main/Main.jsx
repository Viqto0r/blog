import React, { memo } from 'react'
import { List } from 'antd'
import { Content } from 'antd/es/layout/layout'

import Article from '../Article/Article'
import { data } from './Main-data'

const contentStyle = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
}

const Main = () => {
  return (
    <Content style={contentStyle}>
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
    </Content>
  )
}

export default memo(Main)
