import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import {
  Alert,
  Box,
  Button as ButtonV1,
  Flex,
  Icon,
  Input,
  Loader,
  Modal,
  Tab,
  Tabs,
  Wrapper,
  Filter
} from '../../components/commons'
import styled from 'styled-components'
import AddANewItem from '../../components/add-a-new-Item'
import { Api, objectsToQueryString } from '../../utils/utils'
import { locations } from '../../constants/pageConstants/locations'
import { useSelector } from 'react-redux'

const api = new Api()

const Receiving = () => {
  const user = useSelector((state) => state.user)

  const [activeTab, setActiveTab] = useState('scan')
  const [scanning, setScanning] = useState(false)
  const [scan, setScan] = useState(false)

  const [sku, setSku] = useState('')
  const [barcode, setBarcode] = useState('')
  const [name, setName] = useState('')

  const [lookedUpItem, setLookedUpItem] = useState(null)
  const [lookedUpItemCount, setLookedUpItemCount] = useState(0)
  const [lookedUpItemLocation, setLookedUpItemLocation] = useState([])
  const [lookUpLoading, setLookUpLoading] = useState(false)
  const [lookUpError, setLookUpError] = useState('')
  const [newItemModal, setNewItemModal] = useState(false)
  const startScan = () => {
    setScan(true)
    setScanning(true)
  }
  const lookUpItem = async (key) => {
    setLookedUpItem(null)
    setLookUpLoading(true)
    setLookUpError('')
    let param = {}
    if (key === 'sku') {
      setBarcode('')
      setName('')
      param = { [key]: sku }
    } else if (key == 'barcode') {
      setSku('')
      setName('')
      param = { [key]: barcode }
    } else {
      setBarcode('')
      setName('')
      param = { [key]: name }
    }
    api
      .getInventory(objectsToQueryString(param), {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        if (data.Items && data.Items?.length === 0) {
          setLookUpError("Sorry, We can't find the item!")
        } else if (!data.Items && data.message) {
          setLookUpError(data.message)
        }
        setLookUpLoading(false)
        setLookedUpItem(data.Items[0])
        setLookedUpItemCount(data.Items[0].Stock)
        setLookedUpItemLocation(data.Items[0].Location)
      })
      .catch((err) => {
        setLookUpLoading(false)
      })
  }
  const handleLocationList = (val) => {
    setLookedUpItemLocation((list) => {
      const newList = [...list]
      const idx = newList.findIndex((loc) => loc === val)
      if (idx >= 0) {
        newList.splice(idx, 1)
      } else {
        newList.push(val)
      }
      return newList
    })
  }
  const saveItem = () => {
    if (lookUpItem) {
      setLookUpLoading(true)
      api
        .updateInventory(
          {
            ...lookedUpItem,
            Updated: new Date(),
            Stock: parseInt(lookedUpItemCount),
            Location: lookedUpItemLocation
          },
          { Authorization: `Bearer ${user.accessToken}` }
        )
        .then((data) => {
          lookUpItem(sku ? 'sku' : 'barcode')
        })
    }
  }
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
          <>
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              styles={{ width: '100%', 'padding-top': '58px', gap: '40px' }}
            >
              <CustomInputGroup>
                <Label htmlFor="warehouse-recieving-name">NAME</Label>
                <Input
                  readOnly={lookUpLoading}
                  endIcon={
                    <LookupBtn
                      disabled={lookUpLoading}
                      onClick={() => lookUpItem('name')}
                    >
                      Look up
                    </LookupBtn>
                  }
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="Type"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="sku"
                  type="text"
                  id="warehouse-recieving-name"
                />
              </CustomInputGroup>
              <Separator>or</Separator>
              <CustomInputGroup>
                <Label htmlFor="warehouse-recieving-sku">SKU</Label>
                <Input
                  readOnly={lookUpLoading}
                  endIcon={
                    <LookupBtn
                      disabled={lookUpLoading}
                      onClick={() => lookUpItem('sku')}
                    >
                      Look up
                    </LookupBtn>
                  }
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="Type"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  name="sku"
                  type="text"
                  id="warehouse-recieving-sku"
                />
              </CustomInputGroup>
              <Separator>or</Separator>
              <CustomInputGroup>
                <Label htmlFor="warehouse-recieving-barcode">Barcode</Label>
                <Input
                  readOnly={lookUpLoading}
                  endIcon={
                    <LookupBtn
                      disabled={lookUpLoading}
                      onClick={() => lookUpItem('barcode')}
                    >
                      Look up
                    </LookupBtn>
                  }
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="Type"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  name="barcode"
                  type="text"
                  id="warehouse-recieving-barcode"
                />
              </CustomInputGroup>
            </Flex>
            {/* <Wrapper padding="16px 0">
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
                Can’t find the item.
                <TriggeringText onClick={() => setNewItemModal(true)}>
                  Add it to the system
                </TriggeringText>
              </Text>
            </Alert>
          </Wrapper> */}
            {lookUpLoading && <Loader size={30} />}
            {lookUpError && <ErrorMessage>{lookUpError}</ErrorMessage>}
            {lookedUpItem && !lookUpLoading && (
              <Wrapper padding="30px 0 39px">
                <LookedUpItemName>
                  Intaking: <strong>{lookedUpItem.Name}</strong>
                </LookedUpItemName>

                <Flex
                  padding="0"
                  justifyContent="flex-start"
                  gap="69px"
                  styles={{ 'margin-top': '39px' }}
                >
                  <InputGroup style={{ maxWidth: '335px' }}>
                    <Label htmlFor="warehouse-recieving-barcode">count</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="Type"
                      value={lookedUpItemCount}
                      onChange={(e) => setLookedUpItemCount(e.target.value)}
                      name="item-count"
                      type="number"
                      min={0}
                      id="warehouse-recieving-lookedup-item"
                    />
                  </InputGroup>
                  <InputGroup style={{ maxWidth: '335px' }}>
                    <Label htmlFor="warehouse-recieving-sku">
                      LOCATION(OPTIONAL)
                    </Label>
                    <Filter
                      wrapperStyles={{
                        width: '100%',
                        'margin-top': '10px'
                      }}
                      value={lookedUpItemLocation}
                      label=""
                      list={locations}
                      multiSelect
                      onSelect={handleLocationList}
                    />
                  </InputGroup>
                </Flex>
                <ButtonV1
                  loading={lookUpLoading}
                  onClick={saveItem}
                  styles={{ 'margin-top': '36px' }}
                  minWidth="78px"
                  kind="primary"
                >
                  Save
                </ButtonV1>
              </Wrapper>
            )}
          </>
        )}
        {activeTab == 'scan' && (
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
        )}
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
const ModifiedLabel = styled(Label)`
  font-size: ${({ theme }) => theme.font.size.xsss};
`

const CustomInput = styled.div`
  min-height: 59px;
  width: 100%;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background-color: #ffffff;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  overflow-x: auto;

  & > input {
    flex: 1 0 auto;
    background: transparent;
    border: none;
    font-size: ${({ theme }) => theme.font.size.s};
    line-height: ${({ theme }) => theme.font.lineHeight.wide};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    color: ${({ theme }) => theme.colors.primaryText};
    height: 100%;
    outline: none;
  }
`

const Tags = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 1 auto;
`

const Tag = styled.button`
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #000000;
  border-radius: 30px;
  background-color: transparent;
  filter: invert(100%) brightness(0%);
  cursor: pointer;
`
const TriggeringText = styled.span`
  color: ${({ theme }) => theme.colors.accentText};
  text-decoration: underline;
  cursor: pointer;
`
const CustomInputGroup = styled.div`
  position: relative;
  min-width: 335px;
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
`
const LookupBtn = styled.button`
  padding: 6px 12px;
  font-family: ${({ theme }) => theme.font.family.secondary};
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  color: #ffffff;
  background-color: #000000;
  white-space: nowrap;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:active {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000;
    transform: scale(0.975);
  }
  &:hover {
    background-color: #ffffff;
    color: #000000;
    border: 1px solid #000000;
  }
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
const Form = styled.form`
  width: 100%;
  overflow: hidden;
`
