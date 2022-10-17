import React from 'react'
import styled from 'styled-components'

const Dialog = ({ children, styles }) => {
  return (
    <Wrap>
      <DialogWrapper styles={styles}>{children}</DialogWrapper>
    </Wrap>
  )
}

export default React.memo(Dialog)
const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  background: rgba(0, 0, 0, 0.43);
`
const DialogWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: translate(-50%, -50%);
  ${({ styles }) => styles && styles}
  background-color: #ECECEC;
  border-radius: 10px;
`
