import React from 'react'
import Image from 'next/image'
// components
import { Row, Col, Space, Button } from 'antd'
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
// css
import styles from '../repository.module.less'

const ImgWrap = ({ list, title, addNew }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{title}</div>
      <div className={styles.addBtn} onClick={() => addNew()}>
        <Button type="link">Add new</Button>
      </div>
      <div className={styles.container}>
        <Row gutter={[20, 20]}>
          {list.map((item) => {
            return (
              <Col key={item.id} span={8}>
                <div className={styles.imgWrap}>
                  <Image
                    className={styles.img}
                    alt={item.name}
                    src={item.url}
                    layout="fill"
                  />
                </div>
                <div className={styles.imgInfo}>
                  <div className={styles.imgTitle}>{item.name}</div>
                  <Row align="middle" justify="space-between">
                    <Col className={styles.time}>{item.time}</Col>
                    <Col>
                      <Space>
                        <DeleteOutlined className={styles.icon} />
                        <DownloadOutlined className={styles.icon} />
                      </Space>
                    </Col>
                  </Row>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    </div>
  )
}

export default ImgWrap
