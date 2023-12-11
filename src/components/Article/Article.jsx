import { memo, createElement } from 'react'
import { Avatar, List, Space } from 'antd'
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'

import styles from './Article.module.scss'

const IconText = ({ icon, text }) => (
  <Space>
    {createElement(icon)}
    {text}
  </Space>
)

const Article = ({ title, avatar, href, description, content }) => {
  return (
    <List.Item
      key={title}
      actions={[
        <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
        <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
        <IconText
          icon={MessageOutlined}
          text='2'
          key='list-vertical-message'
        />,
      ]}
      //extra={
      //  <img
      //    width={272}
      //    alt='logo'
      //    src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
      //  />
      //}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={<a href={href}>{title}</a>}
        description={description}
      />
      {content}
    </List.Item>
  )
}

export default memo(Article)
