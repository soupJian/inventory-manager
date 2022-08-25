// react next --------------
import React, { useState } from 'react'
import { useRouter } from 'next/router'
// antd
import { PageHeader, Button, Modal, Dropdown, Menu } from 'antd'
import { LeftOutlined, DownOutlined } from '@ant-design/icons'
// components
import Icon from '../../../../components/commons/icons/Icon'
import ModalNotes from './components/header/modal-notes'
import ModalMerge from './components/header/modal-merge'
// css -------------
// 导入space样式
import 'antd/lib/space/style/index.css'
import styles from './index.module.scss'

const DetailHeader = () => {
  const router = useRouter()

  // 展示 motes 的 modal
  const [showModalNotes, setShowModalNotes] = useState(false)
  // merge modal
  const [showModalMerge, setShowModalMerge] = useState(false)

  const chooseCreateMenu = (e) => {
    // merge  delete
    if (e.key == 'Merge') {
      setShowModalMerge(true)
    }
  }
  const MoreMenu = (
    <Menu
      onClick={chooseCreateMenu}
      items={[
        {
          label: 'Merge',
          key: 'Merge'
        },
        {
          label: 'Delete',
          key: 'Delete'
        }
      ]}
    />
  )
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
            onClick={() => setShowModalNotes(true)}
          >
            Notes
          </Button>,
          <Dropdown overlay={MoreMenu} key="2" className={styles.moreBtn}>
            <Button className={styles.createBtn}>
              More <DownOutlined />
            </Button>
          </Dropdown>
          // <Button
          //   key="3"
          //   className={styles.mergeBtn}
          //   icon={<Icon name="merge" width="14px" height="14px" />}
          //   onClick={() => setShowModalMerge(true)}
          // >
          //   Merge
          // </Button>
          // <Button
          //   key="4"
          //   className={styles.deleteBtn}
          //   icon={<Icon name="delete" width="10px" height="13px" />}
          // >
          //   Delete
          // </Button>
        ]}
      >
        <Modal
          title="Notes"
          visible={showModalNotes}
          footer={null}
          onCancel={() => setShowModalNotes(false)}
        >
          <ModalNotes />
        </Modal>
        <Modal
          title="Merge deals"
          visible={showModalMerge}
          footer={null}
          onCancel={() => setShowModalMerge(false)}
          width={672}
        >
          <ModalMerge />
        </Modal>
      </PageHeader>
    </div>
  )
}

export default DetailHeader
