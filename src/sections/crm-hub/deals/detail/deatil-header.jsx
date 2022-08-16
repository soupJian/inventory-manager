// react next --------------
import React from 'react'
import { useRouter } from 'next/router'
// antd
import { PageHeader, Button } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
// components
import Icon from '../../../../components/commons/icons/Icon'
// css -------------
// 导入space样式
import 'antd/lib/space/style/index.css'
import styles from './index.module.scss'

const DetailHeader = () => {
  const router = useRouter()
  return (
    <div className={styles['detail-header']}>
      <PageHeader
        backIcon={<LeftOutlined />}
        onBack={() => router.back()}
        title="Deal"
        extra={[
          <Button
            key="1"
            className={styles.noteBtn}
            icon={<Icon name="note" width="16px" height="16px" />}
          >
            Notes
          </Button>,
          <Button
            key="2"
            className={styles.mergeBtn}
            icon={<Icon name="merge" width="14px" height="14px" />}
          >
            Merge
          </Button>,
          <Button
            key="3"
            className={styles.deleteBtn}
            icon={<Icon name="delete" width="10px" height="13px" />}
          >
            Delete
          </Button>
        ]}
      />
    </div>
  )
}

export default DetailHeader
