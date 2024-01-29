import { memo, useEffect } from 'react'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getAllUsersSelector } from '../../store/slices/usersSlice'
import useTableColumns from '../../hooks/useTableColumns'

const usersDataToTable = (users) => {
  return users.map(({ uid, role, email, banned }, idx) => ({
    key: idx,
    uid,
    role,
    email,
    banned,
  }))
}

const UsersList = () => {
  const columns = useTableColumns()

  const users = useSelector(getAllUsersSelector)
  const isLoading = useSelector((state) => state.allUsers.isLoading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  return (
    <Table
      columns={columns}
      dataSource={usersDataToTable(users)}
      loading={isLoading}
      bordered
      pagination={{
        position: ['topRight'],
        //hideOnSinglePage: true
      }}
    />
  )
}

export default memo(UsersList)
