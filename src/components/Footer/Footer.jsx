import { memo } from 'react'
import { faCopyright, faRegistered } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <FontAwesomeIcon icon={faCopyright} />
      <span className={styles.text}>License</span>
      <FontAwesomeIcon icon={faRegistered} />
    </footer>
  )
}

export default memo(Footer)
