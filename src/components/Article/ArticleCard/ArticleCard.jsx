import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Space, Spin } from 'antd'
import { Image } from 'antd'
import _Image from '../../_Image/_Image'

import UserAvatar from '../../UserAvatar/UserAvatar'

import useImageSrc from '../../../hooks/useImgSrc'
import { capitalize } from '../../../utils/utils'

const ArticleCard = ({
  uid,
  title,
  createDate,
  category,
  author,
  img,
  likes,
  comments,
  text,
}) => {
  return (
    <Card
      hoverable
      description={capitalize(category)}
      cover={
        <Link
          to={`../article/${uid}`}
          style={{ display: 'block' }}
          state={{
            uid,
            title,
            createDate,
            category,
            author,
            img,
            likes,
            comments,
            text,
          }}
        >
          <Card.Meta title={title} style={{ padding: '10px' }} />
          <_Image path={img} />
        </Link>
      }
    >
      <Card.Meta
        description={capitalize(category)}
        avatar={
          <Space>
            <UserAvatar
              role={author.role}
              src={author.avatar}
              email={author.email}
            />
            {new Date(+createDate).toLocaleDateString()}
          </Space>
        }
      ></Card.Meta>
    </Card>
  )
}

export default memo(ArticleCard)
