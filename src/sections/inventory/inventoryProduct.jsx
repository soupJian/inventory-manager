import React from 'react'
import { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import {
  BaseButton,
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
import CostModal from '../../components/cost-modal'
import {
  statusList,
  defaultTableHeaders,
  ExpandedTableHeaders
} from '../../constants/pageConstants/products'
import { formatMoney } from '../../utils/formatMoney'
import { sortByList } from '../../constants/pageConstants/inventory'
import { Row, Col, Popover, Select, Space, Button, Checkbox } from 'antd'
import { DownOutlined, PlusCircleFilled } from '@ant-design/icons'
import { Api } from '../../utils/utils'
import styles from './index.module.scss'

const api = new Api()
const { Option } = Select

const productReducer = (state, { type, payload }) => {
  switch (type) {
    case 'changeTab':
      return { ...state, activeTab: payload, page: 1 }
    case 'changeStatus':
      return { ...state, status: payload }
    case 'changePaginateNumber':
      return { ...state, page: payload }
    default:
      return state
  }
}

const InventoryProduct = ({
  user,
  setDialog,
  selectable,
  updataTableData,
  noShowExpand,
  rowClick
}) => {
  const [productState, dispatch] = useReducer(productReducer, {
    page: 1,
    status: []
  })
  const [TableHeaders, setTableHeaders] = useState(defaultTableHeaders)
  const [loadingTable, setLoadingTable] = useState(false)
  const [products, setProducts] = useState({})
  const [productSKUs, setProductSKUs] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [selection, setSelection] = useState([])

  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  const [sortBy, setSortBy] = useState('asc') // asc 和desc

  const handleStatus = (val) => {
    dispatch({ type: 'changeStatus', payload: val })
  }

  const fetchSKUs = () => {
    setLoadingTable(true)
    api
      .getAllProducts(
        `projectionExpression=SKU${
          productState.status ? `&status=${productState.status.join(',')}` : ''
        }&sort=Available&order=${sortBy}`,
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        setProductSKUs(data.Items)
        setLoadingTable(false)
        fetchMultipleProducts(data.Items)
      })
      .catch((err) => {
        setLoadingTable(false)
        console.log(err)
      })
  }
  const handlePage = (page) => {
    dispatch({ type: 'changePaginateNumber', payload: page })
  }
  const confirmAction = (cb, message) => {
    setDialog({
      message,
      show: true,
      onConfirm: () => {
        cb()
        setDialog({ message: '', onConfirm: '', show: false })
      }
    })
  }
  const clearSelectedItems = () => {
    setLoadingTable(true)
    const itemsToBeCleared = products.Items.filter((item) =>
      selection.includes(item.SKU)
    )
    Promise.all(
      itemsToBeCleared.map((item) => {
        return api.updateProduct(
          { ...item, Stock: 0, Reserved: 0, Available: 0 },
          { Authorization: `Bearer ${user.accessToken}` }
        )
      })
    )
      .then((values) => {
        setLoadingTable(false)
        setSelection([])
        fetchSKUs()
      })
      .catch((err) => {
        setLoadingTable(false)
      })
  }
  const deleteSelectedItems = () => {
    setLoadingTable(true)
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
    if (products.Items.length > 0) {
      if (products.Items.length === selection.length) {
        setSelection([])
      } else {
        const skus = products.Items?.map((item) => item.SKU)
        setSelection(skus)
        console.log(skus)
      }
    }
  }
  const handleSelectTableColumn = (values) => {
    setTableHeaders((list) => {
      const newList = [...list]
      newList.forEach((item) => {
        item.show = values.includes(item.label)
      })
      console.log(newList)
      return newList
    })
  }
  const fetchMultipleProducts = (productSKUs) => {
    const skusToShow = productSKUs.slice(
      productState.page * itemsPerPage - itemsPerPage,
      productState.page * itemsPerPage
    )
    if (skusToShow.length) {
      setLoadingTable(true)
      let str = ''
      skusToShow.forEach((i) => {
        Object.values(i).map((val) => {
          str += val + ','
        })
      })
      api
        .getMultipleProducts(`skus=${str}`, {
          Authorization: `Bearer ${user.accessToken}`
        })
        .then((data) => {
          setProducts(data)
          setLoadingTable(false)
        })
        .catch((err) => {
          setLoadingTable(false)
        })
    } else {
      setProducts({})
    }
  }

  useEffect(() => {
    handlePage(1)
    fetchSKUs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState.status.length, updataTableData, sortBy])

  useEffect(() => {
    fetchMultipleProducts(productSKUs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState.page, productState.status.length])
  return (
    <Wrapper styles={{ 'min-height': '100%', padding: '0' }} height="auto">
      <Flex
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        <Space>
          <span className={styles.lable}>Status</span>
          <Select
            showArrow
            mode="multiple"
            className={styles.selectStatusWrap}
            allowClear
            placeholder="ALL status"
            onChange={handleStatus}
          >
            {statusList.map((item) => {
              return <Option key={item.value}>{item.label}</Option>
            })}
          </Select>
          <span className={styles.lable} style={{ whiteSpace: 'nowrap' }}>
            Sort by
          </span>
          <Select
            showArrow
            className={styles.selectSortByWrap}
            placeholder="Select"
            value={sortBy}
            onChange={(value) => setSortBy(value)}
          >
            {sortByList.map((item) => {
              return <Option key={item.value}>{item.label}</Option>
            })}
          </Select>
          <Popover
            content={
              <Checkbox.Group
                onChange={handleSelectTableColumn}
                value={TableHeaders.filter((item) => item.show).map(
                  (i) => i.label
                )}
              >
                <Row style={{ width: '158px' }} gutter={[0, 16]}>
                  {TableHeaders.map((item) => {
                    return (
                      <Col span={24} key={item.label}>
                        <Checkbox value={item.value} disabled={item.disabled}>
                          {item.label}
                        </Checkbox>
                      </Col>
                    )
                  })}
                </Row>
              </Checkbox.Group>
            }
          >
            <Button className={styles.selectTableButton}>
              Show columns <DownOutlined />
            </Button>
          </Popover>
        </Space>
      </Flex>
      <Wrapper padding="23px 0px 0px">
        <Table
          loading={loadingTable}
          name="products-items"
          className={styles.tableWarp}
          selectable={selectable}
          onSelectAll={selectAll}
          selectedAll={selection.length === products?.Items?.length}
          headers={TableHeaders.filter((i) => i.show)}
          paginationComponent={
            <Wrapper padding="32px 0 0">
              <Pagination
                itemsInPage={products?.Count}
                totalItems={productSKUs?.length}
                totalPages={Math.ceil(productSKUs?.length / itemsPerPage)}
                onPageChange={handlePage}
                currentPage={productState.page}
              />
            </Wrapper>
          }
        >
          {products.Items?.map((item, idx) => (
            <TableRow
              nested
              idx={idx}
              height="72px"
              selectable={selectable}
              selected={selection.includes(item.SKU)}
              onSelect={() => addSelection(item.SKU)}
              dataId={item.SKU + idx}
              key={item.SKU + idx}
              noShowExpand={noShowExpand}
              rowClick={() => rowClick(item.SKU)}
              expandedContent={
                <>
                  {!noShowExpand && (
                    <Wrapper padding="15px 0 30px">
                      <Table
                        styles={{
                          'background-color': 'transparent',
                          padding: '0'
                        }}
                        className={styles.expandTable}
                        name={`inventory-item-expanded-${item.Name}`}
                        headers={ExpandedTableHeaders}
                      >
                        {item.Parts?.map((partItem) => {
                          return (
                            <TableRow key={partItem.Inventory.SKU}>
                              {ExpandedTableHeaders.map((header, idx) => (
                                <TableCell key={idx}>
                                  {header.key === 'TotalCost' ? (
                                    <span
                                      className={`${styles.activeText} ${styles.underline} ${styles.pointer}`}
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        setCostInfo({
                                          show: true,
                                          ...partItem.Inventory.Cost,
                                          total: partItem.Inventory.TotalCost
                                        })
                                      }}
                                    >
                                      {'$' +
                                        formatMoney(
                                          partItem.Inventory.TotalCost
                                        )}
                                    </span>
                                  ) : header.key === 'Location' ? (
                                    <>
                                      {partItem.Inventory[header.key][0]}
                                      {partItem.Inventory[header.key].length >
                                        1 && (
                                        <Popover
                                          content={
                                            <Wrapper>
                                              <HeaderText>
                                                All Locations
                                              </HeaderText>
                                              <Flex>
                                                {partItem.Inventory[
                                                  header.key
                                                ].map((loc) => (
                                                  <SpanText key={loc}>
                                                    {loc};
                                                  </SpanText>
                                                ))}
                                              </Flex>
                                            </Wrapper>
                                          }
                                          trigger="hover"
                                        >
                                          <PlusCircleFilled
                                            style={{
                                              marginLeft: '4px',
                                              fontSize: '18px'
                                            }}
                                          />
                                        </Popover>
                                      )}
                                    </>
                                  ) : (
                                    partItem.Inventory[header.key]
                                  )}
                                </TableCell>
                              ))}
                            </TableRow>
                          )
                        })}
                        {/* tags header */}
                        <TableRow>
                          <TableHeadCell>TAGS</TableHeadCell>
                        </TableRow>
                        {/* tags content */}
                        <TableRow>
                          <TableCell key={idx}>
                            <Row gutter={[10]}>
                              {item['Tags']?.map((tag) => {
                                return (
                                  <Col key={tag}>
                                    <div className={styles.tagsButton}>
                                      {tag}
                                    </div>
                                  </Col>
                                )
                              })}
                            </Row>
                          </TableCell>
                        </TableRow>
                      </Table>
                    </Wrapper>
                  )}
                </>
              }
            >
              {TableHeaders.filter((item) => item.show).map((header) => {
                return (
                  <div key={header.key}>
                    {header.key === 'TotalCost' ? (
                      <span
                        className={`${styles.activeText} ${styles.underline} ${styles.pointer}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          let list = []
                          item.Parts.forEach((item) => {
                            for (let i = 0; i < item.Quantity; i++) {
                              list.push(item.Inventory)
                            }
                          })
                          setCostInfo({
                            show: true,
                            parts: list,
                            total: item.TotalCost
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
                              style={{ marginLeft: '4px', fontSize: '18px' }}
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
          ))}
        </Table>
      </Wrapper>
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
                <Icon width="16px" height="16px" name="close" />
              </BaseButton>
              <Text styles={{ 'margin-left': '20px' }} color="#ffffff">
                {selection.length}{' '}
                {selection.length > 1 ? 'items selected' : 'item selected'}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="16px">
              {/* <BaseButton
                onClick={() =>
                  confirmAction(
                    clearSelectedItems,
                    'Are you sure you want to clear these products’ stock?'
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
              </BaseButton> */}
              <BaseButton
                onClick={() =>
                  confirmAction(
                    deleteSelectedItems,
                    'Are you sure you want to delete these products?'
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

export default React.memo(InventoryProduct)

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
const TableHeadCell = styled.th`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: ${({ theme }) => theme.font.size.xss};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  line-height: ${({ theme }) => theme.font.lineHeight.normal};
  color: ${({ theme }) => theme.colors.primaryText};
  text-align: left;
  padding-bottom: 20px;

  &:first-of-type {
    padding-left: 20px;
  }
  &:last-of-type {
    padding-right: 20px;
  }
  ${({ styles }) => styles};
`
