import { Dropdown, Space, Tag } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTableSearch from './useTableSearch'
import { useDispatch } from 'react-redux'
import { changeUserData, deleteUser } from '../store/slices/usersSlice'

const renderHeader = ({ uid, banned }, dispatch) => {
  console.log(uid)
  console.log(banned)
  return [
    {
      key: '1',
      label: 'Change role',
      children: [
        {
          key: '1-1',
          label: 'user',
          onClick: () =>
            dispatch(changeUserData({ uid, key: 'role', value: 'user' })),
        },
        {
          key: '1-2',
          label: 'editor',
          onClick: () =>
            dispatch(changeUserData({ uid, key: 'role', value: 'editor' })),
        },
        {
          key: '1-3',
          label: 'admin',
          onClick: () =>
            dispatch(changeUserData({ uid, key: 'role', value: 'admin' })),
        },
        ,
      ],
    },
    ,
    {
      key: '2',
      label: banned ? 'Unban' : 'Ban',
      onClick: () =>
        dispatch(changeUserData({ uid, key: 'banned', value: !banned })),
    },
    {
      key: '3',
      label: 'Delete',
      onClick: () => dispatch(deleteUser(uid)),
    },
  ]
}

const useTableColumns = () => {
  const { getColumnSearchProps } = useTableSearch()
  const dispatch = useDispatch()

  const columns = [
    {
      title: 'UID',
      dataIndex: 'uid',
      key: 'uid',
      render: (_, { uid, banned }) => {
        return (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {uid}
            {banned && <Tag color='red'>banned</Tag>}
          </div>
        )
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'user',
          value: 'user',
        },
        {
          text: 'editor',
          value: 'editor',
        },
        {
          text: 'admin',
          value: 'admin',
        },
      ],
      sorter: (a, b) => {
        if (a.role > b.role) return 1
        else if (a.role < b.role) return -1
      },
      onFilter: (value, record) => record.role.indexOf(value) === 0,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },

    {
      title: 'Settings',
      dataIndex: 'settings',
      key: 'settings',

      render: (_, rowData) => {
        return (
          <Space size='middle'>
            <Dropdown
              trigger='click'
              menu={{
                items: renderHeader(rowData, dispatch),
              }}
            >
              <a>
                <SettingOutlined />
              </a>
            </Dropdown>
          </Space>
        )
      },
    },
  ]
  return columns
}

export default useTableColumns
