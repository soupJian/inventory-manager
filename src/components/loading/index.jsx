import React from 'react'
import { Spin } from 'antd'

const Loading = ({
  left = 0,
  right = 0,
  bottom = 0,
  top = 0,
  tip = 'Loading...'
}) => {
  return (
    <Spin
      size="large"
      tip={tip}
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'fixed',
        left,
        right,
        bottom,
        top,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    />
  )
}

export default Loading
