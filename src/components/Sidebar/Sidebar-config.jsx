import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBusinessTime,
  faCar,
  faHeartCirclePlus,
  faMicrochip,
  faPersonBiking,
  faShirt,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'

export const userPageMenuOptions = [
  {
    key: 1,
    icon: <FontAwesomeIcon icon={faMicrochip} />,
    label: 'Technology',
  },
  {
    key: 2,
    icon: <FontAwesomeIcon icon={faHeartCirclePlus} />,
    label: 'Health',
  },
  {
    key: 3,
    icon: <FontAwesomeIcon icon={faBusinessTime} />,
    label: 'Buisnes',
  },
  {
    key: 4,
    icon: <FontAwesomeIcon icon={faShirt} />,
    label: 'Fashion',
  },
  {
    key: 5,
    icon: <FontAwesomeIcon icon={faCar} />,
    label: 'Cars',
  },
  {
    key: 6,
    icon: <FontAwesomeIcon icon={faPersonBiking} />,
    label: 'Sport',
  },
]

export const adminPageMenuOptions = [
  {
    key: 1,
    icon: <FontAwesomeIcon icon={faUsers} />,
    label: 'Users',
  },
]
