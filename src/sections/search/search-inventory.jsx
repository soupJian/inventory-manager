import Image from 'next/image'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { Row, Col, Popover } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import styled from 'styled-components'
import {
  BaseButton,
  Box,
  Dialog,
  Flex,
  FloatingBar,
  Icon,
  Pagination,
  Table,
  TableCell,
  TableRow,
  Text,
  Wrapper
} from '../../components/commons'
import { getSearch } from '../../service/search/search-inventory'
import { formatMoney } from '../../utils/formatMoney'
import { ExpandedTableHeaders } from '../../constants/pageConstants/inventory'
import CostModal from '../../components/cost-modal'
import styles from './search.module.scss'
import { updateInventory } from '../../service/inventory'
const perPage = 10
const SearchPage = ({
  router,
  selectable,
  noShowExpand,
  rowClick,
  defaultTableHeaders
}) => {
  const dispatch = useDispatch()
  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState(router.query.search || '')
  const [data, setData] = useState({})
  const [selection, setSelection] = useState([])
  const [dialog, setDialog] = useState({
    message: '',
    onConfirm: '',
    show: false
  })
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
    const skus = data?.Items?.map((item) => item.SKU)
    if (selection.length === data?.Items.length) setSelection([])
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
    dispatch(toggleLoading(true))
    const itemsToBeCleared = data.Items.filter((item) =>
      selection.includes(item.SKU)
    )
    Promise.all(
      itemsToBeCleared.map((item) => {
        return updateInventory({ ...item, Stock: 0, Reserved: 0, Available: 0 })
      })
    )
      .then((values) => {
        dispatch(toggleLoading(false))
        setSelection([])
        getData()
      })
      .catch((err) => {
        console.log(err)
        dispatch(toggleLoading(false))
      })
  }
  const deleteSelectedItems = () => {
    dispatch(toggleLoading(true))
    Promise.all(
      selection.map((item) => {
        return deleteInventory(item)
      })
    )
      .then((values) => {
        dispatch(toggleLoading(false))
        setSelection([])
        getData()
      })
      .catch((err) => {
        console.log(err)
        dispatch(toggleLoading(false))
      })
  }
  const handlePage = (page) => {
    console.log(page)
    setPage(page)
  }
  useEffect(() => {
    setSearch(router.query.search)
  }, [router.query.search])
  const getData = useCallback(() => {
    dispatch(toggleLoading(true))
    getSearch({
      search
    })
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(toggleLoading(false))
      })
  }, [dispatch, search])
  useEffect(() => {
    if (search) {
      getData()
    }
  }, [dispatch, getData, router, router.query.search, search])
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
      <Wrapper
        styles={{ position: 'relative', flex: '1 0 auto' }}
        padding="23px 0px 0px"
      >
        {!data.Items?.length ? (
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
                  width={96}
                  height={96}
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
          <Table
            name="inventory-items"
            selectable={selectable}
            selectedAll={selection.length === data?.Items?.length}
            onSelectAll={selectAll}
            headers={defaultTableHeaders.filter((item) => item.show)}
            paginationComponent={
              <Wrapper>
                <Pagination
                  itemsInPage={
                    data.Items?.slice((page - 1) * perPage, page * perPage)
                      .length
                  }
                  totalItems={data?.Count}
                  totalPages={Math.ceil(data?.Count / perPage)}
                  onPageChange={handlePage}
                  currentPage={page}
                />
              </Wrapper>
            }
          >
            {data.Items?.slice((page - 1) * perPage, page * perPage)?.map(
              (item, idx) => (
                <TableRow
                  nested
                  idx={idx}
                  selectable={selectable}
                  selected={selection.includes(item.SKU)}
                  onSelect={() => addSelection(item.SKU)}
                  dataId={item.SKU + idx}
                  key={item.SKU + idx}
                  noShowExpand={noShowExpand}
                  rowClick={() => rowClick(item.SKU)}
                  expandedContent={
                    <Wrapper padding="0">
                      <Table
                        styles={{
                          'background-color': 'transparent',
                          padding: '0'
                        }}
                        className={styles.expandTable}
                        name={`inventory-item-expanded-${item.Name}`}
                        headers={ExpandedTableHeaders}
                      >
                        <TableRow>
                          {ExpandedTableHeaders.map((header, idx) => (
                            <TableCell key={idx}>
                              {header.key === 'Tags' ? (
                                <Row gutter={[10]}>
                                  {item[header.key].map((tag) => {
                                    return (
                                      <Col key={tag}>
                                        <div className={styles.tagsButton}>
                                          {tag}
                                        </div>
                                      </Col>
                                    )
                                  })}
                                </Row>
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
                  {defaultTableHeaders
                    .filter((item) => item.show)
                    .map((header) => {
                      return (
                        <div key={header.key}>
                          {header.key === 'TotalCost' ? (
                            <span
                              className={`${styles.activeText} ${styles.underline} ${styles.pointer}`}
                              onClick={(e) => {
                                e.stopPropagation()
                                setCostInfo({
                                  show: true,
                                  ...item.Cost,
                                  total: item[header.key]
                                })
                              }}
                            >
                              {'$' + formatMoney(item[header.key])}
                            </span>
                          ) : header.key === 'Location' ? (
                            <>
                              {item[header.key][0]}
                              {item[header.key].length > 1 && (
                                <Popover
                                  // content={item[header.key].join(';')}
                                  content={
                                    <Wrapper>
                                      <HeaderText>All Locations</HeaderText>
                                      <Flex>
                                        {item[header.key].map((loc) => (
                                          <SpanText key={loc}>{loc};</SpanText>
                                        ))}
                                      </Flex>
                                    </Wrapper>
                                  }
                                  trigger="hover"
                                >
                                  <PlusCircleFilled
                                    style={{
                                      marginLeft: '4px',
                                      fontSize: '18px',
                                      marginTop: '2px'
                                    }}
                                  />
                                </Popover>
                              )}
                            </>
                          ) : (
                            item[header.key]
                          )}
                        </div>
                      )
                    })}
                  {noShowExpand && (
                    <Icon
                      styles={{ transform: 'rotate(180deg)' }}
                      name="chevron"
                      width="8px"
                      height="12px"
                    />
                  )}
                </TableRow>
              )
            )}
          </Table>
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
      {costInfo.show && (
        <CostModal costInfo={costInfo} setCostInfo={setCostInfo} />
      )}
    </Wrapper>
  )
}

export default SearchPage

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
const HeaderText = styled.div`
  font-size: ${({ theme }) => theme.font.size.xsss};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.secondaryText};
  white-space: nowrap;
  margin-bottom: 16px;
`
const SpanText = styled.span`
  font-size: ${({ theme }) => theme.font.size.xss};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.primaryText};
  white-space: nowrap;
  margin-right: 4px;
`
