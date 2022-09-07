import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../store/slices/userSlice'
import { User } from '../../utils/utils'
import { Row, Col, Input, Button, message, Spin } from 'antd'
import styles from './index.module.scss'

const user = new User()

const Login = () => {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (
      credentials.username.trim() == '' ||
      credentials.password.trim() == ''
    ) {
      message.warn('Please complete the information.')
      return
    }
    setLoading(true)
    const req = await user.login(credentials)
    if (req.message) {
      setError(true)
      setErrorMessage(req.message)
      setLoading(false)
    } else {
      const { token, user_display_name, user_email, user_id, user_nicename } =
        req
      dispatch(
        loginUser({
          user: {
            info: {
              id: user_id,
              displayName: user_display_name,
              email: user_email,
              nickname: user_nicename
            },
            isLoggedIn: true,
            accessToken: token
          }
        })
      )
      setLoading(false)
      setCredentials({ username: '', password: '' })
      setError(false)
      setErrorMessage('')
    }
  }

  const handleInput = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <Row className={styles.loginWrap}>
      <Col className={styles.login}>
        <>
          <div className={styles.title}>LOG IN</div>
          <div className={styles.label}>USERNAME</div>
          <div>
            <Input
              value={credentials.username}
              onChange={handleInput}
              name="username"
              size="large"
            />
          </div>
          <div className={styles.label} style={{ marginTop: '13px' }}>
            PASSWORD
          </div>
          <div>
            <Input.Password
              value={credentials.password}
              onChange={handleInput}
              name="password"
              type="password"
              size="large"
            />
            {error && (
              <div
                className={styles.errorMsg}
                dangerouslySetInnerHTML={{ __html: errorMessage }}
              ></div>
            )}
          </div>
          <div>
            <Button
              size="large"
              className={styles.submitBtn}
              onClick={() => submit()}
            >
              Log in
            </Button>
          </div>
        </>
        {loading && (
          <Row justify="center" align="middle" className={styles.spinWrap}>
            <Col>
              <Spin tip="Loading..." size="large" />
            </Col>
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Login
