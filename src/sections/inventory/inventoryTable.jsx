import React from 'react'
import {
  BaseButton,
  Button,
  Dialog,
  Filter,
  Flex,
  FloatingBar,
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
  ExpandedTableHeaders,
  statusList,
  TableHeaders
} from '../../constants/pageConstants/inventory'
import { Row, Col } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
import { locations } from '../../constants/pageConstants/locations'
import styled from 'styled-components'
import styles from './index.module.scss'

const InventoryTable = ({
  loadingTable,
  inventorySKUs,
  inventoryState,
  handleStatus,
  inventoryData,
  itemsPerPage,
  handlePage,
  dialog,
  selection,
  newItemModal,
  newItemLoading,
  submitNewItem,
  newItemError,
  newItem,
  handleNewLocationList,
  newItemHandler,
  setNewItemModal,
  removeTag
}) => {
  return (
    <>
      <Flex
        justifyContent="flex-end"
        styles={{ 'margin-top': '27px', gap: '12px' }}
      >
        <Filter
          value={inventoryState.status}
          label="Status"
          list={statusList}
          multiSelect
          onSelect={handleStatus}
        />
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
                          <PlusCircleFilled
                            title={item[header.key].join(';')}
                          />
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
        {newItemModal && (
          <Modal
            loading={newItemLoading}
            title={'Add a new item'}
            closeOnClickOutside={false}
            onClose={() => setNewItemModal(false)}
          >
            <Wrapper padding="32px 0 0" styles={{ width: '632px' }}>
              <Form onSubmit={submitNewItem}>
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-sku">Name*</Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px',
                      border:
                        newItemError && !newItem.Name ? '2px solid #CB0000' : ''
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholderStyles={{
                      color: newItemError && !newItem.Name ? '#CB0000' : ''
                    }}
                    placeholder={
                      newItemError && !newItem.Name ? 'Required' : 'Type'
                    }
                    value={newItem.Name}
                    onChange={(e) => newItemHandler(e)}
                    name="Name"
                    type="text"
                    id="warehouse-new-item-name"
                  />
                </InputGroup>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  styles={{
                    width: '100%',
                    'margin-top': '24px',
                    gap: '24px'
                  }}
                >
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">SKU</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="Type"
                      value={newItem.SKU}
                      onChange={(e) => newItemHandler(e)}
                      name="SKU"
                      type="text"
                      id="warehouse-new-item-sku"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">BARCODE*</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px',
                        border:
                          newItemError && !newItem.Barcode
                            ? '2px solid #CB0000'
                            : ''
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholderStyles={{
                        color: newItemError && !newItem.Barcode ? '#CB0000' : ''
                      }}
                      placeholder={
                        newItemError && !newItem.Barcode ? 'Required' : 'Type'
                      }
                      value={newItem.Barcode}
                      onChange={(e) => newItemHandler(e)}
                      name="Barcode"
                      type="text"
                      id="warehouse-new-item-barcode"
                    />
                  </InputGroup>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  styles={{
                    width: '100%',
                    'margin-top': '24px',
                    gap: '24px'
                  }}
                >
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">STOCK</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="0"
                      value={newItem.Stock}
                      onChange={(e) => newItemHandler(e)}
                      min={0}
                      name="Stock"
                      type="number"
                      id="warehouse-new-item-count"
                    />
                  </InputGroup>
                  {/* <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">AVAILABLE</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="0"
                      value={newItem.Available}
                      onChange={(e) => newItemHandler(e)}
                      name="Available"
                      type="number"
                      id="warehouse-new-item-available"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">RESERVED</Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="0"
                      value={newItem.Reserved}
                      onChange={(e) => newItemHandler(e)}
                      name="Reserved"
                      type="number"
                      id="warehouse-new-item-reserved"
                    />
                  </InputGroup> */}
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">
                      REORDER ALERT
                    </Label>
                    <Input
                      wrapperStyles={{
                        'margin-top': '16px',
                        'min-height': '59px'
                      }}
                      inputStyles={{ width: '100%' }}
                      placeholder="0"
                      value={newItem.ReorderAlert}
                      onChange={(e) => newItemHandler(e)}
                      name="ReorderAlert"
                      type="number"
                      min={0}
                      id="warehouse-new-item-reorder-alert"
                    />
                  </InputGroup>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  styles={{
                    width: '100%',
                    'margin-top': '24px',
                    gap: '24px'
                  }}
                >
                  <InputGroup>
                    <Label htmlFor="warehouse-recieving-sku">LOCATION</Label>
                    <Filter
                      wrapperStyles={{
                        width: '100%',
                        'margin-top': '10px'
                      }}
                      name="Location"
                      value={newItem.Location}
                      label=""
                      list={locations}
                      multiSelect
                      onSelect={handleNewLocationList}
                    />
                  </InputGroup>
                </Flex>
                <Wrapper padding="24px 0 0">
                  <Flex
                    alignItems="stretch"
                    justifyContent="flex-start"
                    styles={{
                      width: '100%',
                      'margin-top': '16px',
                      gap: '9px'
                    }}
                  >
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        WEIGHT (LB.)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.weight}
                        onChange={(e) => newItemHandler(e, 'attr')}
                        name="weight"
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        LENGTH (IN.)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.length}
                        onChange={(e) => newItemHandler(e, 'attr')}
                        name="length"
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        WIDTH (IN.)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.width}
                        onChange={(e) => newItemHandler(e, 'attr')}
                        name="width"
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        HEIGHT (IN.)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.height}
                        onChange={(e) => newItemHandler(e, 'attr')}
                        name="height"
                        type="number"
                        min={0}
                      />
                    </InputGroup>
                  </Flex>
                </Wrapper>
                <Wrapper padding="24px 0 0">
                  <Label htmlFor="warehouse-recieving-sku">US COST</Label>
                  <Flex
                    alignItems="stretch"
                    justifyContent="flex-start"
                    styles={{
                      width: '100%',
                      'margin-top': '16px',
                      gap: '9px'
                    }}
                  >
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        ITEM COST ($)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.Cost.ItemCost}
                        onChange={(e) => newItemHandler(e, 'Cost')}
                        name="ItemCost"
                        type="number"
                        min={0}
                        id="warehouse-new-item-cost"
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        CUSTOM ENTRY DUTY ($)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.Cost.CustomEntryDuty}
                        onChange={(e) => newItemHandler(e, 'Cost')}
                        name="CustomEntryDuty"
                        type="number"
                        min={0}
                        id="warehouse-new-item-ced"
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        OCEAN FREIGHT ($)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.Cost.OceanFreight}
                        onChange={(e) => newItemHandler(e, 'Cost')}
                        name="OceanFreight"
                        type="number"
                        min={0}
                        id="warehouse-new-item-of"
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        WAREHOUSE DELIVERY ($)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.Cost.WarehouseDelivery}
                        onChange={(e) => newItemHandler(e, 'Cost')}
                        name="WarehouseDelivery"
                        type="number"
                        min={0}
                        id="warehouse-new-item-wd"
                      />
                    </InputGroup>
                    <InputGroup>
                      <ModifiedLabel htmlFor="warehouse-recieving-sku">
                        CUSTOMER SHIPPING ($)
                      </ModifiedLabel>
                      <Input
                        wrapperStyles={{
                          'margin-top': '16px',
                          'min-height': '59px'
                        }}
                        inputStyles={{ width: '100%' }}
                        placeholder="0"
                        value={newItem.Cost.CustomerShipping}
                        onChange={(e) => newItemHandler(e, 'Cost')}
                        name="CustomerShipping"
                        type="number"
                        min={0}
                        id="warehouse-new-item-cs"
                      />
                    </InputGroup>
                  </Flex>
                </Wrapper>
                <Wrapper padding="24px 0 0">
                  <Label htmlFor="warehouse-recieving-sku">
                    TAGS (use comma to seperate)
                  </Label>
                  <CustomInput>
                    <Tags>
                      {newItem.Tags?.map((tag) => {
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
                              />
                            </Tag>
                          )
                        }
                      })}
                    </Tags>
                    <input
                      type="text"
                      name="Tags"
                      value={newItem.TagsInput}
                      onChange={(e) => newItemHandler(e)}
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
      </Wrapper>
    </>
  )
}

export default React.memo(InventoryTable)

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
const Label = styled.label`
  font-size: ${({ theme }) => theme.font.size.xs};
  font-family: ${({ theme }) => theme.font.family.primary};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  color: ${({ theme }) => theme.colors.primaryText};
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.font.weight.medium};
  cursor: pointer;
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
