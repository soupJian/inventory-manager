import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Router from 'next/router'
// components
import { loginUser } from '@/store/slices/userSlice'
import Loading from '@/components/loading'
import { Row, Col, Input, Button, message } from 'antd'
// api
import { login } from '@/service/user'
// css
import styles from './index.module.less'

// main
const Login = () => {
  const dispatch = useDispatch()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (credentials.email.trim() == '' || credentials.password.trim() == '') {
      message.warning('Please complete the information.')
      return
    }
    setLoading(true)
    const res = await login(credentials)
    setLoading(false)
    if (res) {
      if (res.message) {
        setError(true)
        setErrorMessage(res.message)
      } else {
        dispatch(
          loginUser({
            user: res.user,
            isLoggedIn: true,
            token: res.token
          })
        )
        // 登录成功后，配置版本信息
        localStorage.setItem('version', process.env.version)
        setCredentials({ email: '', password: '' })
        setError(false)
        setErrorMessage('')
        Router.push('/')
      }
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
              name="email"
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
        {loading && <Loading />}
      </Col>
    </Row>
  )
}

export default Login
