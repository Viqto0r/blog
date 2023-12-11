import Logo from '../Logo'
import LogoutBtn from './LogoutBtn'
import LoginBtn from './LoginBtn'
import styles from './Header.module.scss'
import { memo } from 'react'
import UserProfile from '../UserProfile/'

const Header = ({ loggined = false, onShowForm, onLogout }) => {
  return (
    <header className={styles.header}>
      <Logo />
      {loggined ? (
        <UserProfile onLogout={onLogout} />
      ) : (
        //<LogoutBtn onLogout={onLogout} />
        <LoginBtn showLoginForm={() => onShowForm('login')} />
      )}
    </header>
  )
}

export default memo(Header)
