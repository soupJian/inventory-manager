import React, { useState } from 'react'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
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
import SearchInput from './search-input'
import styled from 'styled-components'
import AddANewItem from '../../components/add-edit-new-Item'
import { Api } from '../../utils/utils'
import { locations } from '../../constants/pageConstants/locations'
import { useSelector } from 'react-redux'

const api = new Api()

const Receiving = () => {
  const dispatch = useDispatch()
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
  const [newItemModal, setNewItemModal] = useState(false)

  const startScan = () => {
    setScan(true)
    setScanning(true)
  }
  const lookUpItem = async (Item) => {
    setLookedUpItem(Item)
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
    dispatch(toggleLoading(true))
    const arr = lookedUpItem.Location.concat(lookedUpItemLocation)
    const set = new Set(arr)
    api
      .updateInventory(
        {
          ...lookedUpItem,
          Updated: new Date(),
          Available: lookedUpItem.Available + parseInt(lookedUpItemCount),
          Stock: lookedUpItem.Stock + parseInt(lookedUpItemCount),
          Location: Array.from(set),
          Settled: lookedUpItemCount.length > 0
        },
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then(() => {
        setName('')
        setBarcode('')
        setSku('')
        setLookedUpItemCount(0)
        setLookedUpItemLocation([])
        setLookedUpItem(null)
        dispatch(toggleLoading(false))
      })
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
                <SearchInput
                  placeholder="Type"
                  selectValue={name}
                  selectedItem={lookUpItem}
                  name="name"
                  itemKey="Name"
                  setNewItemModal={setNewItemModal}
                />
              </CustomInputGroup>
              <Separator>or</Separator>
              <CustomInputGroup>
                <Label htmlFor="warehouse-recieving-sku">SKU</Label>
                <SearchInput
                  placeholder="Type"
                  selectValue={sku}
                  selectedItem={lookUpItem}
                  name="sku"
                  itemKey="SKU"
                  setNewItemModal={setNewItemModal}
                />
              </CustomInputGroup>
              <Separator>or</Separator>
              <CustomInputGroup>
                <Label htmlFor="warehouse-recieving-barcode">Barcode</Label>
                <SearchInput
                  placeholder="Type"
                  selectValue={barcode}
                  selectedItem={lookUpItem}
                  name="barcode"
                  itemKey="Barcode"
                  setNewItemModal={setNewItemModal}
                />
              </CustomInputGroup>
            </Flex>
            {lookedUpItem && (
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
                      headerStyles={{
                        height: '59px',
                        lineHeight: '59px'
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
