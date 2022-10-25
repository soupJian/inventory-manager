import React, { useState } from 'react'
import { useSelector } from 'react-redux'
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
import { Api } from '../../utils/utils'
import { nanoid } from 'nanoid'

const api = new Api()

const AddProduct = ({ setNewProductModal, submitnewProductFinally }) => {
  const user = useSelector((state) => state.user)

  const [newProduct, setNewProduct] = useState({ ...productTemplate })
  const [newProductLoading, setNewProductLoading] = useState(false)
  const [newProductError, setNewProductError] = useState('')
  const [partsInput, setPartsInput] = useState([
    { time: new Date().getTime(), count: 1, item: {} }
  ])
  const handlePartsInput = (idx, e) => {
    let data = [...partsInput]
    data[idx][e.target.name] = e.target.value
    setPartsInput(data)
  }
  const selectPart = (selectItem, idx) => {
    let newPartsInput = [...partsInput]
    let itemData = { item: selectItem }
    let inputData = { ...partsInput[idx], ...itemData }
    newPartsInput.splice(idx, 1, inputData)
    setPartsInput(newPartsInput)
  }
  const addPart = () => {
    let newField = { time: new Date().getTime(), count: 1, item: {} }
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
  const submitnewProduct = (e) => {
    setNewProductLoading(true)
    setNewProductError('')
    e.preventDefault()
    if (!newProduct.Name) {
      setNewProductLoading(false)
      setNewProductError('Required')
    } else if (Object.keys(partsInput[0].item).length === 0) {
      setNewProductLoading(false)
      setNewProductError('Required')
    } else {
      const Parts = partsInput
        .filter((i) => i.item.SKU)
        .map((part) => ({
          SKU: part.item.SKU,
          Quantity: parseInt(part.count)
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
          setNewProduct({ ...productTemplate })
        })
        .catch((err) => {
          alert(err.message)
          setNewProduct({ ...productTemplate })
        })
        .finally(() => {
          setNewProductLoading(false)
          setNewProductModal(false)
          setNewProductError('')
          submitnewProductFinally()
        })
    }
  }
  return (
    <Modal
      loading={newProductLoading}
      title={'Add new product'}
      closeOnClickOutside={false}
      onClose={() => setNewProductModal(false)}
    >
      <Wrapper padding="10px 0 0">
        <Text>Add the product parts by searching the part’s SKU or NAME</Text>
      </Wrapper>
      <Wrapper padding="22px 0 0" styles={{ width: '632px' }}>
        <Form onSubmit={submitnewProduct}>
          <Wrapper padding="0 0 0">
            {partsInput.map((input, idx) => (
              <Wrapper key={idx} padding="12px 0">
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
                <Flex alignItems="center" gap="10px">
                  <InputGroup>
                    <Label htmlFor="products-new-product-name">NAME</Label>
                    <SearchInput
                      placeholder="Type"
                      selectValue={input.item?.name}
                      selectPart={selectPart}
                      name="Name"
                      itemKey="Name"
                      idx={idx}
                      key={input.time}
                      id={`product-part-${idx}`}
                    />
                  </InputGroup>
                  <span style={{ fontSize: '16px', fontWeight: '400' }}>
                    or
                  </span>
                  <InputGroup>
                    <Label htmlFor="products-new-product-name">SKU</Label>
                    <SearchInput
                      placeholder="Type"
                      selectValue={input.item?.SKU}
                      selectPart={selectPart}
                      name="sku"
                      itemKey="SKU"
                      idx={idx}
                      key={input.time}
                      id={`product-part-${idx}`}
                    />
                  </InputGroup>
                </Flex>
                {Object.keys(input.item).length > 0 && (
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
                          {input.item.Name}
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
                          value={input.count}
                          onChange={(e) => handlePartsInput(idx, e)}
                          name="count"
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
                  'min-height': '59px'
                }}
                inputStyles={{ width: '100%' }}
                placeholder="Type"
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
                  'min-height': '59px'
                }}
                inputStyles={{ width: '100%' }}
                placeholder="Type"
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
