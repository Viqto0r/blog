import { memo, useState, useEffect } from 'react'
import { Card, Space, Spin } from 'antd'
import { Image } from 'antd'
import { getDocByUid } from '../../api/firebaseApi'
import useImageSrc from '../../hooks/useImgSrc'
import { capitalize } from '../../utils/utils'
import UserAvatar from '../UserAvatar/UserAvatar'
import { Link } from 'react-router-dom'

const Article = ({
  authorUid,
  comments,
  img,
  likes,
  title,
  createDate,
  category,
  uid,
}) => {
  //console.log(uid)
  const [src, loading, setLoading] = useImageSrc(img)
  const [author, setAuthor] = useState({ email: '', avatar: '' })

  useEffect(() => {
    ;(async () => {
      const articleAuthor = await getDocByUid('users', authorUid)
      setAuthor(articleAuthor)
    })()
  }, [])

  return (
    <Card
      hoverable
      description={capitalize(category)}
      cover={
        <Link
          to={`../article/${uid}`}
          style={{ display: 'block' }}
          state={{
            authorUid,
            comments,
            img,
            likes,
            title,
            createDate,
            category,
            uid,
          }}
        >
          <Card.Meta title={title} style={{ padding: '10px' }} />
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: '40%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            >
              <Spin size='large' />
            </div>
          )}
          <Image
            style={{
              minHeight: '300px',
              height: '300px',
              opacity: 0,
              transition: '0.1s opacity ease',
              objectFit: 'cover',
            }}
            alt='example'
            src={src}
            preview={false}
            onLoad={({ target }) => {
              setLoading(false)
              target.style.opacity = '1'
            }}
          />
        </Link>
      }
    >
      <Card.Meta
        description={capitalize(category)}
        avatar={
          <Space>
            <UserAvatar
              role={author.role}
              email={author.email}
              src={author.avatar}
            />
            {new Date(+createDate).toLocaleDateString()}
          </Space>
        }
      ></Card.Meta>
    </Card>
  )
}

export default memo(Article)
