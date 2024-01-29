import { Button, Flex, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons'
import useArticleState from '../../hooks/useArticleState'
import _Image from '../../components/_Image/_Image'
import {
  getCurrentArticleSelector,
  updateCurrentArticle,
} from '../../store/slices/currentArticleSlice'
import { memo } from 'react'
import { getCurrentUserSelector } from '../../store/slices/currentUserSlice'
import Rate from '../../components/Rate/Rate'

const updateRate = async (rateType1, rateType2, userUid) => {
  let newRateType1 = [...rateType1]
  let newRateType2 = [...rateType2]

  if (newRateType1.includes(userUid)) {
    newRateType1 = newRateType1.filter((uid) => uid !== userUid)
  } else {
    newRateType1.push(userUid)
    newRateType2 = newRateType2.filter((uid) => uid !== userUid)
  }

  return [newRateType1, newRateType2]
}

const ArticlePage = () => {
  const dispatch = useDispatch()
  useArticleState()
  const {
    likes = [],
    dislikes = [],
    uid,
    title,
    img,
    text,
  } = useSelector(getCurrentArticleSelector)

  const { uid: userUid } = useSelector(getCurrentUserSelector)

  const like = async () => {
    try {
      const [newLikes, newDislikes] = await updateRate(likes, dislikes, userUid)
      dispatch(
        updateCurrentArticle({
          newData: { likes: newLikes, dislikes: newDislikes },
          uid,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const dislike = async () => {
    try {
      const [newDislikes, newLikes] = await updateRate(dislikes, likes, userUid)

      dispatch(
        updateCurrentArticle({
          newData: { likes: newLikes, dislikes: newDislikes },
          uid,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Typography.Title>{title}</Typography.Title>
      <_Image path={img} />
      <Typography.Paragraph>{text}</Typography.Paragraph>
      {userUid && (
        <Flex
          justify='end'
          align='center'
          gap='5px'
          style={{ padding: '0 40px' }}
        >
          <Button
            icon={
              <LikeOutlined
                style={{
                  color: likes?.includes(userUid) ? 'green' : 'black',
                }}
              />
            }
            onClick={like}
          />
          <Rate rate={likes.length - dislikes.length} />
          <Button
            icon={
              <DislikeOutlined
                style={{
                  color: dislikes?.includes(userUid) ? 'red' : 'black',
                }}
              />
            }
            onClick={dislike}
          />
        </Flex>
      )}
    </>
  )
}

export default memo(ArticlePage)
