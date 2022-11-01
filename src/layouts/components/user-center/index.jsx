import { useState } from 'react'
// redux
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../store/slices/userSlice'
// components
import { Icon } from '../../../components/commons'
import TimeSensitive from './components/time-sensitive'
import AttentionNeeded from './components/attention-needed'
import ImportantChange from './components/important-change'
import { Row, Col, Switch } from 'antd'
// css
import styled from 'styled-components'
import styles from './index.module.scss'
import { useEffect } from 'react'
// js 
const tabList = ['Time sensitive', 'Attention needed', 'Important changes']
// main
const History = ({ show, onClose, user }) => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('Time sensitive')
  const logout = () => {
    dispatch(logoutUser())
  }
  useEffect(()=>{
    console.log('1234');
  },[])
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
          {activeTab == 'Time sensitive' && <TimeSensitive />}
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
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(110%)')};
  transition: all 0.3s ease-in-out;
`
