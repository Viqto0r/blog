import { memo } from 'react'
import { Menu } from 'antd'
import styles from './Sidebar.module.scss'
import { data } from './Sidebar-config'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <Menu items={data} defaultSelectedKeys={'1'} mode='vertical' />
    </aside>
  )
}

export default memo(Sidebar)
