import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  BaseButton,
  Button,
  Dialog,
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
import Product from '../../sections/product/Product'
import { productTemplate } from '../../constants/pageConstants/products'
import { Api } from '../../utils/utils'
const api = new Api()

const ProductPage = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [product, setProduct] = useState({})
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [loadingData, setLoadingData] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [partsInput, setPartsInput] = useState([
    { barcode: '', count: 1, item: {} }
  ])
  const [lookUpLoading, setLookUpLoading] = useState(false)
  const [lookUpError, setLookUpError] = useState('')
  const [editProduct, setEditProduct] = useState({ ...productTemplate })
  const [editProductLoading, setEditProductLoading] = useState(false)
  const [editProductError, setEditProductError] = useState('')
  if (!router.query.sku) router.push('/warehouse')

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

  const editProductFieldHandler = (e, nestedKey) => {
    if (nestedKey) {
      return setEditProduct({
        ...editProduct,
        Cost: { ...editProduct.Cost, [e.target.name]: e.target.value }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = e.target.value.split(',')
      newTags.pop()
      setEditProduct({
        ...editProduct,
        TagsInput: e.target.value,
        Tags: newTags
      })
    } else {
      return setEditProduct({ ...editProduct, [e.target.name]: e.target.value })
    }
  }

  const lookUpItem = (idx) => {
    setLookUpLoading(true)
    setLookUpError('')
    console.log({ barcode: partsInput[idx]['barcode'] })
    api
      .getInventory(
        { barcode: partsInput[idx]['barcode'] },
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        console.log(data)
        if (data.Items && data.Items.length === 0) {
          console.log('message')
          setLookUpError("Sorry, We can't find the item!")
        } else if (!data.Items && data.message) {
          console.log('error')
          setLookUpError(data.message)
        } else {
          setLookUpLoading(false)
          let newPartsInput = [...partsInput]
          let itemData = { item: data.Items[0] }
          let inputData = { ...partsInput[idx], ...itemData }
          newPartsInput.splice(idx, 1, inputData)
          setPartsInput(newPartsInput)
        }
      })
      .catch((err) => {
        setLookUpLoading(false)
      })
  }

  const handlePartsInput = (idx, e) => {
    let data = [...partsInput]
    data[idx][e.target.name] = e.target.value
    console.log(data[idx])
    setPartsInput(data)
  }
  const addPart = () => {
    let newField = { sku: '', count: 1, item: {} }
    setPartsInput([...partsInput, newField])
  }
  const removePart = (idx) => {
    let newParts = [...partsInput]
    newParts.splice(idx, 1)
    setPartsInput(newParts)
  }

  const deleteProduct = (sku) => {
    setLoading(true)
    api
      .deleteProduct(sku, { Authorization: `Bearer ${user.accessToken}` })
      .then((data) => {
        setLoading(false)
        router.push('/products')
      })
  }

  const modalHandler = (val) => setShowModal(val)

  const submitEditedProduct = (e) => {
    setEditProductLoading(true)
    setEditProductError('')
    e.preventDefault()
    console.log('submit')
    if (!editProduct.Name) {
      setEditProductLoading(false)
      setEditProductError('Required')
    } else if (Object.keys(partsInput[0].item).length === 0) {
      setEditProductLoading(false)
      setEditProductError('Required')
    } else {
      const Parts = partsInput.map((part) => ({
        SKU: part.item.SKU,
        Quantity: parseInt(part.count)
      }))
      let data = {
        ...editProduct,
        Updated: new Date(),
        Created: new Date(),
        Parts
      }
      delete data['TagsInput']
      console.log(data)
      api
        .updateProduct(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          setEditProductLoading(false)
          modalHandler(false)
          setEditProductError('')
          setEditProduct({ ...productTemplate })
          fetchProduct()
        })
        .catch((err) => {
          alert(err.message)
          setEditProductLoading(false)
          modalHandler(false)
          setEditProductError('')
          setEditProduct({ ...productTemplate })
        })
    }
  }

  const fetchProduct = () => {
    setLoadingData(true)
    api
      .getProduct(`sku=${router.query.sku}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        setLoadingData(false)
        setProduct(data.Items[0])
        setEditProduct(data.Items[0])
        if (data.Items[0]?.Parts.length) {
          let str = ''
          data?.Items[0]?.Parts.forEach((part) => (str += part.SKU + ','))
          api
            .getMultipleInventory(`skus=${str}`, {
              Authorization: `Bearer ${user.accessToken}`
            })
            .then((items) => {
              const partsInputData = items.Items?.map((item) => {
                const count = data.Items[0]?.Parts?.filter(
                  (part) => part.SKU === item.SKU
                )[0]?.Quantity
                return { barcode: item.Barcode, item, count }
              })
              setPartsInput(partsInputData)
            })
        }
      })
      .catch((err) => {
        setLoadingData(false)
        alert(err.name)
      })
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <>
      <Product
        loading={loadingData}
        parts={partsInput}
        showEditModal={modalHandler}
        onDelete={() =>
          confirmAction(
            () => deleteProduct(product.SKU),
            'Are you sure you want to delete this product?'
          )
        }
        product={product}
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
          loading={editProductLoading}
          title={'Add new product'}
          closeOnClickOutside={false}
          onClose={() => modalHandler(false)}
        >
          <Wrapper padding="10px 0 0">
            <Text>Add the product’s parts by typing the parts barcode:</Text>
          </Wrapper>
          <Wrapper padding="22px 0 0" styles={{ width: '632px' }}>
            <Form onSubmit={submitEditedProduct}>
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
                    <InputGroup>
                      <Label htmlFor="products-new-product-name">BARCODE</Label>
                      <Input
                        endIcon={
                          <LookupBtn
                            disabled={lookUpLoading}
                            onClick={() => lookUpItem(idx)}
                          >
                            Look up
                          </LookupBtn>
                        }
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="Type barcode to look up the part"
                        value={input.barcode}
                        onChange={(e) => handlePartsInput(idx, e)}
                        name="barcode"
                        type="text"
                        id={`product-part-${idx}`}
                      />
                    </InputGroup>
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
                  type="button"
                  onClick={addPart}
                  minWidth="170px"
                  styles={{ gap: '6px', 'margin-top': '24px' }}
                  kind="primary"
                >
                  <Icon name="add" width="14px" height="14px" /> New parts
                </Button>
              </Wrapper>
              <Wrapper padding="24px 0 0">
                <InputGroup>
                  <Label htmlFor="products-new-product-name">
                    PRODUCT NAME
                  </Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px'
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholder="Type"
                    value={editProduct.Name}
                    onChange={(e) => editProductFieldHandler(e)}
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
                    value={editProduct.SKU}
                    onChange={(e) => editProductFieldHandler(e)}
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
                    {editProduct.Tags?.map((tag) => {
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
                    value={editProduct.TagsInput}
                    onChange={(e) => editProductFieldHandler(e)}
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

export default ProductPage

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
