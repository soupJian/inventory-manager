// React next -------------
import React from "react"
// components
import { Row, Col, Space, Button, Select, Input } from "antd"
import { SearchOutlined } from "@ant-design/icons"
// css ---------------
import styles from "./index.module.less"
const { Option } = Select

// main
const FromEmailHeader = ({
  general,
  value,
  handleChangeType,
  handleSearch,
  clearSearch
}) => {
  return (
    <Row justify="space-between" className={styles["header-wrap"]}>
      <Col className={styles.title}>Forms & Emails</Col>
      <Col>
        <Space align="middle">
          <Select
            defaultValue={general}
            style={{
              minWidth: 200
            }}
            size="large"
            allowClear
            onChange={handleChangeType}
          >
            <Option value="">ALL types</Option>
            <Option value="mockup">Mockup forms</Option>
            <Option value="general">Contact us forms</Option>
          </Select>
          <Input
            allowClear
            size="large"
            placeholder="search email"
            prefix={<SearchOutlined />}
            onPressEnter={(e) => handleSearch(e.target.value)}
            onChange={(e) => {
              if (e.target.value == "") {
                clearSearch()
              }
            }}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default FromEmailHeader
