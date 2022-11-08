import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// components
import {
  BaseButton,
  Dialog,
  Flex,
  Loader,
  Text,
  Wrapper
} from '../../components/commons'
// components
import Product from './inventory-product'
import EditProduct from '../../components/add-edit-new-product'
// js
import { productTemplate } from '../../constants/pageConstants/products'
import { toggleLoading } from '../../store/slices/globalSlice'
import { getProduct, deleteProduct } from '../../service/product'
// css
import styled from 'styled-components'

//main
const ProductPage = ({ router }) => {
  const dispatch = useDispatch()
  const [product, setProduct] = useState({ ...productTemplate })
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [partsInput, setPartsInput] = useState([])

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
  const handleDeleteProduct = (sku) => {
    setLoading(true)
    deleteProduct(sku).then((data) => {
      setLoading(false)
      router.push('/warehouse?tab=Managing')
    })
  }

  const modalHandler = (val) => setShowModal(val)
  const fetchProduct = () => {
    dispatch(toggleLoading(true))
    getProduct({
      sku: router.query.sku
    })
      .then((data) => {
        if (!data.Item) {
          router.replace('/warehouse?tab=Managing')
        } else {
          setProduct(data.Item)
          setPartsInput(
            data.Item.Parts.map((item) => {
              return {
                activeLwh: 'in.',
                activeWeight: 'lbs.',
                ...item
              }
            })
          )
        }
        dispatch(toggleLoading(false))
      })
      .catch((err) => {
        dispatch(toggleLoading(false))
      })
  }
  const changePart = (key, value, index) => {
    setPartsInput((parts) => {
      const newPart = [...parts]
      parts[index][key] = value
      return newPart
    })
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
        parts={partsInput}
        showEditModal={modalHandler}
        onDelete={() =>
          confirmAction(
            () => handleDeleteProduct(product.SKU),
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
            'Edit the product parts by searching the part’s BARCODE or SKU'
          }
          newProductValue={product}
          setNewProductModal={setShowModal}
          submitnewProductFinally={(SKU) => {
            if (router.query.sku == SKU) {
              fetchProduct()
            } else {
              router.replace(`/warehouse/product?sku=${SKU}`)
            }
          }}
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
