import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { Loader } from '../commons'

const LoadingScreen = () => {
  return (
    <Wrapper>
      <Content>
        <ImageWrapper>
          <Image
            src="/images/company-logo.png"
            alt="logo"
            layout="responsive"
            quality={80}
            width={320}
            height={132}
          />
        </ImageWrapper>
        <Loader size={40} />
      </Content>
    </Wrapper>
  )
}

export default React.memo(LoadingScreen)

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ImageWrapper = styled.div`
  width: 200px;
  margin-bottom: 16px;
`
