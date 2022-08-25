import {
  isToday,
  isYesterday,
  isThisWeek,
  isLastWeek,
  isThisMonth,
  isLastMonth
} from '../../../utils/formatTime'
// 根据表格 status 状态 渲染背景色
export const switchStatusColor = (status) => {
  switch (status) {
    case 'Interest showed':
      return '#FF7B7B'
    case 'Mockup sent':
      return 'rgba(247, 148, 0, 0.6)'
    case 'Mockup revising':
      return '#2C88DD'
    case 'Quote sent':
      return '#77D755'
    case 'Closed won':
      return '#2EBEBD'
    case 'Closed lost':
      return '#B7B7B7'
    default:
      return '#FF7B7B'
  }
}
// menu table 的 columns
export const menuColumns = [
  {
    title: 'DEAL NAME',
    dataIndex: 'dealName'
  },
  {
    title: 'STATUS',
    dataIndex: 'status',
    filters: [
      {
        text: 'Interest showed',
        value: 'Interest showed'
      },
      {
        text: 'Mockup sent',
        value: 'Mockup sent'
      },
      {
        text: 'Mockup revising',
        value: 'Mockup revising'
      },
      {
        text: 'Quote sent',
        value: 'Quote sent'
      },
      {
        text: 'Closed won',
        value: 'Closed won'
      },
      {
        text: 'Closed lost',
        value: 'Closed lost'
      }
    ],
    onFilter: (value, record) => {
      return record.status.startsWith(value)
    },
    render: (_, record) => {
      return (
        <div
          style={{
            background: `${switchStatusColor(record.status)}`,
            padding: '1px 6px',
            display: 'inline-block',
            height: '19px',
            lineHeight: '17px',
            fontFamily: 'Rubik',
            fontWeight: '400',
            fontSize: '14px',
            color: '#ffffff'
          }}
        >
          {record.status}
        </div>
      )
    }
  },
  {
    title: 'CUSTOMER TYPR',
    dataIndex: 'customerType'
  },
  {
    title: 'INTEREST',
    dataIndex: 'interest'
  },
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    filters: [
      {
        text: 'Below $400',
        value: 1
      },
      {
        text: '$400-$800',
        value: 2
      },
      {
        text: '$801-$1,500 ',
        value: 3
      },
      {
        text: 'Over $1,500',
        value: 4
      }
    ],
    onFilter: (value, record) => {
      let flag = true
      switch (value) {
        case 1:
          flag = record.amount < 400
          break
        case 2:
          // 理论上下面的 写法更好，800 结果推理是 true ，结果是 false
          if (record.amount >= 400 && record.amount <= 800) {
            flag = true
          } else {
            flag = false
          }
          // flag = record.amount >= 400 && record.value <= 800
          break
        case 3:
          // 理论上下面的 写法更好，明明是 true ，结果是 false
          if (record.amount >= 801 && record.amount <= 1500) {
            flag = true
          } else {
            flag = false
          }
          // flag = record.amount >= 801 && record.value <= 1500
          break
        case 4:
          flag = record.amount > 1500
          break
        default:
          flag = true
      }
      return flag
    },
    render: (_, record) => <>{`$${record.amount.toLocaleString()}`}</>
  },
  {
    title: 'CREATE DATE',
    dataIndex: 'createDate',
    filters: [
      {
        text: 'ALL time',
        value: 1
      },
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
        case 1:
          // all time
          flag = true
          break
        case 2:
          // today
          flag = isToday(record.createDate)
          break
        case 3:
          // yesterday
          flag = isYesterday(record.createDate)
          break
        case 4:
          // this week
          flag = isThisWeek(record.createDate)
          break
        case 5:
          // last week
          flag = isLastWeek(record.createDate)
          break
        case 6:
          // this month
          flag = isThisMonth(record.createDate)
          break
        case 7:
          // last month
          flag = isLastMonth(record.createDate)
          break
        default:
          flag = true
      }
      return flag
    }
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
    }
  }
]

export const filterColumns = [
  {
    title: 'AMOUNT',
    dataIndex: 'amount',
    filters: [
      {
        text: 'Below $400',
        value: 1
      },
      {
        text: '$400-$800',
        value: 2
      },
      {
        text: '$801-$1,500 ',
        value: 3
      },
      {
        text: 'Over $1,500',
        value: 4
      }
    ],
    onFilter: (value, record) => {
      let flag = true
      switch (value) {
        case 1:
          flag = record.amount < 400
          break
        case 2:
          // 理论上下面的 写法更好，800 结果推理是 true ，结果是 false
          if (record.amount >= 400 && record.amount <= 800) {
            flag = true
          } else {
            flag = false
          }
          // flag = record.amount >= 400 && record.value <= 800
          break
        case 3:
          // 理论上下面的 写法更好，明明是 true ，结果是 false
          if (record.amount >= 801 && record.amount <= 1500) {
            flag = true
          } else {
            flag = false
          }
          // flag = record.amount >= 801 && record.value <= 1500
          break
        case 4:
          flag = record.amount > 1500
          break
        default:
          flag = true
      }
      return flag
    },
    render: () => <></>
  },
  {
    title: 'CREATE DATE',
    dataIndex: 'createDate',
    filters: [
      {
        text: 'ALL time',
        value: 1
      },
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
        case 1:
          // all time
          flag = true
          break
        case 2:
          // today
          flag = isToday(record.createDate)
          break
        case 3:
          // yesterday
          flag = isYesterday(record.createDate)
          break
        case 4:
          // this week
          flag = isThisWeek(record.createDate)
          break
        case 5:
          // last week
          flag = isLastWeek(record.createDate)
          break
        case 6:
          // this month
          flag = isThisMonth(record.createDate)
          break
        case 7:
          // last month
          flag = isLastMonth(record.createDate)
          break
        default:
          flag = true
      }
      return flag
    },
    render: () => <></>
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
    render: () => <></>
  }
]
// 判断展示的是不是最后一页，如果是的话，那就展示多少条，如果不是，则就是 pagesize
export const currentSize = (current, len, pagesize) => {
  console.log(current)
  console.log(len)
  console.log(pagesize)
  if (len <= pagesize) return len
  const totalPage = Math.ceil(len / pagesize)
  if (current != totalPage) {
    return pagesize
  } else {
    return len - (totalPage - 1) * 10
  }
}
