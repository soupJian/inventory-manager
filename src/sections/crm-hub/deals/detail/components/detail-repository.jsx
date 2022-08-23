import React, { useEffect, useState } from 'react'
import { Modal } from 'antd'
import ImgWrap from './reposoitory/img-wrap'
import AddModal from './reposoitory/add-modal'
import styles from './repository.module.scss'

const DetailRepository = () => {
  const [logoList, setLogoList] = useState([])
  // 是否展示 add 对话框
  const [showAddModal, setShowAddModal] = useState(false)
  const [addType, setAddType] = useState(null)
  // 配置 添加的类型
  const handleAddNew = (type) => {
    setShowAddModal(true)
    setAddType(type)
  }
  // 提交 add
  const addSave = (values) => {
    console.log(values)
    setShowAddModal(false)
  }
  useEffect(() => {
    const list = [
      {
        id: 1,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 2,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      },
      {
        id: 3,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 4,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      },
      {
        id: 5,
        name: 'Kevin_logo_1.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/395f8c9a-6f16-4ecc-8f82-0426c04bcdbb-01e4f6f6e426fcff620f9a9a837c2780.jpg'
      },
      {
        id: 6,
        name: 'Kevin_logo_2.png',
        time: '05/11/2022',
        url: 'https://beyond-diving.s3.us-west-2.amazonaws.com/reviews/2c6688c4-dc63-4315-8477-25d9b5887f8d-2830f4bca095de2937191375053f2dfc.jpg'
      }
    ]
    setLogoList(list)
  }, [])
  return (
    <div className={styles.repository}>
      <ImgWrap
        list={logoList}
        title="LOGOS"
        addNew={() => handleAddNew('LOGOS')}
      />
      <ImgWrap
        list={logoList}
        title="MOCKUPS"
        addNew={() => handleAddNew('MOCKUPS')}
      />
      <ImgWrap
        list={logoList}
        title="QUOTES & others"
        addNew={() => handleAddNew('QUOTES & others')}
      />
      <Modal
        title="Add a new file"
        visible={showAddModal}
        footer={false}
        onCancel={() => {
          setShowAddModal(false)
        }}
      >
        <AddModal addSave={addSave} />
      </Modal>
    </div>
  )
}

export default DetailRepository
