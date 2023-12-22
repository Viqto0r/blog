import { Dropdown, Space } from 'antd'
import { SettingOutlined } from '@ant-design/icons'
import useTableSearch from './useTableSearch'

const useTableColumns = () => {
  const { getColumnSearchProps } = useTableSearch()
  const tableHeader = [
    {
      key: '1',
      label: 'Change role',
      children: [
        {
          key: '1-1',
          label: 'user',
          onClick: () => console.log('click 1-1'),
        },
        {
          key: '1-2',
          label: 'editor',
          onClick: () => console.log('click 1-2'),
        },
        {
          key: '1-3',
          label: 'admin',
          onClick: () => console.log('click 1-3'),
        },
        ,
      ],
    },
    ,
    {
      key: '2',
      label: 'Ban',
      onClick: () => console.log('click 2'),
    },
    {
      key: '3',
      label: 'Delete',
      onClick: () => console.log('click 3'),
    },
  ]

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
      render: () => (
        <Space size='middle'>
          <Dropdown
            trigger='click'
            menu={{
              items: tableHeader,
            }}
          >
            <a>
              <SettingOutlined />
            </a>
          </Dropdown>
        </Space>
      ),
    },
  ]
  return columns
}

export default useTableColumns
