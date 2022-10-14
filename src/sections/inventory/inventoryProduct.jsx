import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import {
  Flex,
  Icon,
  Input,
  Modal,
  Pagination,
  Table,
  TableCell,
  TableRow,
  Text,
  Wrapper
} from '../../components/commons'
import {
  categoryList,
  productTemplate,
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

const InventoryProduct = ({ selectable }) => {
  const user = useSelector((state) => state.user)
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
  const [newProduct, setNewProduct] = useState({ ...productTemplate })
  const [newProductModal, setNewProductModal] = useState(false)
  const [newProductLoading, setNewProductLoading] = useState(false)
  const [newProductError, setNewProductError] = useState('')
  const [partsInput, setPartsInput] = useState([
    { barcode: '', count: 1, item: {} }
  ])
  const [lookUpLoading, setLookUpLoading] = useState(false)
  const [lookUpError, setLookUpError] = useState('')
  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  const [sortBy, setSortBy] = useState('height')
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
  const handleStatus = (val) => {
    dispatch({ type: 'changeStatus', payload: val })
  }
  const newProductFieldHandler = (e, nestedKey) => {
    if (nestedKey) {
      return setNewProduct({
        ...newProduct,
        Cost: { ...newProduct.Cost, [e.target.name]: e.target.value }
      })
    } else if (e.target.name === 'Tags') {
      let newTags = e.target.value.split(',')
      newTags.pop()
      setNewProduct({ ...newProduct, TagsInput: e.target.value, Tags: newTags })
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
        TagsInput: newTags.join(','),
        Tags: newTags
      })
    }
  }
  const submitnewProduct = (e) => {
    setNewProductLoading(true)
    setNewProductError('')
    e.preventDefault()
    console.log('submit')
    if (!newProduct.Name) {
      setNewProductLoading(false)
      setNewProductError('Required')
    } else if (Object.keys(partsInput[0].item).length === 0) {
      setNewProductLoading(false)
      setNewProductError('Required')
    } else {
      const Parts = partsInput.map((part) => ({
        SKU: part.item.SKU,
        Quantity: parseInt(part.count)
      }))
      let data = {
        ...newProduct,
        Updated: new Date(),
        Created: new Date(),
        Parts
      }
      delete data['TagsInput']
      console.log(data)
      api
        .updateProduct(data, { Authorization: `Bearer ${user.accessToken}` })
        .then((data) => {
          setNewProductLoading(false)
          setNewProductModal(false)
          setNewProductError('')
          setNewProduct({ ...productTemplate })
          fetchSKUs()
        })
        .catch((err) => {
          alert(err.message)
          setNewProductLoading(false)
          setNewProductModal(false)
          setNewProductError('')
          setNewProduct({ ...productTemplate })
        })
    }
  }
  const fetchSKUs = () => {
    setLoadingTable(true)
    return api
      .getAllProducts(
        `projectionExpression=SKU${
          productState.status ? `&status=${productState.status.join(',')}` : ''
        }`,
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
    console.log(values)
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
          if (sortBy == 'height') {
            data.Items.sort((a, b) => {
              return b.Available - a.Available
            })
          } else {
            data.Items.sort((a, b) => {
              return a.Available - b.Available
            })
          }
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
  }, [productState.status.length])

  useEffect(() => {
    fetchMultipleProducts(productSKUs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productState.page, productState.status.length])
  useEffect(() => {
    setProducts((data) => {
      const newData = JSON.parse(JSON.stringify(data))
      if (sortBy == 'height') {
        newData?.Items?.sort((a, b) => {
          return b.Available - a.Available
        })
      } else {
        newData.Items.sort((a, b) => {
          return a.Available - b.Available
        })
      }
      return newData
    })
  }, [sortBy])
  return (
    <Wrapper styles={{ 'min-height': '100%', padding: '0' }} height="auto">
      {/* <Flex
        styles={{ 'flex-wrap': 'nowrap', 'align-items': 'flex-start' }}
        justifyContent="space-between"
      >
        <Flex styles={{ justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setNewProductModal(true)}
            minWidth="auto"
            kind="primary"
            startIcon={
              <Icon
                name="add"
                width="18px"
                height="19px"
                styles={{ 'margin-right': '12px' }}
              />
            }
          >
            New
          </Button>
          <Input
            type="text"
            placeholder="Search name or SKU"
            startIcon={<Icon name="search" width="30px" height="30px" />}
          />
        </Flex>
      </Flex>
      <Flex
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        <Filter
          value={productState.status}
          label="Status"
          list={statusList}
          multiSelect
          onSelect={handleStatus}
        />
      </Flex> */}
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
          <span className={styles.lable}>Sort by</span>
          <Select
            showArrow
            className={styles.selectSortByWrap}
            allowClear
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
          // selectedAll={selection.length === products?.Items?.length}
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
                          {header.key === 'Location' ? (
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
                                      fontSize: '18px'
                                    }}
                                  />
                                </Popover>
                              )}
                            </>
                          ) : (
                            item[header.key]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
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
                                <div className={styles.tagsButton}>{tag}</div>
                              </Col>
                            )
                          })}
                        </Row>
                      </TableCell>
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
                        className={styles.cost}
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log(item)
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
      </Wrapper>
      {newProductModal && (
        <Modal
          loading={newProductLoading}
          title={'Add new product'}
          closeOnClickOutside={false}
          onClose={() => setNewProductModal(false)}
        >
          <Wrapper padding="10px 0 0">
            <Text>Add the product’s parts by typing the parts barcode:</Text>
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
                <Button type="submit" kind="primary">
                  Save
                </Button>
              </Flex>
            </Form>
          </Wrapper>
        </Modal>
      )}
      {costInfo.show && (
        <Modal
          onClose={() =>
            setCostInfo({
              show: false
            })
          }
        >
          <div className={styles.costModal}>
            <div className={styles.title}>
              US Cost: ${formatMoney(costInfo.total)}
            </div>
            <Row gutter={[16, 16]}>
              <Col>
                <div style={{ width: '110px' }} className={styles.subTitle}>
                  ITEM COST
                </div>
                <div className={styles.number}>
                  ${`${formatMoney(costInfo.ItemCost)}`}
                  <span style={{ marginLeft: '2px' }}>
                    ({`${parseInt((costInfo.ItemCost / costInfo.total) * 100)}`}
                    %)
                  </span>
                </div>
              </Col>
              <Col>
                <div style={{ width: '147px' }} className={styles.subTitle}>
                  CUSTOM ENTRY DUTY
                </div>
                <div className={styles.number}>
                  ${`${formatMoney(costInfo.CustomEntryDuty)}`}
                  <span style={{ marginLeft: '2px' }}>
                    (
                    {`${parseInt(
                      (costInfo.CustomEntryDuty / costInfo.total) * 100
                    )}`}
                    %)
                  </span>
                </div>
              </Col>
              <Col>
                <div className={styles.subTitle} style={{ width: '134px' }}>
                  ocean Freight
                </div>
                <div className={styles.number}>
                  ${`${formatMoney(costInfo.OceanFreight)}`}
                  <span style={{ marginLeft: '2px' }}>
                    (
                    {`${parseInt(
                      (costInfo.OceanFreight / costInfo.total) * 100
                    )}`}
                    %)
                  </span>
                </div>
              </Col>
              <Col>
                <div style={{ width: '158px' }} className={styles.subTitle}>
                  WAREHOUSE DELIVERY
                </div>
                <div className={styles.number}>
                  ${`${formatMoney(costInfo.WarehouseDelivery)}`}
                  <span style={{ marginLeft: '2px' }}>
                    (
                    {`${parseInt(
                      (costInfo.WarehouseDelivery / costInfo.total) * 100
                    )}`}
                    %)
                  </span>
                </div>
              </Col>
              <Col>
                <div style={{ width: '171px' }} className={styles.subTitle}>
                  customer shipping
                </div>
                <div className={styles.number}>
                  ${`${formatMoney(costInfo.CustomerShipping)}`}
                  <span style={{ marginLeft: '2px' }}>
                    (
                    {`${parseInt(
                      (costInfo.CustomerShipping / costInfo.total) * 100
                    )}`}
                    %)
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </Modal>
      )}
    </Wrapper>
  )
}

export default React.memo(InventoryProduct)

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
