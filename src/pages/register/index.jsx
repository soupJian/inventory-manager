import { useState } from 'react'
import { useRouter } from 'next/router'
// components
import { Row, Col, Input, Button } from 'antd'
import Loading from '../../components/loading'
// api
import { login } from '../../service/user'
// css
import styles from './index.module.less'

// main
const Register = () => {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (
      credentials.email.trim() == '' ||
      credentials.password.trim() == '' ||
      credentials.confirmPassword.trim() == ''
    ) {
      setErrorMessage('Please complete the information.')
      return
    }
    if (credentials.password.trim() != credentials.confirmPassword.trim()) {
      setErrorMessage('Passwords do not match.')
      return
    }
    setLoading(true)
    const res = await login({
      email: credentials.email,
      password: credentials.password
    })
    setLoading(false)
    if (res.message) {
      setErrorMessage(res.message)
    } else {
      router.push('/')
    }
  }

  const handleInput = (e) => {
    setErrorMessage('')
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  return (
    <Row className={styles.loginWrap}>
      <Col className={styles.login}>
        <>
          <div className={styles.title}>SIGN UP</div>
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
          </div>
          <div className={styles.label} style={{ marginTop: '13px' }}>
            CONFIRM PASSWORD
          </div>
          <div>
            <Input.Password
              value={credentials.confirmPassword}
              onChange={handleInput}
              name="confirmPassword"
              type="password"
              size="large"
            />
            <div
              className={styles.errorMsg}
              dangerouslySetInnerHTML={{ __html: errorMessage }}
            ></div>
          </div>
          <div>
            <Button
              size="large"
              className={styles.submitBtn}
              onClick={() => submit()}
            >
              Sign up
            </Button>
          </div>
        </>
        {loading && <Loading />}
      </Col>
    </Row>
  )
}

export default Register
