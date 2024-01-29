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
  const article = useSelector(getCurrentArticleSelector)
  console.log(article)

  const { uid: userUid } = useSelector(getCurrentUserSelector)

  const like = async () => {
    try {
      const { likes, dislikes, uid } = article

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
      const { likes, dislikes } = article
      const [newDislikes, newLikes] = await updateRate(dislikes, likes, userUid)

      dispatch(
        updateCurrentArticle({
          newData: { likes: newLikes, dislikes: newDislikes },
          uid: article.uid,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Typography.Title>{article.title}</Typography.Title>
      <_Image path={article.img} />
      <Typography.Paragraph>{article.text}</Typography.Paragraph>
      {userUid && (
        <Flex justify='end' style={{ padding: '0 40px' }}>
          <>
            <Button
              icon={
                <LikeOutlined
                  style={{
                    color: article.likes?.includes(userUid) ? 'green' : 'black',
                  }}
                />
              }
              onClick={like}
            />
            <Button
              icon={
                <DislikeOutlined
                  style={{
                    color: article.dislikes?.includes(userUid)
                      ? 'red'
                      : 'black',
                  }}
                />
              }
              onClick={dislike}
            />
          </>
        </Flex>
      )}
    </>
  )
}

export default memo(ArticlePage)
