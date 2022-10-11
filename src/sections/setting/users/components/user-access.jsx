import React from 'react'
import { Table, Dropdown, Menu, Space, Button } from 'antd'
import { Icon } from '../../../../components/commons'
import { DownOutlined } from '@ant-design/icons'

const UserAccess = ({ data, editUserAccess, loading }) => {
  const columns = [
    {
      title: 'ACCESS NAME',
      dataIndex: 'accessName',
      render: (_, record) => <>{record.accessName}</>
    },
    {
      title: 'TYPE',
      render: (_, record) => {
        return (
          <span>
            {record.defaultAccess ? 'System created' : 'User created'}
          </span>
        )
      }
    },
    {
      title: 'USERLIST',
      dataIndex: 'userList',
      render: (_, record) => {
        return (
          <>
            <Dropdown
              overlay={
                <Menu
                  items={[
                    {
                      key: '1',
                      label: (
                        <Space direction="vertical">
                          {record.userList.map((item) => {
                            return <span key={item.id}>{item.fullName}</span>
                          })}
                        </Space>
                      )
                    }
                  ]}
                />
              }
            >
              <Space style={{ cursor: 'pointer' }}>
                <div style={{ minWidth: '100px' }}>
                  {record.userList.length > 0
                    ? record.userList[0].fullName
                    : ''}
                </div>
                <DownOutlined />
              </Space>
            </Dropdown>
            {record.accessName != 'Super Admin' &&
              record.accessName != 'Admin' && (
                <Button
                  style={{ marginLeft: '40px' }}
                  onClick={() => {
                    editUserAccess(record)
                  }}
                >
                  <Space>
                    <Icon name="edit" width="11px" height="11px"></Icon>
                    Edit
                  </Space>
                </Button>
              )}
          </>
        )
      }
    }
  ]
  return (
    <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
  )
}

export default React.memo(UserAccess)
