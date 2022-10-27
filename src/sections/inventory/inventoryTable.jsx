import React, { useEffect, useState, useReducer } from 'react'
import { toggleLoading } from '../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'

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
  ExpandedTableHeaders,
  statusList,
  sortByList
} from '../../constants/pageConstants/inventory'
import { Row, Col, Popover, Select, Space, Button, Checkbox } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { Api } from '../../utils/utils'
import { PlusCircleFilled } from '@ant-design/icons'
import { formatMoney } from '../../utils/formatMoney'
import styled from 'styled-components'
import styles from './index.module.scss'
const api = new Api()

const { Option } = Select
const inventoryReducer = (state, { type, payload }) => {
  switch (type) {
    case 'changeStatus':
      return { ...state, status: payload }
    case 'changePageType':
      return { ...state, pageType: payload, page: 1 }
    case 'changePaginateNumber':
      return { ...state, page: payload }
    default:
      return state
  }
}

const InventoryTable = ({
  user,
  setDialog,
  updataTableData,
  selectable,
  noShowExpand,
  rowClick,
  defaultTableHeaders
}) => {
  const dispatch = useDispatch()
  const [inventoryState, InventoryDispatch] = useReducer(inventoryReducer, {
    page: 1,
    status: []
  })
  const [TableHeaders, setTableHeaders] = useState(defaultTableHeaders)
  const [inventorySKUs, setInventorySKUs] = useState([])
  const [inventoryData, setInventoryData] = useState(null)
  const [selection, setSelection] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  const [sortBy, setSortBy] = useState('desc')
  const fetchSKUs = () => {
    dispatch(toggleLoading(true))
    api
      .getAllInventory(
        `projectionExpression=SKU${
          inventoryState.status.length
            ? `&status=${inventoryState.status.join(',')}`
            : ''
        }&sort=Available&order=${sortBy}`,
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        setInventorySKUs(data.Items)
        fetchMultipleInventory(data.Items)
        dispatch(toggleLoading(false))
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const fetchMultipleInventory = (inventorySKUs) => {
    const skusToShow = inventorySKUs.slice(
      inventoryState.page * itemsPerPage - itemsPerPage,
      inventoryState.page * itemsPerPage
    )
    if (skusToShow?.length) {
      dispatch(toggleLoading(true))
      let str = ''
      skusToShow.forEach((i) => {
        Object.values(i).map((val) => {
          str += val + ','
        })
      })
      api
        .getMultipleInventory(`skus=${str}&sort=Available&order=${sortBy}`, {
          Authorization: `Bearer ${user.accessToken}`
        })
        .then((data) => {
          setInventoryData(data)
          dispatch(toggleLoading(false))
        })
        .catch((err) => {
          console.log(err)
          dispatch(toggleLoading(false))
        })
    } else {
      setInventoryData({})
    }
  }
  const handlePage = (page) => {
    InventoryDispatch({ type: 'changePaginateNumber', payload: page })
  }
  const handleStatus = (val) => {
    InventoryDispatch({ type: 'changeStatus', payload: val })
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
    const itemsToBeCleared = inventoryData.Items.filter((item) =>
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
        dispatch(toggleLoading(false))
        setSelection([])
        fetchSKUs()
      })
      .catch((err) => {
        dispatch(toggleLoading(false))
      })
  }
  const deleteSelectedItems = () => {
    dispatch(toggleLoading(true))
    Promise.all(
      selection.map((item) => {
        return api.deleteInventory(item, {
          Authorization: `Bearer ${user.accessToken}`
        })
      })
    )
      .then((values) => {
        dispatch(toggleLoading(false))
        setSelection([])
        fetchSKUs()
      })
      .catch((err) => {
        console.log(err)
        dispatch(toggleLoading(false))
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
    const skus = inventoryData?.Items?.map((item) => item.SKU)
    if (selection.length === inventoryData?.Items.length) setSelection([])
    else setSelection(skus)
  }
  const handleSelectTableColumn = (values) => {
    setTableHeaders((list) => {
      const newList = [...list]
      newList.forEach((item) => {
        item.show = values.includes(item.label)
      })
      return newList
    })
  }
  useEffect(() => {
    fetchMultipleInventory(inventorySKUs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryState.page, inventoryState.status.length])
  useEffect(() => {
    handlePage(1)
    fetchSKUs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryState.status.length, updataTableData, sortBy])
  return (
    <>
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
      <Wrapper style={{ marginTop: '27px' }} padding="0">
        <Table
          name="inventory-items"
          selectable={selectable}
          selectedAll={selection.length === inventoryData?.Items?.length}
          onSelectAll={selectAll}
          headers={TableHeaders.filter((item) => item.show)}
          className={styles.tableWarp}
          paginationComponent={
            <Wrapper>
              <Pagination
                itemsInPage={inventoryData?.Count}
                totalItems={inventorySKUs?.length}
                totalPages={Math.ceil(inventorySKUs?.length / itemsPerPage)}
                onPageChange={handlePage}
                currentPage={inventoryState.page}
              />
            </Wrapper>
          }
        >
          {inventoryData?.Items?.map((item, idx) => (
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
              {TableHeaders.filter((item) => item.show).map((header) => {
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
          ))}
        </Table>
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
                  {selection.length}
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
                {/* <BaseButton
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
                </BaseButton> */}
              </Flex>
            </Flex>
          </FloatingBar>
        )}
        {costInfo.show && (
          <CostModal costInfo={costInfo} setCostInfo={setCostInfo} />
        )}
      </Wrapper>
    </>
  )
}

export default React.memo(InventoryTable)
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
