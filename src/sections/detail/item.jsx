import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import {
  BaseButton,
  Dialog,
  Flex,
  Label,
  Text,
  Wrapper
} from '../../components/commons'
import Item from './inventory-item'
import AddEditItem from '../../components/add-edit-new-Item'
import { itemTemplate } from '../../constants/pageConstants/inventory'
import { Api } from '../../utils/utils'
const api = new Api()

const ItemPage = ({ router }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [item, setItem] = useState({ ...itemTemplate })
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
  const [showModal, setShowModal] = useState(false)
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
  const clearItem = (sku) => {
    dispatch(toggleLoading(true))
    api
      .updateInventory(
        { ...item, Stock: 0, Available: 0 },
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then(() => {
        fetchItem()
      })
  }
  const deleteItem = (sku) => {
    dispatch(toggleLoading(true))
    api
      .deleteInventory(sku, { Authorization: `Bearer ${user.accessToken}` })
      .then((data) => {
        dispatch(toggleLoading(false))
        router.push('/inventory')
      })
  }
  const modalHandler = (val) => setShowModal(val)
  const fetchItem = () => {
    dispatch(toggleLoading(true))
    api
      .getInventory(`sku=${router.query.sku}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        if (data.Items.length == 0) {
          router.replace('/warehouse?tab=Managing')
        } else {
          setItem(data.Items[0])
        }
        dispatch(toggleLoading(false))
      })
      .catch((err) => {
        dispatch(toggleLoading(false))
      })
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
        showEditModal={modalHandler}
        onDelete={() =>
          confirmAction(
            () => clearItem(item.SKU),
            'Are you sure you want to set the stock to be 0?'
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
      {showModal && (
        <AddEditItem
          type="edit"
          title={`edit: ${item.Name}`}
          newItemValue={item}
          submitNewItemFinally={() => fetchItem()}
          setNewItemModal={setShowModal}
        />
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
