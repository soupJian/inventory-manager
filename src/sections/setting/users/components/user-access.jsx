import React from 'react'
// components
import { Table, Dropdown, Space, Button, Row, Col } from 'antd'
import { Icon } from '../../../../components/commons'
import { DownOutlined } from '@ant-design/icons'

// main
const UserAccess = ({ data, editUserAccess }) => {
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
      title: 'USER LIST',
      dataIndex: 'userList',
      render: (_, record) => {
        return (
          <Dropdown
            menu={{
              items: record.userList.map((item) => {
                return {
                  label: item.fullName,
                  key: item.id
                }
              })
            }}
          >
            <Row justify="space-between">
              <Col style={{ minWidth: '100px' }}>
                {record.userList.length > 0 ? record.userList[0].fullName : ''}
              </Col>
              <Col>
                <DownOutlined />
              </Col>
            </Row>
          </Dropdown>
        )
      }
    },
    {
      title: '',
      render: (_, record) => {
        return (
          <>
            {!record.defaultAccess && (
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
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{
        showTotal: (total, range) => {
          return `Showing ${range[1] - range[0] + 1} of ${total} access`
        }
      }}
    />
  )
}

export default React.memo(UserAccess)
