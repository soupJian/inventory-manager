import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
// redux
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../store/slices/userSlice'
// components
import { Icon } from '../../../components/commons'
const TimeSensitive = dynamic(() => import('./components/time-sensitive'))
const AttentionNeeded = dynamic(() => import('./components/attention-needed'))
const ImportantChange = dynamic(() => import('./components/important-change'))
import { Row, Col, Switch } from 'antd'
// css
import styled from 'styled-components'
import styles from './index.module.less'
// js
const tabList = ['Time sensitive', 'Attention needed', 'Important changes']

// main
const History = ({ show, onClose, user }) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Time sensitive')
  const [timeSensitiveData, setTimeSensitiveData] = useState([])
  const [attentionNeededDate, setAttentionNeededData] = useState([])
  const [importantChangeData, setImportantChangeData] = useState([])
  const logout = () => {
    dispatch(logoutUser())
  }
  const getData = () => {
    setTimeSensitiveData(() => {
      const list = [
        {
          uid: 1,
          type: 'deal',
          time: '2022-11-1',
          read: true,
          noticeName: 'Kevin Bowen',
          noticeStatus: 1 // 任务即将截止 提示 还有多少时间
        },
        {
          uid: 2,
          type: 'deal',
          read: false,
          time: '2022-11-2',
          noticeName: 'Adam Kruger',
          description: 'Follow up to ask the contact to pay for the invoice',
          noticeStatus: 2 // 任务过期未完成
        },
        {
          uid: 3,
          type: 'ticket',
          read: false,
          time: '2022-11-1',
          noticeName: 'Leo Bay',
          noticeStatus: 3 // 收到新邮件
        },
        {
          uid: 4,
          type: 'deal',
          read: true,
          time: '2022-11-2',
          noticeName: 'Adam Kruger',
          noticeStatus: 4 // 有新的 ticket 或者 deal 分配
        },
        {
          uid: 5,
          type: 'deal',
          read: true,
          time: '2022-11-1',
          description: 'Make a mockup with the walls design for the customer',
          noticeStatus: 5 // 有新的任务
        },
        {
          uid: 6,
          type: 'deal',
          read: true,
          time: '2022-11-1',
          noticeName: 'Thomas Smith',
          noticeStatus: 6 // 如果 deal 或者 ticket 收到新邮件 但超过一天未读
        },
        {
          uid: 7,
          type: 'deal',
          read: true,
          time: '2022-11-1',
          noticeStatus: 7 // 收到 别的客服 通知  邮件的发送者出现在另外一个 deal 或者 ticket 中
        }
      ]
      const newList = []
      list.forEach((item) => {
        const i = newList.findIndex((listItem) => item.time == listItem.time)
        if (i >= 0) {
          newList[i].list.push(item)
        } else {
          newList.push({
            time: item.time,
            list: [item]
          })
        }
      })
      return newList
    })
    setAttentionNeededData(() => {
      const list = [
        {
          uid: 1,
          type: 'deal',
          time: '2022-11-1',
          read: false,
          noticeName: 'Kevin Bowen',
          actionPerson: 'Trish', // 执行人
          deleted: false, // 被删除？
          noticeStatus: 1 // 你的ticket或者deal被 别的 客服删除
        },
        {
          uid: 2,
          type: 'ticket',
          read: true,
          time: '2022-11-2',
          noticeName: 'Adam Kruger',
          actionPerson: 'Trish',
          deleted: true,
          description: 'Send a new mockup to the customer',
          noticeStatus: 2 // 负责的任务被删除
        },
        {
          uid: 3,
          read: false,
          time: '2022-11-1',
          noticeName: 'Leo Bay',
          noticeStatus: 3 // 邮寄标签已创建
        },
        {
          uid: 4,
          read: true,
          time: '2022-11-2',
          noticeName: 'Adam Kruger',
          noticeStatus: 4 // 替换货物已寄出，且工厂留有 note
        },
        {
          uid: 5,
          read: true,
          time: '2022-11-1',
          noticeName: 'Kevin Mitch',
          noticeStatus: 5 // 替换货物库存不足
        },
        {
          uid: 6,
          read: true,
          time: '2022-11-1',
          noticeName: 'Thomas Smith',
          noticeStatus: 6 // 工厂收到寄回的货物，且留有 note
        },
        {
          uid: 7,
          read: true,
          time: '2022-11-1',
          noticeName: 'Kevin Bowden',
          noticeStatus: 7 // 新的订单，负责的 deal 顾客成功下单
        }
      ]
      const newList = []
      list.forEach((item) => {
        const i = newList.findIndex((listItem) => item.time == listItem.time)
        if (i >= 0) {
          newList[i].list.push(item)
        } else {
          newList.push({
            time: item.time,
            list: [item]
          })
        }
      })
      return newList
    })
    setImportantChangeData(() => {
      const list = [
        {
          uid: 1,
          type: 'deal',
          time: '2022-11-1',
          read: false,
          noticeName: 'Kevin Bowen',
          actionPerson: 'Trish', // 执行人
          toPerson: 'Trish', // 任务转交给谁
          noticeStatus: 1 // 任务负责人更改
        },
        {
          uid: 2,
          type: 'ticket',
          time: '2022-11-2',
          read: true,
          noticeName: 'Adam Kruger',
          actionPerson: 'Trish', // 执行人
          toPerson: 'Trish', // 任务转交给谁
          noticeStatus: 2 // 该客服的 deal 或者 ticket 负责人被更改
        },
        {
          uid: 3,
          read: false,
          time: '2022-11-1',
          noticeName: 'Leo Bay',
          actionPerson: 'Trish', // 执行人
          beforeAccess: 'Viewer',
          access: 'Admin',
          noticeStatus: 3 // 权限更改 该客服的系统权限被更改
        }
      ]
      const newList = []
      list.forEach((item) => {
        const i = newList.findIndex((listItem) => item.time == listItem.time)
        if (i >= 0) {
          newList[i].list.push(item)
        } else {
          newList.push({
            time: item.time,
            list: [item]
          })
        }
      })
      return newList
    })
  }
  useEffect(() => {
    if (show) {
      getData()
    }
  }, [show])
  return (
    <HistoryWrapper show={show}>
      <div className={styles.container}>
        <div onClick={onClose} className={styles.CloseButton}>
          <Icon name="close-rounded" width="24px" height="24px" />
        </div>
        <div className={styles.content}>
          <div className={`${styles.shallowText} ${styles.subTitle}`}>
            Account Info
          </div>
          <div style={{ margin: '6px 0' }}>Username: {user.user.email}</div>
          <div>Role: {user.user.userRole}</div>
          <div style={{ margin: '20px 0 24px' }}>
            <span className={styles.loginBtn} onClick={() => logout()}>
              Sign out
            </span>
          </div>
          <Row justify="space-between" align="center">
            <Col className={styles.highLightText}>Online</Col>
            <Col>
              <Switch />
            </Col>
          </Row>
          <div className={styles.notificationText}>Notifications</div>
          <div className={styles.tab}>
            {tabList.map((item) => {
              return (
                <div key={item} className={styles.tabItem}>
                  <div
                    className={`${styles.tabName} ${
                      activeTab == item ? styles.activeTab : styles.shallowText
                    }`}
                    onClick={() => setActiveTab(item)}
                  >
                    {item}
                    <div className={styles.circle}></div>
                  </div>
                  {activeTab == item && (
                    <div className={styles.tabsBottom}></div>
                  )}
                </div>
              )
            })}
          </div>
          {activeTab == 'Time sensitive' && (
            <TimeSensitive data={timeSensitiveData} />
          )}
          {activeTab == 'Attention needed' && (
            <AttentionNeeded data={attentionNeededDate} />
          )}
          {activeTab == 'Important changes' && (
            <ImportantChange data={importantChangeData} />
          )}
        </div>
      </div>
    </HistoryWrapper>
  )
}

export default History

const HistoryWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  overflow-y: scroll;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(110%)')};
  transition: all 0.3s ease-in-out;
`
