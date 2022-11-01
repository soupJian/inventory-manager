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
import styles from './index.module.scss'
// js
const tabList = ['Time sensitive', 'Attention needed', 'Important changes']
// main
const History = ({ show, onClose, user }) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Time sensitive')
  const [timeSensitiveData, setTimeSensitiveData] = useState([])
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
          noticeStatus: 1
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
          noticeStatus: 3
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
          {activeTab == 'Attention needed' && <AttentionNeeded />}
          {activeTab == 'Important changes' && <ImportantChange />}
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
