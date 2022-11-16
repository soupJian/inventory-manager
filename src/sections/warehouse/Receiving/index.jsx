import React, { useState } from 'react'
// components
import { Alert, Icon, Tab, Tabs, Wrapper } from '@/components/commons'
import AddANewItem from '@/components/add-edit-new-Item'
import ReceivingScan from './scan'
import ReceivingType from './type'
// css
import styled from 'styled-components'

// main
const Receiving = ({ router }) => {
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
          submitNewItemFinally={(SKU) =>
            router.push(`/warehouse/item?sku=${SKU}`)
          }
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
const TriggeringText = styled.span`
  color: ${({ theme }) => theme.colors.accentText};
  text-decoration: underline;
  cursor: pointer;
`
