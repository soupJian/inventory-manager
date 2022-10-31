// redux
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../store/slices/userSlice'
// components
import { Icon } from '../../../components/commons'
// css
import styled from 'styled-components'
import styles from './index.module.scss'
// main
const History = ({ show, onClose, user }) => {
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(logoutUser())
  }
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
