import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  BaseButton,
  Button,
  Dialog,
  Filter,
  Flex,
  Icon,
  Input,
  InputGroup,
  Label,
  Loader,
  Modal,
  Text,
  Wrapper
} from '../../components/commons'
import Item from './inventory-item'
import { itemTemplate } from '../../constants/pageConstants/inventory'
import { locations } from '../../constants/pageConstants/locations'
import { Api } from '../../utils/utils'
const api = new Api()

const ItemPage = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [item, setItem] = useState({})
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [showModal, setShowModal] = useState(false)
  const [loadingItem, setLoadingItem] = useState(true)
  const [loading, setLoading] = useState(false)
  const [editItem, setEditItem] = useState({ ...itemTemplate })
  const [editItemLoading, setEditItemLoading] = useState(false)
  const [editItemError, setEditItemError] = useState('')

  // if (!router.query.sku) router.push('/warehouse')

  const confirmAction = (cb, message) => {
    setDialog({
      message,
      show: true,
      onConfirm: () => {
        cb()
        return setDialog({ message: '', onConfirm: '', show: false })
      }
    })
  }

  const editItemHandler = (e, nestedKey) => {
    if (nestedKey) {
      return setEditItem({
        ...editItem,
        Cost: { ...editItem.Cost, [e.target.name]: e.target.value }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = e.target.value.split(',')
      newTags.pop()
      setEditItem({ ...editItem, TagsInput: e.target.value, Tags: newTags })
    } else {
      return setEditItem({ ...editItem, [e.target.name]: e.target.value })
    }
  }

  const deleteItem = (sku) => {
    setLoading(true)
    api
      .deleteInventory(sku, { Authorization: `Bearer ${user.accessToken}` })
      .then((data) => {
        setLoading(false)
        router.push('/inventory')
      })
  }

  const removeTag = (tag) => {
    const idx = editItem.Tags.indexOf(tag)
    if (idx >= 0) {
      let newTags = [...editItem.Tags]
      newTags.splice(idx, 1)
      setEditItem({ ...editItem, TagsInput: newTags.join(','), Tags: newTags })
    }
  }

  const modalHandler = (val) => setShowModal(val)

  const fetchItem = () => {
    setLoadingItem(true)
    api
      .getInventory(`sku=${router.query.sku}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        setItem(data.Items[0])
        setEditItem(data.Items[0])
        setLoadingItem(false)
      })
      .catch((err) => {
        setLoadingItem(false)
      })
  }

  const handleNewLocationList = (name, val) => {
    const idx = editItem.Location.findIndex((loc) => loc === val)
    let newLocationList = [...editItem.Location]
    if (idx >= 0) {
      newLocationList.splice(idx, 1)
      setEditItem({ ...editItem, [name]: newLocationList })
    } else {
      setEditItem({ ...editItem, [name]: [...newLocationList, val] })
    }
  }

  const submitEditedItem = (e) => {
    setEditItemLoading(true)
    setEditItemError('')
    e.preventDefault()
    if (!editItem.Name) {
      setEditItemLoading(false)
      setEditItemError('Required')
    } else {
      const theSameLocation =
        item.Location.sort().join(',') === editItem.Location.sort().join(',')
      console.log(theSameLocation)
      const TotalCost = Object.values(editItem.Cost).reduce(
        (total, cost) => total + parseInt(cost),
        0
      )
      let data = {
        ...editItem,
        Updated: new Date(),
        TotalCost,
        SettledTime: theSameLocation ? editItem.SettledTime : new Date()
      }
      delete data['TagsInput']
      api
        .updateInventory(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          setEditItemLoading(false)
          modalHandler(false)
          setEditItemError('')
          setEditItem({ ...itemTemplate })
          fetchItem()
        })
        .catch((err) => {
          alert(err.message)
          setEditItemLoading(false)
          modalHandler(false)
          setEditItemError('')
          setEditItem({ ...itemTemplate })
        })
    }
  }

  useEffect(() => {
    if (router.query.sku) {
      fetchItem()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])
  return (
    <>
      <Item
        loading={loadingItem}
        showEditModal={modalHandler}
        onDelete={() =>
          confirmAction(
            () => deleteItem(item.SKU),
            'Are you sure you want to delete this item?'
          )
        }
        item={item}
        backLink={() => router.back()}
      />
      {dialog.message && dialog.show && (
        <Dialog>
          <Wrapper padding="60px 54px">
            <Text size="20px">{dialog.message}</Text>
            <Flex
              gap="16px"
              styles={{
                width: '100%',
                'max-width': '416px',
                'margin-top': '24px'
              }}
            >
              <BaseButton
                styles={{ flex: '1', 'border-radius': '8px' }}
                minWidth="auto"
                kind="primary"
                onClick={() => dialog.onConfirm()}
              >
                Yes
              </BaseButton>
              <BaseButton
                styles={{
                  flex: '1',
                  'background-color': '#ffffff',
                  'border-radius': '8px'
                }}
                minWidth="auto"
                onClick={() =>
                  setDialog({
                    message: '',
                    onConfirm: '',
                    show: false
                  })
                }
              >
                No
              </BaseButton>
            </Flex>
          </Wrapper>
        </Dialog>
      )}
      {loading && (
        <Loading>
          <Loader size={70} />
        </Loading>
      )}
      {showModal && (
        <Modal
          loading={editItemLoading}
          title={'Add new product'}
          closeOnClickOutside={false}
          onClose={() => modalHandler(false)}
        >
          <Wrapper padding="10px 0 0">
            <Text>Add the product’s parts by typing the parts barcode:</Text>
          </Wrapper>
          <Wrapper padding="22px 0 0" styles={{ width: '632px' }}>
            <Form onSubmit={submitEditedItem}>
              <InputGroup>
                <Label htmlFor="warehouse-recieving-sku">Name*</Label>
                <Input
                  wrapperStyles={{
                    'margin-top': '16px',
                    'min-height': '59px',
                    border:
                      editItemError && !editItem.Name ? '2px solid #CB0000' : ''
                  }}
                  inputStyles={{ width: '100%' }}
                  placeholderStyles={{
                    color: editItemError && !editItem.Name ? '#CB0000' : ''
                  }}
                  placeholder={
                    editItemError && !editItem.Name ? 'Required' : 'Type'
                  }
                  value={editItem.Name}
                  onChange={(e) => editItemHandler(e)}
                  name="Name"
                  type="text"
                  id="warehouse-new-item-name"
                />
              </InputGroup>
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                styles={{ width: '100%', 'margin-top': '24px', gap: '24px' }}
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
                    value={editItem.SKU}
                    onChange={(e) => editItemHandler(e)}
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
                        editItemError && !editItem.Barcode
                          ? '2px solid #CB0000'
                          : ''
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholderStyles={{
                      color: editItemError && !editItem.Barcode ? '#CB0000' : ''
                    }}
                    placeholder={
                      editItemError && !editItem.Barcode ? 'Required' : 'Type'
                    }
                    value={editItem.Barcode}
                    onChange={(e) => editItemHandler(e)}
                    name="Barcode"
                    type="text"
                    id="warehouse-new-item-barcode"
                  />
                </InputGroup>
              </Flex>
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                styles={{ width: '100%', 'margin-top': '24px', gap: '24px' }}
              >
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-sku">COUNT</Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px'
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholder="0"
                    value={editItem.Stock}
                    onChange={(e) => editItemHandler(e)}
                    name="Stock"
                    type="number"
                    id="warehouse-new-item-count"
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-sku">AVAILABLE</Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px'
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholder="0"
                    value={editItem.Available}
                    onChange={(e) => editItemHandler(e)}
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
                    value={editItem.Reserved}
                    onChange={(e) => editItemHandler(e)}
                    name="Reserved"
                    type="number"
                    id="warehouse-new-item-reserved"
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-sku">REORDER ALERT</Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px'
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholder="0"
                    value={editItem.ReorderAlert}
                    onChange={(e) => editItemHandler(e)}
                    name="ReorderAlert"
                    type="number"
                    id="warehouse-new-item-reorder-alert"
                  />
                </InputGroup>
              </Flex>
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                styles={{ width: '100%', 'margin-top': '24px', gap: '24px' }}
              >
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-sku">LOCATION</Label>
                  <Filter
                    wrapperStyles={{ width: '100%', 'margin-top': '10px' }}
                    name="Location"
                    value={editItem.Location}
                    label=""
                    list={locations}
                    multiSelect
                    onSelect={handleNewLocationList}
                  />
                </InputGroup>
              </Flex>
              <Wrapper padding="24px 0 0">
                <Label htmlFor="warehouse-recieving-sku">US COST</Label>
                <Flex
                  alignItems="stretch"
                  justifyContent="flex-start"
                  styles={{ width: '100%', 'margin-top': '16px', gap: '9px' }}
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
                      value={editItem.Cost.ItemCost}
                      onChange={(e) => editItemHandler(e, 'Cost')}
                      name="ItemCost"
                      type="number"
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
                      value={editItem.Cost.CustomEntryDuty}
                      onChange={(e) => editItemHandler(e, 'Cost')}
                      name="CustomEntryDuty"
                      type="number"
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
                      value={editItem.Cost.OceanFreight}
                      onChange={(e) => editItemHandler(e, 'Cost')}
                      name="OceanFreight"
                      type="number"
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
                      value={editItem.Cost.WarehouseDelivery}
                      onChange={(e) => editItemHandler(e, 'Cost')}
                      name="WarehouseDelivery"
                      type="number"
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
                      value={editItem.Cost.CustomerShipping}
                      onChange={(e) => editItemHandler(e, 'Cost')}
                      name="CustomerShipping"
                      type="number"
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
                    {editItem.Tags?.map((tag) => {
                      if (tag.length) {
                        return (
                          <Tag
                            onClick={(e) => removeTag(tag)}
                            type="button"
                            key={tag}
                          >
                            {tag}
                            <Icon
                              name="close-rounded"
                              width="12px"
                              height="12px"
                            />{' '}
                          </Tag>
                        )
                      }
                    })}
                  </Tags>
                  <input
                    type="text"
                    name="Tags"
                    value={editItem.TagsInput}
                    onChange={(e) => editItemHandler(e)}
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
      )}
    </>
  )
}

export default ItemPage

const Form = styled.form`
  width: 100%;
  overflow: hidden;
`

const Loading = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  background-color: rgba(255, 255, 255, 0.7);
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
  font-family: ${({ theme }) => theme.font.family.secondary};
  font-size: 17px;
  cursor: pointer;
`
