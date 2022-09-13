import React, { useState } from 'react'
import ReverseReturn from './reverse-return'
import ReverseReplace from './reverse-replace'
import ReverseReturnReplace from './reverse-replace'

import styles from '../index.module.scss'

const PipelineReverse = () => {
  const [active, setActive] = useState('Return')
  return (
    <div>
      <div className={styles['header-tabs']}>
        <div
          className={`${active == 'Return' ? styles.active : ''}`}
          onClick={() => setActive('Return')}
        >
          Return
        </div>
        <div
          className={`${active == 'Replace' ? styles.active : ''}`}
          onClick={() => setActive('Replace')}
        >
          Replace
        </div>
        <div
          className={`${active == 'Return & Replace' ? styles.active : ''}`}
          onClick={() => setActive('Return & Replace')}
        >
          Return & Replace
        </div>
      </div>
      {active == 'Return' && <ReverseReturn />}
      {active == 'Replace' && <ReverseReplace />}
      {active == 'Return & Replace' && <ReverseReturnReplace />}
    </div>
  )
}

export default PipelineReverse
