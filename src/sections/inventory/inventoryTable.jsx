import React, { useEffect, useState, useReducer } from 'react'
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
import {
  ExpandedTableHeaders,
  statusList,
  TableHeaders
} from '../../constants/pageConstants/inventory'
import { Row, Col, Popover, Select, Space } from 'antd'
import { Api } from '../../utils/utils'
import { PlusCircleFilled } from '@ant-design/icons'
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

const InventoryTable = ({ user, setDialog, updataTableData }) => {
  const [inventoryState, dispatch] = useReducer(inventoryReducer, {
    page: 1,
    status: []
  })
  const [loadingTable, setLoadingTable] = useState(false)
  const [inventorySKUs, setInventorySKUs] = useState([])
  const [inventoryData, setInventoryData] = useState(null)
  // const [status, setStatus] = useState([])
  const [selection, setSelection] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const fetchSKUs = () => {
    setLoadingTable(true)
    api
      .getAllInventory(
        `projectionExpression=SKU${
          inventoryState.status.length
            ? `&status=${inventoryState.status.join(',')}`
            : ''
        }`,
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        setInventorySKUs(data.Items)
        setLoadingTable(false)
        fetchMultipleInventory(data.Items)
      })
      .catch((err) => {
        console.log(err)
        setLoadingTable(false)
      })
  }
  const fetchMultipleInventory = (inventorySKUs) => {
    const skusToShow = inventorySKUs.slice(
      inventoryState.page * itemsPerPage - itemsPerPage,
      inventoryState.page * itemsPerPage
    )
    if (skusToShow?.length) {
      setLoadingTable(true)
      let str = ''
      skusToShow.forEach((i) => {
        Object.values(i).map((val) => {
          str += val + ','
        })
      })
      api
        .getMultipleInventory(`skus=${str}`, {
          Authorization: `Bearer ${user.accessToken}`
        })
        .then((data) => {
          setInventoryData(data)
          setLoadingTable(false)
        })
        .catch((err) => {
          console.log(err)
          setLoadingTable(false)
        })
    } else {
      setInventoryData({})
    }
  }
  const handlePage = (page) => {
    dispatch({ type: 'changePaginateNumber', payload: page })
  }
  const handleStatus = (val) => {
    dispatch({ type: 'changeStatus', payload: val })
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
    setLoadingTable(true)
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
  useEffect(() => {
    fetchMultipleInventory(inventorySKUs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryState.page, inventoryState.status.length])
  useEffect(() => {
    handlePage(1)
    fetchSKUs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inventoryState.status.length, updataTableData])
  return (
    <>
      <Flex
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        {/* <Filter
          value={inventoryState.status}
          label="Status"
          list={statusList}
          multiSelect
          onSelect={handleStatus}
        /> */}
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
        </Space>
      </Flex>
      <Wrapper style={{ marginTop: '23px' }} padding="0">
        <Table
          loading={loadingTable}
          name="inventory-items"
          // selectable
          // selectedAll={selection.length === inventoryData?.Items?.length}
          // onSelectAll={selectAll}
          headers={TableHeaders}
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
              // selectable
              // selected={selection.includes(item.SKU)}
              // onSelect={() => addSelection(item.SKU)}
              dataId={item.SKU + idx}
              key={item.SKU + idx}
              // redirectOnClick={() =>
              //   router.push(`/inventory/item?sku=${item.SKU}`)
              // }
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
                          {/* {header.key === 'TotalCost' ? (
                          '$' + item[header.key]
                        ) : header.key === 'Location' ? (
                          <>
                            {item[header.key].map((i) => (
                              <span key={i}>{i + '; '}</span>
                            ))}
                          </>
                        ) : (
                          item[header.key]
                        )} */}
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
              {TableHeaders.map((header) => {
                return (
                  <div key={header.key}>
                    {header.key === 'TotalCost' ? (
                      '$' + item[header.key]
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
