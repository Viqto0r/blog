import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Card, Space } from 'antd'
import { StarFilled } from '@ant-design/icons'

import _Image from '../../_Image/_Image'

import UserAvatar from '../../UserAvatar/UserAvatar'

import { capitalize } from '../../../utils/utils'
import Rate from '../../Rate/Rate'

const ArticleCard = ({
  uid,
  title,
  createDate,
  category,
  author,
  img,
  likes,
  dislikes,
  comments,
  text,
}) => {
  return (
    <Link
      to={`../article/${uid}`}
      state={{
        uid,
        title,
        createDate,
        category,
        author,
        img,
        likes,
        dislikes,
        comments,
        text,
      }}
    >
      <Card
        hoverable
        description={capitalize(category)}
        cover={
          <>
            <Card.Meta title={title} style={{ padding: '10px' }} />
            <_Image path={img} />
          </>
        }
      >
        <Card.Meta
          description={
            <Rate
              rate={likes.length - dislikes.length}
              prefix={
                <StarFilled
                  style={{
                    color: '#f16a26',
                    position: 'relative',
                    top: '1px',
                    fontSize: '26px',
                  }}
                />
              }
            />
          }
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
          title={capitalize(category)}
        ></Card.Meta>
      </Card>
    </Link>
  )
}

export default memo(ArticleCard)
