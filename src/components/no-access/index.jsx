import React, { useRouter } from 'next/router'
// components

// main
import { Button, Result } from 'antd'
const NoAccess = () => {
  const router = useRouter()
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={() => router.push('/')}>
          Back Home
        </Button>
      }
    />
  )
}
export default NoAccess
