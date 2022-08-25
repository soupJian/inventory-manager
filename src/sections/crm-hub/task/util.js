import {
  isToday,
  isYesterday,
  isTomorrow,
  isThisWeek,
  isLastWeek,
  isThisMonth,
  isNextWeek,
  isNextMonth,
  isLastMonth
} from '../../../utils/formatTime'
import styles from './index.module.scss'
import { Checkbox, Space } from 'antd'
import { RightOutlined } from '@ant-design/icons'
// 根据表格 status 状态 渲染背景色
export const switchStatusColor = (status) => {
  switch (status) {
    case 'Overdue':
      return '#FF7B7B'
    case 'Active':
      return '#2EBEBD'
    case 'Completed':
      return '#77D755'
    default:
      return '#FF7B7B'
  }
}

export const MyActiveTasksColumns = (changeCheckBox, pipelineType) => [
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    render: (_, record) => (
      <>
        <Space>
          <Checkbox
            className={styles.checkbox}
            checked={record.step == 0}
            onChange={(e) => changeCheckBox(e, record)}
          ></Checkbox>
          {record.description}
        </Space>
      </>
    )
  },
  {
    title: `ASSIGNED ${pipelineType == 'Sales pipeline' ? 'DEAL' : 'TICKET'}`,
    dataIndex: 'assignedDeal',
    render: (_, record) => (
      <div style={{ whiteSpace: 'nowrap' }}>{record.assignedDeal}</div>
    )
  },
  {
    title: 'DUE TIME',
    dataIndex: 'dueTime',
    filters: [
      // {
      //   text: 'ALL time',
      //   value: 1
      // },
      {
        text: 'Today',
        value: 2
      },
      {
        text: 'Tomorrow',
        value: 3
      },
      {
        text: 'This week',
        value: 4
      },
      {
        text: 'Last week',
        value: 5
      },
      {
        text: 'This month',
        value: 6
      },
      {
        text: 'Next month',
        value: 7
      }
    ],
    onFilter: (value, record) => {
      let flag = false
      switch (value) {
        // case 1:
        //   // all time
        //   flag = true
        //   break
        case 2:
          // today
          flag = isToday(record.dueTime)
          break
        case 3:
          // tomorrow
          flag = isTomorrow(record.dueTime)
          break
        case 4:
          // this week
          flag = isThisWeek(record.dueTime)
          break
        case 5:
          // last week
          flag = isLastWeek(record.dueTime)
          break
        case 6:
          // this month
          flag = isThisMonth(record.dueTime)
          break
        case 7:
          // next month
          flag = isNextMonth(record.dueTime)
          break
        default:
          flag = true
      }
      return flag
    },
    render: (_, record) => (
      <>
        <span style={{ color: '#2EBEBD' }}>{record.dueTime}</span>
      </>
    ),
    width: 200
  },
  {
    title: 'REMINDER',
    dataIndex: 'reminder',
    render: (_, record) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{record.reminder}</span>
        <span>
          <RightOutlined />
        </span>
      </div>
    ),
    width: 200
  }
]
export const MyOverDueTasksColumns = (changeCheckBox, pipelineType) => [
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    render: (_, record) => (
      <>
        <Space>
          <Checkbox
            className={styles.checkbox}
            checked={record.step == 0}
            onChange={(e) => changeCheckBox(e, record)}
          ></Checkbox>
          {record.description}
        </Space>
      </>
    )
  },
  {
    title: `ASSIGNED ${pipelineType == 'Sales pipeline' ? 'DEAL' : 'TICKET'}`,
    dataIndex: 'assignedDeal'
  },
  {
    title: 'DUE TIME',
    dataIndex: 'dueTime',
    filters: [
      // {
      //   text: 'ALL time',
      //   value: 1
      // },
      {
        text: 'Today',
        value: 2
      },
      {
        text: 'Yesterday',
        value: 3
      },
      {
        text: 'This week',
        value: 4
      },
      {
        text: 'Last week',
        value: 5
      },
      {
        text: 'This month',
        value: 6
      },
      {
        text: 'Last month',
        value: 7
      }
    ],
    onFilter: (value, record) => {
      let flag = false
      switch (value) {
        // case 1:
        //   // all time
        //   flag = true
        //   break
        case 2:
          // today
          flag = isToday(record.dueTime)
          break
        case 3:
          // yesterday
          flag = isYesterday(record.dueTime)
          break
        case 4:
          // this week
          flag = isThisWeek(record.dueTime)
          break
        case 5:
          // last week
          flag = isLastWeek(record.dueTime)
          break
        case 6:
          // this month
          flag = isThisMonth(record.dueTime)
          break
        case 7:
          // last month
          flag = isLastMonth(record.dueTime)
          break
        default:
          flag = true
      }
      return flag
    },
    render: (_, record) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: 'red' }}>{record.dueTime}</span>
        <span>
          <RightOutlined />
        </span>
      </div>
    ),
    width: 200
  }
]
export const MyCompletedTasksColumns = (changeCheckBox, pipelineType) => [
  {
    title: 'DESCRIPTION',
    dataIndex: 'description',
    render: (_, record) => (
      <>
        <Space>
          <Checkbox
            className={styles.checkbox}
            checked={record.step == 0}
            onChange={(e) => changeCheckBox(e, record)}
          ></Checkbox>
          {record.description}
        </Space>
      </>
    )
  },
  {
    title: `ASSIGNED ${pipelineType == 'Sales pipeline' ? 'DEAL' : 'TICKET'}`,
    dataIndex: 'assignedDeal'
  },
  {
    title: 'TIME COMPLETED',
    dataIndex: 'timeCompleted',
    filters: [
      // {
      //   text: 'ALL time',
      //   value: 1
      // },
      {
        text: 'Today',
        value: 2
      },
      {
        text: 'Yesterday',
        value: 3
      },
      {
        text: 'This week',
        value: 4
      },
      {
        text: 'Last week',
        value: 5
      },
      {
        text: 'This month',
        value: 6
      },
      {
        text: 'Last month',
        value: 7
      }
    ],
    onFilter: (value, record) => {
      let flag = false
      switch (value) {
        // case 1:
        //   // all time
        //   flag = true
        //   break
        case 2:
          // today
          flag = isToday(record.timeCompleted)
          break
        case 3:
          // yesterday
          flag = isYesterday(record.timeCompleted)
          break
        case 4:
          // this week
          flag = isThisWeek(record.timeCompleted)
          break
        case 5:
          // last week
          flag = isLastWeek(record.timeCompleted)
          break
        case 6:
          // this month
          flag = isThisMonth(record.timeCompleted)
          break
        case 7:
          // last month
          flag = isLastMonth(record.timeCompleted)
          break
        default:
          flag = true
      }
      return flag
    },
    width: 200
  },
  {
    title: 'DUE TIME',
    dataIndex: 'dueTime',
    render: (_, record) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{record.dueTime}</span>
        <span>
          <RightOutlined />
        </span>
      </div>
    ),
    width: 200
  }
]
export const AllTasksColumns = (pipelineType) => [
  {
    title: 'DESCRIPTION',
    dataIndex: 'description'
  },
  {
    title: `ASSIGNED ${pipelineType == 'Sales pipeline' ? 'DEAL' : 'TICKET'}`,
    dataIndex: 'assignedDeal'
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    filters: [
      {
        text: 'Active',
        value: 'Active'
      },
      {
        text: 'Overdue',
        value: 'Overdue'
      },
      {
        text: 'Completed',
        value: 'Completed'
      }
    ],
    onFilter: (value, record) => {
      return record.status.startsWith(value)
    },
    render: (_, record) => {
      return (
        <div
          style={{
            background: `${switchStatusColor(record.status)}`
          }}
          className={styles.statusText}
        >
          {record.status}
        </div>
      )
    }
  },
  {
    title: 'Due Time',
    dataIndex: 'dueTime',
    filters: [
      // {
      //   text: 'ALL time',
      //   value: 1
      // },
      {
        text: 'Today',
        value: 2
      },
      {
        text: 'Tomorrow',
        value: 3
      },
      {
        text: 'This week',
        value: 4
      },
      {
        text: 'Next week',
        value: 5
      },
      {
        text: 'This month',
        value: 6
      },
      {
        text: 'Next month',
        value: 7
      },
      {
        text: 'Yesterday',
        value: 8
      },
      {
        text: 'Last week',
        value: 9
      },
      {
        text: 'Last month',
        value: 10
      }
    ],
    onFilter: (value, record) => {
      let flag = false
      switch (value) {
        // case 1:
        //   // all time
        //   flag = true
        //   break
        case 2:
          // today
          flag = isToday(record.dutTime)
          break
        case 3:
          // tomorrow
          flag = isTomorrow(record.dutTime)
          break
        case 4:
          // this week
          flag = isThisWeek(record.dutTime)
          break
        case 5:
          // next week
          flag = isNextWeek(record.dutTime)
          break
        case 6:
          // this month
          flag = isThisMonth(record.dutTime)
          break
        case 7:
          // next month
          flag = isNextMonth(record.dutTime)
          break
        case 8:
          // yesterday
          flag = isYesterday(record.dutTime)
          break
        case 9:
          // last week
          flag = isLastWeek(record.dutTime)
          break
        case 10:
          // last month
          flag = isLastMonth(record.dutTime)
          break
        default:
          flag = true
      }
      return flag
    },
    width: 200
  },
  {
    title: 'ASSIGNEE',
    dataIndex: 'assignee',
    filters: [
      {
        text: 'Cathy',
        value: 'Cathy'
      },
      {
        text: 'Neela',
        value: 'Neela'
      },
      {
        text: 'Theo',
        value: 'Theo'
      }
    ],
    onFilter: (value, record) => {
      return record.assignee.startsWith(value)
    },
    render: (_, record) => (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{record.assignee}</span>
        <span>
          <RightOutlined />
        </span>
      </div>
    ),
    width: 200
  }
]
