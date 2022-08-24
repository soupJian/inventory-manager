import React from 'react'
import TaskContent from '../../../sections/crm-hub/task/task-content'
import styles from './index.module.scss'
// table 组件 导入，由于 next 按需导入机制 只导入了 table 样式 需要手动导入 其他样式
import 'antd/lib/dropdown/style/index.css'
import 'antd/lib/pagination/style/index.css'
import 'antd/lib/checkbox/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/checkbox/style/index.css'

const Task = () => {
  return (
    <div className={styles.taskWrap}>
      <TaskContent />
    </div>
  )
}

export default Task
