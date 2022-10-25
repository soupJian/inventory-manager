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
import Product from './inventory-product'
import EditProduct from '../../components/add-edit-new-product'
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
  const [partsInput, setPartsInput] = useState([])
  const [lookUpLoading, setLookUpLoading] = useState(false)
  const [lookUpError, setLookUpError] = useState('')
  const [editProduct, setEditProduct] = useState({ ...productTemplate })
  const [editProductLoading, setEditProductLoading] = useState(false)
  const [editProductError, setEditProductError] = useState('')

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
        router.push('/warehouse#Managing')
      })
  }

  const modalHandler = (val) => setShowModal(val)
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
        setPartsInput(
          data.Items[0].Parts.map((item) => {
            return {
              activeLwh: 'in.',
              activeWeight: 'lbs.',
              ...item
            }
          })
        )
      })
      .catch((err) => {
        setLoadingData(false)
      })
  }
  const changePart = (key, value, index) => {
    setPartsInput((parts) => {
      const newPart = [...parts]
      parts[index][key] = value
      return newPart
    })
  }
  const submitnewProductFinally = () => {
    fetchProduct()
  }

  useEffect(() => {
    if (router.query.sku) {
      fetchProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

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
        changePart={changePart}
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
        <EditProduct
          type="edit"
          title={`Edit: ${product.Name}`}
          subTitle={
            'Edit the product parts by searching the part’s SKU or NAME'
          }
          newProductValue={product}
          setNewProductModal={setShowModal}
          submitnewProductFinally={submitnewProductFinally}
        />
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
