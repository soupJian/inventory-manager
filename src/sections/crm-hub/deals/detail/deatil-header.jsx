// react next --------------
import React, { useState } from 'react'
import { useRouter } from 'next/router'
// antd
import { PageHeader, Button, Modal, Dropdown } from 'antd'
import { LeftOutlined, DownOutlined } from '@ant-design/icons'
// components
import Icon from '@/components/commons/icons/Icon'
import ModalNotes from './components/header/modal-notes'
import ModalMerge from './components/header/modal-merge'
// css -------------
import styles from './index.module.less'

// main
const DetailHeader = () => {
  const router = useRouter()

  // 展示 motes 的 modal
  const [showModalNotes, setShowModalNotes] = useState(false)
  // merge modal
  const [showModalMerge, setShowModalMerge] = useState(false)

  const chooseCreateMenu = (key) => {
    // merge  delete
    if (key == 'Merge') {
      setShowModalMerge(true)
    }
  }
  const MoreMenu = [
    {
      label: <span onClick={() => chooseCreateMenu('Merge')}>Merge</span>,
      key: 'Merge'
    },
    {
      label: <span onClick={() => chooseCreateMenu('Delete')}>Merge</span>,
      key: 'Delete'
    }
  ]
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
          <Button
            key="2"
            className={styles.callBtn}
            icon={<Icon name="phone" width="16px" height="16px" />}
          >
            Make Call
          </Button>,
          <Dropdown
            menu={{ item: MoreMenu }}
            key="3"
            className={styles.moreBtn}
          >
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
          centered
          title="Notes"
          open={showModalNotes}
          footer={null}
          onCancel={() => setShowModalNotes(false)}
        >
          <ModalNotes />
        </Modal>
        <Modal
          centered
          title="Merge deals"
          open={showModalMerge}
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
