import React, { useState } from 'react'
import Image from 'next/image'
import { Box, Flex, Modal } from '../../../components/commons'
import styled from 'styled-components'

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
const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`
const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.primaryText};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
`
const TriggeringText = styled.span`
  color: ${({ theme }) => theme.colors.accentText};
  text-decoration: underline;
  cursor: pointer;
`
const CustomInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 335px;
`

const Separator = styled.div`
  margin-top: 24px;
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 22px;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  align-self: center;
`
const ErrorMessage = styled.div`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.error};
`
const LookedUpItemName = styled.h3`
  font-size: ${({ theme }) => theme.font.size.md};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.primaryText};
  font-weight: ${({ theme }) => theme.font.weight.normal};

  & > strong {
    font-weight: ${({ theme }) => theme.font.weight.medium};
  }
`
const LogoBox = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 20px;
`
