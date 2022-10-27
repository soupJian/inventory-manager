import React, { useState } from 'react'
import { toggleLoading } from '../../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import Image from 'next/image'
import { Alert, Icon, Tab, Tabs, Wrapper } from '../../../components/commons'
import styled from 'styled-components'
import AddANewItem from '../../../components/add-edit-new-Item'
import ReceivingScan from './scan'
import ReceivingType from './type'

const Receiving = () => {
  const [activeTab, setActiveTab] = useState('scan')
  const [newItemModal, setNewItemModal] = useState(false)
  return (
    <Wrapper height="auto" padding="38px 0">
      <Alert
        type="notification"
        styles={{
          display: 'flex',
          'align-items': 'center',
          borderRadius: '10px',
          width: 'fit-content'
        }}
      >
        <Icon name="notification" width="20px" height="20px" />
        <Text>
          For new items not registered,
          <TriggeringText onClick={() => setNewItemModal(true)}>
            Add the item first
          </TriggeringText>
        </Text>
      </Alert>

      <Wrapper height="auto" padding="47px 0 0">
        <Tabs>
          <Tab
            contentStyles={{ 'font-size': '18px' }}
            onClick={() => setActiveTab('scan')}
            active={'scan' === activeTab}
            idx={0}
          >
            Scan
          </Tab>
          <Tab
            contentStyles={{ 'font-size': '18px' }}
            onClick={() => setActiveTab('type')}
            active={'type' === activeTab}
            idx={1}
          >
            Type Name/SKU/Barcode
          </Tab>
        </Tabs>
        {activeTab == 'type' && (
          <ReceivingType setNewItemModal={setNewItemModal} />
        )}
        {activeTab == 'scan' && <ReceivingScan />}
      </Wrapper>
      {newItemModal && (
        <AddANewItem
          setNewItemModal={setNewItemModal}
          submitNewItemFinally={() => null}
        />
      )}
    </Wrapper>
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
