import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBusinessTime,
  faCar,
  faHeartCirclePlus,
  faMicrochip,
  faNewspaper,
  faPersonBiking,
  faShirt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { capitalize } from '../../utils/utils'
const createMenuItem = () => {
  let key = 1
  return (path, icon) => ({
    key: key++,
    icon: (
      <Link to={path}>
        <FontAwesomeIcon icon={icon} />
      </Link>
    ),
    label: capitalize(path || 'All'),
  })
}

const MenuItem = createMenuItem()

export const userPageMenuOptions = [
  MenuItem('', faNewspaper),
  MenuItem('technology', faMicrochip),
  MenuItem('health', faHeartCirclePlus),
  MenuItem('buisnes', faBusinessTime),
  MenuItem('fashion', faShirt),
  MenuItem('cars', faCar),
  MenuItem('sport', faPersonBiking),
]

export const adminPageMenuOptions = [
  {
    key: 1,
    icon: <FontAwesomeIcon icon={faUsers} />,
    label: 'Users',
  },
]
