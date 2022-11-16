import React, { useState } from 'react'
import Image from 'next/image'
// components
import { Box, Flex, Modal } from '@/components/commons'
// css
import styled from 'styled-components'

// main
const Receiving = () => {
  const [scanning, setScanning] = useState(false)
  const [scan, setScan] = useState(false)

  const startScan = () => {
    setScan(true)
    setScanning(true)
  }

  return (
    <>
      <Flex
        alignItems="flex-start"
        styles={{ width: '100%', 'padding-top': '66px' }}
      >
        <Box
          as="button"
          borderType="dashed"
          onClick={(e) => {
            e.stopPropagation()
            startScan()
          }}
        >
          <LogoBox>
            <Image
              src="/images/scanner.png"
              alt="scan"
              layout="responsive"
              width={96}
              height={96}
            />
          </LogoBox>
          <Text>Click to start scanning</Text>
        </Box>
      </Flex>
      {scan && <Modal onClose={() => setScan(false)}></Modal>}
    </>
  )
}

export default Receiving

const Text = styled.div`
  margin-left: 10px;
  font-size: ${({ theme }) => theme.font.size.s};
  font-weight: ${({ theme }) => theme.font.weight.normal};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.primaryText};
`
const LogoBox = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 20px;
`
