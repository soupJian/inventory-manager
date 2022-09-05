import React from 'react'
import { Table, Dropdown, Menu, Space, Button } from 'antd'
import { Icon } from '../../../components/commons'
import { DownOutlined } from '@ant-design/icons'

const UserAccess = ({ data }) => {
  console.log(data)
  const columns = [
    {
      title: 'ACCESS NAME',
      dataIndex: 'accessName'
    },
    {
      title: 'TYPE',
      dataIndex: 'type'
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
                            return <span key={item}>{item}</span>
                          })}
                        </Space>
                      )
                    }
                  ]}
                />
              }
            >
              <Space style={{ cursor: 'pointer' }}>
                <div style={{ minWidth: '100px' }}>{record.userList[0]}</div>
                <DownOutlined />
              </Space>
            </Dropdown>
            {record.accessName != 'Super Admin' &&
              record.accessName != 'Admin' && (
                <Button style={{ marginLeft: '40px' }}>
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
  return <Table columns={columns} dataSource={data} rowKey="id" />
}

export default UserAccess
