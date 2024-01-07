import { memo } from 'react'
import { Outlet } from 'react-router-dom'

const UserPageMain = () => {
  return <Outlet />
}

export default memo(UserPageMain)
