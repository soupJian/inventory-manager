import React from 'react'
import styles from './index.module.scss'
const DrawerDetail = ({ info }) => {
  return (
    <div className={styles.drawer}>
      <div className={styles.title}>CUSTOMER INFO</div>
      <div className={styles.customerInfo}>
        <div className={styles.name}>
          {info.LastName} {info.FirstName}
        </div>
        <div className={styles.address}>
          {info.City}, {info.State.toUpperCase()}
        </div>
        <div className={styles.phone}>
          {/* {info.City} {info.State.toUpperCase()} */}
        </div>
      </div>
      <div className={styles.title}>CUSTOMER INFO</div>
      <div className={styles['product-description']}>
        Select products to see rate if they’re shipped together:
      </div>
    </div>
  )
}

export default DrawerDetail
