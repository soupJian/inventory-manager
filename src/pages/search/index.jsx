import Image from 'next/image'
import { withRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  BaseButton,
  Box,
  Button,
  Dialog,
  Filter,
  Flex,
  FloatingBar,
  Icon,
  Loader,
  Pagination,
  Table,
  TableCell,
  TableRow,
  Text,
  Wrapper
} from '../../components/commons'
import { Api, ISOStringToReadableDate } from '../../utils/utils'
import {
  ExpandedItemTableHeaders,
  ItemTableHeaders,
  ProductTableHeaders,
  statusList
} from '../../constants/pageConstants/search'
const api = new Api()

const SearchPage = ({ router }) => {
  const user = useSelector((state) => state.user)
  const [page, setPage] = useState(0)
  const [searchEntity, setSearchEntity] = useState(
    router.query.searchEntity || ''
  )
  const [search, setSearch] = useState(router.query.search || '')
  const [data, setData] = useState({})
  const [loadingData, setLoadingData] = useState(false)
  const [loadingTable, setLoadingTable] = useState(false)
  const [selection, setSelection] = useState([])
  const [status, setStatus] = useState(
    router.query.status ? router.query.status.split(',') : []
  )
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })

  const handleStatus = (val) => {
    const idx = status.findIndex((data) => data === val)
    let newStatus = [...status]
    if (idx >= 0) {
      newStatus.splice(idx, 1)
      setStatus(newStatus)
    } else {
      setStatus([...newStatus, val])
    }
  }

  const addSelection = (sku) => {
    const idx = selection.indexOf(sku)
    const newSelection = [...selection]

    if (idx < 0) {
      return setSelection([...selection, sku])
    } else {
      newSelection.splice(idx, 1)
      return setSelection(newSelection)
    }
  }

  const selectAll = () => {
    const skus = inventoryData?.Items?.map((item) => item.SKU)
    if (selection.length === inventoryData?.Items.length) setSelection([])
    else setSelection(skus)
  }

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
  const clearSelectedItems = () => {
    if (searchEntity === 'Inventory') {
      setLoadingTable(true)
      const itemsToBeCleared = data.Items.filter((item) =>
        selection.includes(item.SKU)
      )
      Promise.all(
        itemsToBeCleared.map((item) => {
          return api.updateInventory(
            { ...item, Stock: 0, Reserved: 0, Available: 0 },
            { Authorization: `Bearer ${user.accessToken}` }
          )
        })
      )
        .then((values) => {
          setLoadingTable(false)
          setSelection([])
        })
        .catch((err) => {
          console.log(err)
          setLoadingTable(false)
        })
    }
  }

  const deleteSelectedItems = () => {
    setLoadingTable(true)
    if (searchEntity === 'Inventory') {
      Promise.all(
        selection.map((item) => {
          return api.deleteInventory(item, {
            Authorization: `Bearer ${user.accessToken}`
          })
        })
      )
        .then((values) => {
          setLoadingTable(false)
          setSelection([])
          fetchSKUs()
        })
        .catch((err) => {
          console.log(err)
          setLoadingTable(false)
        })
    } else {
      Promise.all(
        selection.map((item) => {
          return api.deleteProduct(item, {
            Authorization: `Bearer ${user.accessToken}`
          })
        })
      )
        .then((values) => {
          setLoadingTable(false)
          setSelection([])
          fetchSKUs()
        })
        .catch((err) => {
          console.log(err)
          setLoadingTable(false)
        })
    }
  }

  useEffect(() => {
    if (
      searchEntity !== router.query.searchEntity ||
      search !== router.query.search
    ) {
      setSearchEntity(router.query.searchEntity)
      setSearch(router.query.search)
    }
  }, [router.query.searchEntity, router.query.search])

  useEffect(() => {
    if (!search || !searchEntity) router.replace('/')
    else {
      setLoadingData(true)
      router.replace(
        `/search?searchEntity=${searchEntity}&search=${search}${
          status.length ? `&status=${status.join(',')}` : ''
        }`,
        null,
        { shallow: true }
      )
      api
        .search(
          `searchEntity=${searchEntity}&search=${search}${
            status.length ? `&status=${status.join(',')}` : ''
          }`,
          { Authorization: `Bearer ${user.accessToken}` }
        )
        .then((data) => {
          setData(data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          setLoadingData(false)
        })
    }
  }, [searchEntity, search, status])
  return (
    <Wrapper
      styles={{
        'min-height': '100%',
        position: 'relative',
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'stretch'
      }}
      height="auto"
      padding="21px 29px"
    >
      {loadingData && (
        <LoadingWrapper>
          <Loader size={100} />
          <Text>Loading Search results...</Text>
        </LoadingWrapper>
      )}
      <Flex
        styles={{ flex: '0 0 auto' }}
        alignItems="flex-start"
        justifyContent="flex-start"
      >
        <Icon
          onClick={() => router.back()}
          styles={{ cursor: 'pointer', 'margin-right': '41px' }}
          name="chevron"
          height="22px"
          width="14px"
        />
        <Flex
          styles={{ lineHeight: '1' }}
          gap="16px"
          direction="column"
          alignItems="flex-start"
        >
          <Text as="h1" weight="500" size="24px">
            Search for {`"${search}"`}
          </Text>
          <Text as="p" weight="400" size="18px">
            Showing {data.Items?.length || 0} results
          </Text>
        </Flex>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        styles={{ flex: '0 0 auto', 'margin-top': '27px', gap: '12px' }}
      >
        <Filter
          value={status}
          label="Status"
          list={statusList}
          multiSelect
          onSelect={handleStatus}
        />
      </Flex>
      <Wrapper
        styles={{ position: 'relative', flex: '1 0 auto' }}
        padding="23px 0px 0px"
      >
        {!loadingData && !data.Items?.length ? (
          <Flex
            alignItems="flex-start"
            justifyContent="center"
            styles={{ width: '100%', height: '100%', 'padding-top': '66px' }}
          >
            <Box borderType="solid" styles={{ 'border-width': '2px' }}>
              <LogoBox>
                <Image
                  src="/images/no-results.png"
                  alt="scan"
                  layout="responsive"
                />
              </LogoBox>
              <Text color="#000000" size="18px">
                No results found
              </Text>
              <Text color="#999999" size="15px">
                Adjust your search and try again
              </Text>
            </Box>
          </Flex>
        ) : (
          <>
            {searchEntity === 'Inventory' ? (
              <Table
                loading={loadingTable}
                name="inventory-items"
                selectable
                selectedAll={selection.length === data?.Items?.length}
                onSelectAll={selectAll}
                headers={ItemTableHeaders}
              >
                {data?.Items?.map((item, idx) => (
                  <TableRow
                    nested
                    idx={idx}
                    height="72px"
                    selectable
                    selected={selection.includes(item.SKU)}
                    onSelect={() => addSelection(item.SKU)}
                    dataId={item.SKU + idx}
                    key={item.SKU + idx}
                    // redirectOnClick={() =>
                    //   router.push(`/inventory/item?sku=${item.SKU}`)
                    // }
                    expandedContent={
                      <Wrapper padding="4px 0">
                        <Table
                          styles={{
                            'background-color': 'transparent',
                            padding: '0'
                          }}
                          name={`inventory-item-expanded-${item.Name}`}
                          headers={ExpandedItemTableHeaders}
                        >
                          <TableRow>
                            {ExpandedItemTableHeaders.map((header, idx) => (
                              <TableCell key={idx}>
                                {header.key === 'TotalCost' ? (
                                  '$' + item[header.key]
                                ) : header.key === 'Location' ? (
                                  <>
                                    {item[header.key].map((i) => (
                                      <span key={i}>{i + '; '}</span>
                                    ))}
                                  </>
                                ) : (
                                  item[header.key]
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        </Table>
                      </Wrapper>
                    }
                  >
                    {ItemTableHeaders.map((header) =>
                      header.key === 'Location'
                        ? item[header.key][0]
                        : item[header.key]
                    )}
                  </TableRow>
                ))}
              </Table>
            ) : (
              <Table
                loading={loadingTable}
                name="products-items"
                selectable
                onSelectAll={selectAll}
                selectedAll={selection.length === data?.Items?.length}
                headers={ProductTableHeaders}
              >
                {data.Items?.map((item, idx) => (
                  <TableRow
                    key={item.SKU + idx}
                    idx={idx}
                    height="72px"
                    selectable
                    selected={selection.includes(item.SKU)}
                    onSelect={() => addSelection(item.SKU)}
                    dataId={item.SKU + idx}
                  >
                    {ProductTableHeaders.map((header, idx) => (
                      <TableCell key={header.key + idx}>
                        {header.key === 'Location'
                          ? item[header.key][0]
                          : header.key === 'LastSync'
                          ? ISOStringToReadableDate(item[header.key])
                          : item[header.key]}
                      </TableCell>
                    ))}
                    <TableCell
                      onClick={() =>
                        router.push(`/products/product?sku=${item.SKU}`)
                      }
                    >
                      <Icon
                        styles={{ transform: 'rotate(180deg)' }}
                        name="chevron"
                        width="8px"
                        height="12px"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </Table>
            )}
          </>
        )}
      </Wrapper>
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
      {selection.length > 0 && (
        <FloatingBar styles={{ position: 'fixed' }}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <BaseButton
                onClick={() => setSelection([])}
                minWidth="auto"
                minHeight="auto"
                styles={{
                  filter:
                    'invert(92%) sepia(93%) saturate(0%) hue-rotate(202deg) brightness(106%) contrast(106%);'
                }}
              >
                {' '}
                <Icon width="16px" height="16px" name="close" />{' '}
              </BaseButton>
              <Text styles={{ 'margin-left': '20px' }} color="#ffffff">
                {selection.length}{' '}
                {selection.length > 1 ? 'items selected' : 'item selected'}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="16px">
              {searchEntity === 'Inventory' && (
                <BaseButton
                  onClick={() =>
                    confirmAction(
                      clearSelectedItems,
                      'Are you sure you want to clear these items’ stock?'
                    )
                  }
                  minWidth="auto"
                  minHeight="auto"
                  styles={{
                    'background-color': '#ffffff',
                    padding: '12px 14px',
                    'border-radius': '8px',
                    gap: '10px'
                  }}
                >
                  <Icon name="clear" width="22px" height="22px" />
                  <Text>Clear</Text>
                </BaseButton>
              )}
              <BaseButton
                onClick={() =>
                  confirmAction(
                    deleteSelectedItems,
                    'Are you sure you want to delete these items?'
                  )
                }
                minWidth="auto"
                minHeight="auto"
                styles={{
                  'background-color': '#ffffff',
                  padding: '12px 14px',
                  'border-radius': '8px',
                  gap: '10px'
                }}
              >
                <Icon name="delete" width="22px" height="22px" />
                <Text>Delete</Text>
              </BaseButton>
            </Flex>
          </Flex>
        </FloatingBar>
      )}
    </Wrapper>
  )
}

export default withRouter(SearchPage)

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 5;
`
const LogoBox = styled.div`
  width: 96px;
  height: 96px;
  margin-bottom: 20px;
`
