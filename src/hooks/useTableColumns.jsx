import { Dropdown, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTableSearch from './useTableSearch'
import { useDispatch } from 'react-redux'
import { changeUserRole, deleteUser } from '../store/slices/usersSlice'

const renderHeader = ({ uid }, dispatch) => {
  return [
    {
      key: '1',
      label: 'Change role',
      children: [
        {
          key: '1-1',
          label: 'user',
          onClick: () => dispatch(changeUserRole({ uid, role: 'user' })),
        },
        {
          key: '1-2',
          label: 'editor',
          onClick: () => dispatch(changeUserRole({ uid, role: 'editor' })),
        },
        {
          key: '1-3',
          label: 'admin',
          onClick: () => dispatch(changeUserRole({ uid, role: 'admin' })),
        },
        ,
      ],
    },
    ,
    {
      key: '2',
      label: 'Ban',
      onClick: () => console.log('Ban'),
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
