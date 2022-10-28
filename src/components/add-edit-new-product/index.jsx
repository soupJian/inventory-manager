import React, { useState } from 'react'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useSelector, useDispatch } from 'react-redux'
import {
  Button,
  Flex,
  Icon,
  Input,
  Modal,
  Text,
  Wrapper
} from '../../components/commons'
import styled from 'styled-components'
import { productTemplate } from '../../constants/pageConstants/products'
import SearchInput from './search-input'
import { message } from 'antd'
import { Api } from '../../utils/utils'
import { nanoid } from 'nanoid'

const api = new Api()
// type 为 add 或者edit
const AddProduct = ({
  type = 'add',
  title = 'Add new product',
  subTitle = 'Add the product parts by searching the part’s BARCODE or SKU',
  newProductValue = productTemplate,
  setNewProductModal,
  submitnewProductFinally
}) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [newProduct, setNewProduct] = useState({ ...newProductValue })
  const [newProductError, setNewProductError] = useState('')
  const [partsInput, setPartsInput] = useState(
    newProduct.Parts.length == 0
      ? [
          {
            SKU: '',
            Quantity: 1,
            Inventory: {},
            key: `${new Date().getTime()}`
          }
        ]
      : newProduct.Parts.map((item, index) => {
          return {
            ...item,
            isExit: true,
            key: `${new Date().getTime() + index}`
          }
        })
  )
  const handlePartsInput = (idx, e) => {
    let data = [...partsInput]
    data[idx][e.target.name] = e.target.value
    setPartsInput(data)
  }
  const selectPart = (selectItem, idx) => {
    let newPartsInput = [...partsInput]
    let itemData = { Quantity: 1, SKU: selectItem.SKU, Inventory: selectItem }
    let inputData = { ...partsInput[idx], ...itemData }
    newPartsInput.splice(idx, 1, inputData)
    setPartsInput(newPartsInput)
  }
  const addPart = () => {
    let newField = {
      SKU: '',
      Quantity: 1,
      Inventory: {},
      key: `${new Date().getTime()}`
    }
    setPartsInput([...partsInput, newField])
  }
  const removePart = (idx) => {
    let newParts = [...partsInput]
    newParts.splice(idx, 1)
    setPartsInput(newParts)
  }
  const newProductFieldHandler = (e, nestedKey) => {
    if (nestedKey) {
      return setNewProduct({
        ...newProduct,
        Cost: { ...newProduct.Cost, [e.target.name]: e.target.value }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = [...newProduct.Tags]
      if (e.target.value[e.target.value.length - 1] == ',') {
        newTags.push(e.target.value.slice(0, -1))
        setNewProduct({ ...newProduct, TagsInput: '', Tags: newTags })
      } else {
        setNewProduct({ ...newProduct, TagsInput: e.target.value })
      }
    } else {
      return setNewProduct({ ...newProduct, [e.target.name]: e.target.value })
    }
  }
  const removeTag = (tag) => {
    const idx = newProduct.Tags.indexOf(tag)
    if (idx >= 0) {
      let newTags = [...newProduct.Tags]
      newTags.splice(idx, 1)
      setNewProduct({
        ...newProduct,
        TagsInput: '',
        Tags: newTags
      })
    }
  }
  // 新增
  const submitnewProduct = (e) => {
    e.preventDefault()
    if (!newProduct.Name || !newProduct.SKU) {
      setNewProductError('Required')
    } else if (Object.keys(partsInput[0].Inventory).length === 0) {
      message.warning('Product Parts is Required')
    } else {
      dispatch(toggleLoading(true))
      const Parts = partsInput
        .filter((i) => i.SKU)
        .map((part) => ({
          SKU: part.Inventory.SKU,
          Quantity: parseInt(part.Quantity)
        }))
      let data = {
        ...newProduct,
        Updated: new Date(),
        Created: new Date(),
        Parts,
        SystemId: nanoid()
      }
      delete data['TagsInput']
      api
        .updateProduct(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          if (data.message) {
            message.error(data.message)
          } else {
            setNewProduct({ ...productTemplate })
            dispatch(toggleLoading(false))
            setNewProductModal(false)
            submitnewProductFinally(newProduct.SKU)
          }
        })
    }
  }
  // 编辑
  const submitEditedProduct = (e) => {
    e.preventDefault()
    if (!newProduct.Name || !newProduct.SKU) {
      setNewProductError('Required')
    } else if (Object.keys(partsInput[0].Inventory).length === 0) {
      message.warning('Product Parts is Required')
    } else {
      dispatch(toggleLoading(true))
      const Parts = partsInput
        .filter((i) => i.SKU)
        .map((part) => ({
          SKU: part.SKU,
          Quantity: parseInt(part.Quantity)
        }))
      let data = {
        ...newProduct,
        Updated: new Date(),
        Parts
      }
      // 如果SKU发生改变，则SKU不变，新增NewSKU传递
      if (newProduct.SKU != newProductValue.SKU) {
        data.NewSKU = data.SKU
        data.SKU = newProductValue.SKU
      }
      delete data['TagsInput']
      api
        .updateProduct(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          dispatch(toggleLoading(false))
          if (data.message) {
            message.error(data.message)
          } else {
            setNewProduct({ ...productTemplate })
            setNewProductModal(false)
            submitnewProductFinally(newProduct.SKU)
          }
        })
    }
  }
  const submitForm = (e) => {
    if (type == 'add') {
      submitnewProduct(e)
    } else {
      // type == edit
      submitEditedProduct(e)
    }
  }
  return (
    <Modal
      title={title}
      closeOnClickOutside={false}
      onClose={() => setNewProductModal(false)}
    >
      <Wrapper padding="10px 0 0">
        <Text>{subTitle}</Text>
      </Wrapper>
      <Wrapper padding="22px 0 0" styles={{ width: '632px' }}>
        <Form onSubmit={submitForm}>
          <Wrapper padding="0 0 0">
            {partsInput.map((input, idx) => (
              <Wrapper key={input.key} padding="12px 0">
                <Flex
                  styles={{ 'margin-bottom': '16px' }}
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text weight="500" size="16px" color="#999999">
                    Part {idx + 1}
                  </Text>
                  {partsInput.length > 1 && (
                    <TriggeringText onClick={() => removePart(idx)}>
                      Remove
                    </TriggeringText>
                  )}
                </Flex>
                {
                  // 如果是编辑状态下已经存在的 items 就不需要出现下拉框搜索了
                  !input.isExit && (
                    <Flex alignItems="center" gap="10px">
                      <InputGroup>
                        <Label htmlFor="products-new-product-name">
                          BARCODE
                        </Label>
                        <SearchInput
                          placeholder="Type"
                          selectValue={input.Inventory?.Name}
                          selectPart={selectPart}
                          name="barcode"
                          itemKey="Barcode"
                          idx={idx}
                        />
                      </InputGroup>
                      <span style={{ fontSize: '16px', fontWeight: '400' }}>
                        or
                      </span>
                      <InputGroup>
                        <Label htmlFor="products-new-product-name">SKU</Label>
                        <SearchInput
                          placeholder="Type"
                          selectValue={input.Inventory?.SKU}
                          selectPart={selectPart}
                          name="sku"
                          itemKey="SKU"
                          idx={idx}
                        />
                      </InputGroup>
                    </Flex>
                  )
                }
                {Object.keys(input.Inventory).length > 0 && (
                  <Wrapper padding="16px 0 0">
                    <Flex
                      alignItems="flex-start"
                      justifyContent="space-between"
                    >
                      <InputGroup>
                        <Label htmlFor="products-new-product-name">
                          PART NAME
                        </Label>
                        <Text
                          size="14px"
                          color="#000000"
                          styles={{ 'margin-top': '10px' }}
                        >
                          {input.Inventory.Name}
                        </Text>
                      </InputGroup>
                      <InputGroup>
                        <Label htmlFor="products-new-product-name">
                          How many to be used?*
                        </Label>
                        <Input
                          wrapperStyles={{
                            'margin-top': '16px',
                            'min-height': '59px'
                          }}
                          inputStyles={{ width: '100%' }}
                          placeholder="Type"
                          value={input.Quantity}
                          onChange={(e) => handlePartsInput(idx, e)}
                          name="Quantity"
                          min={0}
                          type="number"
                          id="products-new-product-name"
                        />
                      </InputGroup>
                    </Flex>
                  </Wrapper>
                )}
              </Wrapper>
            ))}
            <Button
              onClick={(e) => {
                e.preventDefault()
                addPart()
              }}
              minWidth="170px"
              styles={{
                gap: '6px',
                'margin-top': '24px',
                padding: '12px 20px'
              }}
              kind="primary"
            >
              <Icon name="add" width="14px" height="14px" /> New parts
            </Button>
          </Wrapper>
          <Wrapper padding="24px 0 0">
            <InputGroup>
              <Label htmlFor="products-new-product-name">PRODUCT NAME</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px',
                  border:
                    newProductError && !newProduct.Name
                      ? '2px solid #CB0000'
                      : ''
                }}
                inputStyles={{ width: '100%' }}
                placeholderStyles={{
                  color: newProductError && !newProduct.Name ? '#CB0000' : ''
                }}
                placeholder={
                  newProductError && !newProduct.Name ? 'Required' : 'Type'
                }
                value={newProduct.Name}
                onChange={(e) => newProductFieldHandler(e)}
                name="Name"
                type="text"
                id="products-new-product-name"
              />
            </InputGroup>
          </Wrapper>
          <Wrapper padding="24px 0 0">
            <InputGroup>
              <Label htmlFor="products-new-product-sku">SKU</Label>
              <Input
                wrapperStyles={{
                  'margin-top': '16px',
                  'min-height': '59px',
                  border:
                    newProductError && !newProduct.SKU
                      ? '2px solid #CB0000'
                      : ''
                }}
                inputStyles={{ width: '100%' }}
                placeholderStyles={{
                  color: newProductError && !newProduct.SKU ? '#CB0000' : ''
                }}
                placeholder={
                  newProductError && !newProduct.SKU ? 'Required' : 'Type'
                }
                value={newProduct.SKU}
                onChange={(e) => newProductFieldHandler(e)}
                name="SKU"
                type="text"
                id="products-new-product-sku"
              />
            </InputGroup>
          </Wrapper>
          <Wrapper padding="24px 0 0">
            <Label htmlFor="warehouse-recieving-sku">
              TAGS (use comma to seperate)
            </Label>
            <CustomInput>
              <Tags>
                {newProduct.Tags?.map((tag) => {
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
                value={newProduct.TagsInput}
                onChange={(e) => newProductFieldHandler(e)}
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
            <Button
              type="submit"
              kind="primary"
              style={{ padding: '13px 20px' }}
            >
              Save
            </Button>
          </Flex>
        </Form>
      </Wrapper>
    </Modal>
  )
}

export default AddProduct
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
