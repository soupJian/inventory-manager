// react next --------------
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
// components -------------
import DetailHeader from '../../../sections/crm-hub/deals/detail/deatil-header'
import DetailTabs from '../../../sections/crm-hub/deals/detail/detail-tabs'
import DetailAction from '../../../sections/crm-hub/deals/detail/detail-action'
// css ------------
import styles from './index.module.scss'

const DealDetail = () => {
  const router = useRouter()
  const [ids, setIds] = useState([])
  useEffect(() => {
    const dealIds = localStorage.getItem('dealIds')

    // 如果本地没有 ids 路由回到 deals列表页面
    if (!dealIds) {
      router.replace('/crm-hub/deals')
    }
    // 如果有的话一定是一个数组
    setIds(JSON.parse(dealIds))
    // 页面退出， 清除本地的 dealIds
    // return () => localStorage.removeItem('dealIds')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles.container}>
      <DetailHeader />
      <div className={styles.content}>
        <div className={styles.tabs}>
          <DetailTabs />
        </div>
        <div className={styles.action}>
          <DetailAction />
        </div>
      </div>
    </div>
  )
}

export default DealDetail
