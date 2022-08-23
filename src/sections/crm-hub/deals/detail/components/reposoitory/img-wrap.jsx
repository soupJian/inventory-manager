import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Row, Col, Space, Button } from 'antd'
import { DeleteOutlined, DownloadOutlined } from '@ant-design/icons'
import styles from '../repository.module.scss'

const ImgWrap = ({ list, title }) => {
  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{title}</div>
      <div className={styles.addBtn}>
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
