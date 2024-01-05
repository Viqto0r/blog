import { getCollection, getUrl, getDocByUid } from '../../../api/firebaseApi'
import { convertEmailToNickname } from '../../../utils/utils'

export const createArticleData = async ({
  authorUid,
  category,
  comments,
  img,
  likes,
  title,
  uid,
}) => {
  const { email } = await getDocByUid('users', authorUid)
  return {
    href: uid,
    title,
    avatar: '',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: <img src={img} alt='' />,
  }
}

export const data = [
  {
    href: 'https://ant.design',
    title: `ant design part `,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: (
      <img
        src='https://xsgames.co/randomusers/avatar.php?g=pixel&key='
        alt=''
      />
    ),
  },
  {
    href: 'https://ant.design',
    title: `ant design part `,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    href: 'https://ant.design',
    title: `ant design part `,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
  {
    href: 'https://ant.design',
    title: `ant design part `,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=`,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  },
]
