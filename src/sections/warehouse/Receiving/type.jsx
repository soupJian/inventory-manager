import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
// components
import {
  Button,
  Flex,
  Input,
  Wrapper,
  Filter
} from '../../../components/commons'
import SearchInput from './search-input'
// js
import { toggleLoading } from '../../../store/slices/globalSlice'
import { locations } from '../../../constants/pageConstants/locations'
// api
import { updateInventory } from '../../../service/inventory'
// css
import styled from 'styled-components'

// main
const Type = ({ setNewItemModal }) => {
  const dispatch = useDispatch()
  const [lookSearch, setLookSearch] = useState({
    name: '',
    sku: '',
    barcode: ''
  })
  const [lookedUpItem, setLookedUpItem] = useState(null)
  const [lookedUpItemCount, setLookedUpItemCount] = useState(0)
  const [lookedUpItemLocation, setLookedUpItemLocation] = useState([])

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
    const data = {
      ...lookedUpItem,
      Updated: new Date(),
      Available: lookedUpItem.Available + parseInt(lookedUpItemCount),
      Stock: lookedUpItem.Stock + parseInt(lookedUpItemCount),
      Received: new Date()
    }
    // 如果添加了 location
    if (lookedUpItemLocation.length) {
      const arr = lookedUpItem.Location.concat(lookedUpItemLocation)
      const set = new Set(arr)
      data.Location = Array.from(set)
      data.Settled = lookedUpItem.Settled + parseInt(lookedUpItemCount)
      data.Unsettled = 0
      data.SettledTime = new Date()
    } else {
      // 没有添加 Location
      data.Unsettled =
        parseInt(lookedUpItem.Unsettled) + parseInt(lookedUpItemCount)
    }
    updateInventory('update', data).then(() => {
      setLookSearch({
        name: '',
        sku: '',
        barcode: ''
      })
      setLookedUpItemCount(0)
      setLookedUpItemLocation([])
      setLookedUpItem(null)
      dispatch(toggleLoading(false))
    })
  }
  return (
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
            selectValue={(value) =>
              setLookSearch({
                ...lookSearch,
                name: value
              })
            }
            value={lookSearch.name}
            selectedItem={lookUpItem}
            name="name"
            itemKey="Name"
            setNewItemModal={setNewItemModal}
            setLookedUpItem={setLookedUpItem}
          />
        </CustomInputGroup>
        <Separator>or</Separator>
        <CustomInputGroup>
          <Label htmlFor="warehouse-recieving-sku">SKU</Label>
          <SearchInput
            placeholder="Type"
            value={lookSearch.sku}
            selectValue={(value) =>
              setLookSearch({
                ...lookSearch,
                sku: value
              })
            }
            selectedItem={lookUpItem}
            name="sku"
            itemKey="SKU"
            setNewItemModal={setNewItemModal}
            setLookedUpItem={setLookedUpItem}
          />
        </CustomInputGroup>
        <Separator>or</Separator>
        <CustomInputGroup>
          <Label htmlFor="warehouse-recieving-barcode">Barcode</Label>
          <SearchInput
            placeholder="Type"
            value={lookSearch.barcode}
            selectValue={(value) =>
              setLookSearch({
                ...lookSearch,
                barcode: value
              })
            }
            selectedItem={lookUpItem}
            name="barcode"
            itemKey="Barcode"
            setNewItemModal={setNewItemModal}
            setLookedUpItem={setLookedUpItem}
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
                OptionWrapperStyle={{
                  'max-height': '230px'
                }}
              />
            </InputGroup>
          </Flex>
          <Button
            onClick={saveItem}
            styles={{ 'margin-top': '36px' }}
            minWidth="78px"
            kind="primary"
          >
            Save
          </Button>
        </Wrapper>
      )}
    </>
  )
}

export default React.memo(Type)

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
