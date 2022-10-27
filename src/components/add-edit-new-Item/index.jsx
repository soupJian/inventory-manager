import React, { useState } from 'react'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Filter, Flex, Icon, Input, Modal, Wrapper } from '../commons'
import { itemTemplate } from '../../constants/pageConstants/inventory'
import { locations } from '../../constants/pageConstants/locations'
import { Api } from '../../utils/utils'
const api = new Api()
import styled from 'styled-components'
import { nanoid } from 'nanoid'

const AddANewItem = ({
  type = 'add',
  title = 'Add a new item',
  newItemValue = itemTemplate,
  setNewItemModal,
  submitNewItemFinally
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [newItem, setNewItem] = useState({ ...newItemValue })
  const [newItemError, setNewItemError] = useState('')
  const newItemHandler = (e, nestedKey) => {
    if (nestedKey) {
      return setNewItem({
        ...newItem,
        [nestedKey]: {
          ...newItem[nestedKey],
          [e.target.name]: parseInt(e.target.value)
        }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = [...newItem.Tags]
      if (e.target.value[e.target.value.length - 1] == ',') {
        newTags.push(e.target.value.slice(0, -1))
        setNewItem({ ...newItem, TagsInput: '', Tags: newTags })
      } else {
        setNewItem({ ...newItem, TagsInput: e.target.value })
      }
    } else {
      if (e.target.type === 'number') {
        return setNewItem({
          ...newItem,
          [e.target.name]: parseInt(e.target.value)
        })
      } else {
        return setNewItem({ ...newItem, [e.target.name]: e.target.value })
      }
    }
  }
  const removeTag = (tag) => {
    const idx = newItem.Tags.indexOf(tag)
    if (idx >= 0) {
      let newTags = [...newItem.Tags]
      newTags.splice(idx, 1)
      setNewItem({ ...newItem, TagsInput: '', Tags: newTags })
    }
  }
  const handleNewLocationList = (name, val) => {
    const idx = newItem.Location.findIndex((loc) => loc === val)
    let newLocationList = [...newItem.Location]
    if (idx >= 0) {
      newLocationList.splice(idx, 1)
      setNewItem({ ...newItem, [name]: newLocationList })
    } else {
      setNewItem({ ...newItem, [name]: [...newLocationList, val] })
    }
  }
  // 新增
  const submitNewItem = (e) => {
    setNewItemError('')
    e.preventDefault()
    if (!newItem.Name || !newItem.Barcode) {
      setNewItemError('Required')
    } else {
      dispatch(toggleLoading(true))
      const TotalCost = Object.values(newItem.Cost).reduce(
        (total, cost) => total + parseInt(cost),
        0
      )
      const settledInfo = {
        Settled: newItem.Location.length > 0,
        SettledTime: newItem.Location.length ? new Date() : ''
      }
      let data = {
        ...newItem,
        Available: newItem.Stock,
        ...settledInfo,
        Updated: new Date(),
        Received: new Date(),
        Created: new Date(),
        TotalCost,
        SystemId: nanoid()
      }
      delete data['TagsInput']
      api
        .updateInventory(data, { Authorization: `Bearer ${user.accessToken}` })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch(toggleLoading(false))
          setNewItemModal(false)
          setNewItemError('')
          setNewItem({ ...itemTemplate })
          // new完成后通知父元素
          submitNewItemFinally(newItem.SKU)
        })
    }
  }
  // 编辑
  const submitEditedItem = (e) => {
    setNewItemError('')
    e.preventDefault()
    if (!newItem.Name || !newItem.Barcode) {
      setNewItemError('Required')
    } else {
      dispatch(toggleLoading(true))
      const theSameLocation =
        newItem.Location.sort().join(',') ===
        newItemValue.Location.sort().join(',')
      const TotalCost = Object.values(newItem.Cost).reduce(
        (total, cost) => total + parseInt(cost),
        0
      )
      let data = {
        ...newItem,
        // 计算Available 差额
        Available: newItem.Available + newItem.Stock - newItemValue.Stock,
        Updated: new Date(),
        TotalCost,
        SettledTime: theSameLocation ? newItem.SettledTime : new Date(),
        Settled: newItem.Location.length > 0
      }
      console.log(newItem)
      // 如果SKU发生改变，则SKU不变，新增NewSKU传递
      if (newItem.SKU != newItemValue.SKU) {
        data.NewSKU = data.SKU
        data.SKU = newItemValue.SKU
      }
      console.log(data)
      delete data['TagsInput']
      api
        .updateInventory(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          modalHandler(false)
          setNewItemError('')
          setEditItem({ ...itemTemplate })
          fetchItem()
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch(toggleLoading(false))
          setNewItemModal(false)
          setNewItemError('')
          setNewItem({ ...newItemValue })
          // 更新完成后通知父元素
          submitNewItemFinally(newItem.SKU)
        })
    }
  }
  const submitForm = (e) => {
    if (type == 'add') {
      submitNewItem(e)
    } else {
      submitEditedItem(e)
    }
  }
  return (
    <Modal
      title={title}
      closeOnClickOutside={false}
      onClose={() => setNewItemModal(false)}
    >
      <Wrapper padding="32px 0 0" styles={{ width: '632px' }}>
        <Form onSubmit={submitForm}>
          <InputGroup>
            <Label htmlFor="warehouse-recieving-sku">Name*</Label>
            <Input
              wrapperStyles={{
                'margin-top': '16px',
                'min-height': '59px',
                border: newItemError && !newItem.Name ? '2px solid #CB0000' : ''
              }}
              inputStyles={{ width: '100%' }}
              placeholderStyles={{
                color: newItemError && !newItem.Name ? '#CB0000' : ''
              }}
              placeholder={newItemError && !newItem.Name ? 'Required' : 'Type'}
              value={newItem.Name}
              onChange={(e) => newItemHandler(e)}
              name="Name"
              type="text"
              id="warehouse-new-item-name"
            />
          </InputGroup>
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            styles={{
              width: '100%',
              'margin-top': '24px',
              gap: '24px'
            }}
          >
            <InputGroup>
              <Label htmlFor="warehouse-recieving-sku">SKU</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px'
                }}
                inputStyles={{ width: '100%' }}
                placeholder="Type"
                value={newItem.SKU}
                onChange={(e) => newItemHandler(e)}
                name="SKU"
                type="text"
                id="warehouse-new-item-sku"
              />
            </InputGroup>
            <InputGroup>
              <Label htmlFor="warehouse-recieving-sku">BARCODE*</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px',
                  border:
                    newItemError && !newItem.Barcode ? '2px solid #CB0000' : ''
                }}
                inputStyles={{ width: '100%' }}
                placeholderStyles={{
                  color: newItemError && !newItem.Barcode ? '#CB0000' : ''
                }}
                placeholder={
                  newItemError && !newItem.Barcode ? 'Required' : 'Type'
                }
                value={newItem.Barcode}
                onChange={(e) => newItemHandler(e)}
                name="Barcode"
                type="text"
                id="warehouse-new-item-barcode"
              />
            </InputGroup>
          </Flex>
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            styles={{
              width: '100%',
              'margin-top': '24px',
              gap: '24px'
            }}
          >
            <InputGroup>
              <Label htmlFor="warehouse-recieving-sku">STOCK</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px'
                }}
                inputStyles={{ width: '100%' }}
                placeholder="0"
                value={newItem.Stock ? newItem.Stock : ''}
                onChange={(e) => newItemHandler(e)}
                min={0}
                name="Stock"
                type="number"
                id="warehouse-new-item-count"
              />
            </InputGroup>
            {/* <InputGroup>
          <Label htmlFor="warehouse-recieving-sku">AVAILABLE</Label>
          <Input
            wrapperStyles={{
              'margin-top': '16px',
              'min-height': '59px'
            }}
            inputStyles={{ width: '100%' }}
            placeholder="0"
            value={newItem.Available}
            onChange={(e) => newItemHandler(e)}
            name="Available"
            type="number"
            id="warehouse-new-item-available"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="warehouse-recieving-sku">RESERVED</Label>
          <Input
            wrapperStyles={{
              'margin-top': '16px',
              'min-height': '59px'
            }}
            inputStyles={{ width: '100%' }}
            placeholder="0"
            value={newItem.Reserved}
            onChange={(e) => newItemHandler(e)}
            name="Reserved"
            type="number"
            id="warehouse-new-item-reserved"
          />
        </InputGroup> */}
            <InputGroup>
              <Label htmlFor="warehouse-recieving-sku">REORDER ALERT</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px'
                }}
                inputStyles={{ width: '100%' }}
                placeholder="0"
                value={newItem.ReorderAlert ? newItem.ReorderAlert : ''}
                onChange={(e) => newItemHandler(e)}
                name="ReorderAlert"
                type="number"
                min={0}
                id="warehouse-new-item-reorder-alert"
              />
            </InputGroup>
          </Flex>
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            styles={{
              width: '100%',
              'margin-top': '24px',
              gap: '24px'
            }}
          >
            <InputGroup>
              <Label htmlFor="warehouse-recieving-sku">LOCATION</Label>
              <Filter
                wrapperStyles={{
                  width: '100%',
                  'margin-top': '10px'
                }}
                name="Location"
                value={newItem.Location}
                label=""
                list={locations}
                multiSelect
                onSelect={handleNewLocationList}
              />
            </InputGroup>
          </Flex>
          <Wrapper padding="24px 0 0">
            <Flex
              alignItems="stretch"
              justifyContent="flex-start"
              styles={{
                width: '100%',
                'margin-top': '16px',
                gap: '9px'
              }}
            >
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  WEIGHT (LB.)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={newItem.attr.weight ? newItem.attr.weight : ''}
                  onChange={(e) => newItemHandler(e, 'attr')}
                  name="weight"
                  type="number"
                  min={0}
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  LENGTH (IN.)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={newItem.attr.length ? newItem.attr.length : ''}
                  onChange={(e) => newItemHandler(e, 'attr')}
                  name="length"
                  type="number"
                  min={0}
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  WIDTH (IN.)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={newItem.attr.width ? newItem.attr.width : ''}
                  onChange={(e) => newItemHandler(e, 'attr')}
                  name="width"
                  type="number"
                  min={0}
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  HEIGHT (IN.)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={newItem.attr.height ? newItem.attr.height : ''}
                  onChange={(e) => newItemHandler(e, 'attr')}
                  name="height"
                  type="number"
                  min={0}
                />
              </InputGroup>
            </Flex>
          </Wrapper>
          <Wrapper padding="24px 0 0">
            <Label htmlFor="warehouse-recieving-sku">US COST</Label>
            <Flex
              alignItems="stretch"
              justifyContent="flex-start"
              styles={{
                width: '100%',
                'margin-top': '16px',
                gap: '9px'
              }}
            >
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  ITEM COST ($)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={newItem.Cost.ItemCost ? newItem.Cost.ItemCost : ''}
                  onChange={(e) => newItemHandler(e, 'Cost')}
                  name="ItemCost"
                  type="number"
                  min={0}
                  id="warehouse-new-item-cost"
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  CUSTOM ENTRY DUTY ($)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={
                    newItem.Cost.CustomEntryDuty
                      ? newItem.Cost.CustomEntryDuty
                      : ''
                  }
                  onChange={(e) => newItemHandler(e, 'Cost')}
                  name="CustomEntryDuty"
                  type="number"
                  min={0}
                  id="warehouse-new-item-ced"
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  OCEAN FREIGHT ($)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={
                    newItem.Cost.OceanFreight ? newItem.Cost.OceanFreight : ''
                  }
                  onChange={(e) => newItemHandler(e, 'Cost')}
                  name="OceanFreight"
                  type="number"
                  min={0}
                  id="warehouse-new-item-of"
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  WAREHOUSE DELIVERY ($)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={
                    newItem.Cost.WarehouseDelivery
                      ? newItem.Cost.WarehouseDelivery
                      : ''
                  }
                  onChange={(e) => newItemHandler(e, 'Cost')}
                  name="WarehouseDelivery"
                  type="number"
                  min={0}
                  id="warehouse-new-item-wd"
                />
              </InputGroup>
              <InputGroup>
                <ModifiedLabel htmlFor="warehouse-recieving-sku">
                  CUSTOMER SHIPPING ($)
                </ModifiedLabel>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px'
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholder="0"
                  value={
                    newItem.Cost.CustomerShipping
                      ? newItem.Cost.CustomerShipping
                      : ''
                  }
                  onChange={(e) => newItemHandler(e, 'Cost')}
                  name="CustomerShipping"
                  type="number"
                  min={0}
                  id="warehouse-new-item-cs"
                />
              </InputGroup>
            </Flex>
          </Wrapper>
          <Wrapper padding="24px 0 0">
            <Label htmlFor="warehouse-recieving-sku">
              TAGS (use comma to seperate)
            </Label>
            <CustomInput>
              <Tags>
                {newItem.Tags?.map((tag) => {
                  if (tag.length) {
                    return (
                      <Tag
                        onClick={(e) => removeTag(tag)}
                        type="button"
                        key={tag}
                      >
                        {tag}
                        <Icon name="close-rounded" width="12px" height="12px" />
                      </Tag>
                    )
                  }
                })}
              </Tags>
              <input
                type="text"
                name="Tags"
                value={newItem.TagsInput}
                onChange={(e) => newItemHandler(e)}
              />
            </CustomInput>
          </Wrapper>
          <Flex
            styles={{
              'max-width': '78px',
              'margin-left': 'auto',
              'margin-top': '24px'
            }}
          >
            <Button type="submit" kind="primary">
              Save
            </Button>
          </Flex>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default AddANewItem
const Form = styled.form`
  width: 100%;
  overflow: hidden;
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
