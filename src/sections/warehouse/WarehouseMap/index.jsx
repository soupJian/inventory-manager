import React, { useEffect, useState } from 'react'
import { toggleLoading } from '../../../store/slices/globalSlice'
import { useDispatch } from 'react-redux'
import {
  Button,
  Flex,
  Icon,
  Input,
  Loader,
  Text,
  Wrapper
} from '../../../components/commons'
import { Popover } from 'antd'
import WarehouseUnit from './WarehouseUnit'
import styled from 'styled-components'
import { ISOStringToReadableDate } from '../../../utils/utils'
import { getAllInventory, getInventory } from '../../../service/inventory'

const warshouseMap = [
  {
    unit: 'A',
    label: 'Against the left wall',
    xLabel: ['A1', 'A2', 'A3', 'A4'],
    yLabel: ['R1', 'R2', 'R3']
  },
  {
    unit: 'B',
    label: 'In the center facing the left',
    xLabel: ['B1', 'B2', 'B3', 'B4'],
    yLabel: ['R1', 'R2', 'R3']
  },
  {
    unit: 'C',
    label: 'In the center facing the right',
    xLabel: ['C1', 'C2', 'C3', 'C4'],
    yLabel: ['R1', 'R2', 'R3', 'R4']
  },
  {
    unit: 'D',
    label: 'Against the right wall and near entrance',
    xLabel: ['D1', 'D2', 'D3'],
    yLabel: ['R1', 'R2', 'R3', 'R4']
  },
  {
    unit: 'E',
    label: 'Against the right wall',
    xLabel: ['E1'],
    yLabel: ['R1', 'R2', 'R3']
  }
]

const WarehouseUnitRender = ({ warehouseData, unitItem }) => {
  return (
    <WarehouseUnit
      unit={unitItem.unit}
      label={unitItem.label}
      yLabel={unitItem.yLabel}
      xLabel={unitItem.xLabel}
    >
      {unitItem.yLabel.reverse().map((row) => (
        <GridRow key={row + unitItem.unit}>
          {unitItem.xLabel.map((col) => (
            <Popover
              trigger="hover"
              placement="bottom"
              key={[col, row].join('-')}
              content={
                <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                  <Text family="Rubik" weight="500" size="16px" color="#000000">
                    {[col, row].join('-')}
                  </Text>
                  {warehouseData[[col, row].join('-')]?.length && (
                    <Wrapper padding="20px 0 0">
                      {warehouseData[[col, row].join('-')]?.map((item) => (
                        <Text
                          key={item.SKU}
                          styles={{ 'margin-top': '10px' }}
                          as="div"
                          family="Rubik"
                          weight="400"
                          size="15px"
                          color="#000000"
                        >
                          {item.Name}
                        </Text>
                      ))}
                    </Wrapper>
                  )}
                  {warehouseData[[col, row].join('-')]?.length && (
                    <Wrapper padding="16px 0 0">
                      <Text color="#999999" as="p" size="15px" weight="500">
                        Last Settled
                      </Text>
                      <Flex
                        direction="column"
                        alignItems="flex-start"
                        gap="10px"
                        styles={{ 'margin-top': '10px' }}
                      >
                        {
                          <>
                            <Text
                              color="#999999"
                              as="p"
                              size="15px"
                              weight="400"
                            >
                              {ISOStringToReadableDate(
                                [
                                  ...warehouseData[[col, row].join('-')]?.sort(
                                    (a, b) =>
                                      -a.SettledTime.localeCompare(
                                        b.SettledTime
                                      )
                                  )
                                ][0].SettledTime
                              )}
                            </Text>
                            <Text
                              color="#000000"
                              as="p"
                              size="15px"
                              weight="400"
                            >
                              {
                                [
                                  ...warehouseData[[col, row].join('-')]?.sort(
                                    (a, b) =>
                                      -a.SettledTime.localeCompare(
                                        b.SettledTime
                                      )
                                  )
                                ][0].Name
                              }
                            </Text>
                          </>
                        }
                      </Flex>
                    </Wrapper>
                  )}
                </Wrapper>
              }
            >
              <GridItem></GridItem>
            </Popover>
          ))}
        </GridRow>
      ))}
    </WarehouseUnit>
  )
}
const Map = () => {
  const dispatch = useDispatch()
  const [warehouseData, setWarehouseData] = useState({})
  const [locatedItem, setLocatedItem] = useState({})
  const [locatedItemInput, setLocatedItemInput] = useState('')
  const [locatedItemError, setLocatedItemError] = useState('')
  const [locateItemLoading, setLocateItemLoading] = useState(false)

  const locateItem = () => {
    setLocateItemLoading(true)
    getInventory({
      barcode: locatedItemInput
    })
      .then((data) => {
        if (data.Items && data.Items?.length === 0) {
          setLocatedItemError("Sorry, We can't find the item!")
        } else if (!data.Items && data.message) {
          setLocatedItemError(data.message)
        }
        setLocateItemLoading(false)
        setLocatedItem(data)
      })
      .catch((err) => {
        setLocateItemLoading(false)
      })
  }
  const cancelLocatedItem = () => {
    setLocatedItem({})
    setLocatedItemInput('')
  }
  const handleLocateItem = (e) => {
    if (locatedItemInput) {
      locateItem()
    }
    e.preventDefault()
  }
  const fetchItems = () => {
    dispatch(toggleLoading(true))
    getAllInventory({
      projectionExpression: 'SKU,Location,Name,SettledTime'
    })
      .then((data) => {
        let dataObj = {}
        data.Items.forEach((item) => {
          item.Location.forEach((loc) => {
            if (!(loc in dataObj)) {
              dataObj[loc] = [item]
            } else {
              dataObj[loc] = [...dataObj[loc], item]
            }
            return
          })
        })
        setWarehouseData(dataObj)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        dispatch(toggleLoading(false))
      })
  }
  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Wrapper padding="35px 0">
      <Flex
        styles={{ width: 'fit-content' }}
        alignItems="flex-end"
        justifyContent="flex-start"
      >
        <Flex
          as="form"
          onSubmit={handleLocateItem}
          alignItems="flex-end"
          gap="8px"
        >
          <InputGroup>
            <Label htmlFor="warehouse-barcode">Locate item</Label>
            <Input
              startIcon={<Icon name="search" width="30px" height="30px" />}
              wrapperStyles={{ 'margin-top': '16px', 'min-height': '59px' }}
              placeholder="Type barcode"
              value={locatedItemInput}
              onChange={(e) => setLocatedItemInput(e.target.value)}
              name="Barcode"
              type="text"
              id="warehouse-barcode"
            />
          </InputGroup>
          <Flex
            direction="column"
            justifyContent="flex-end"
            gap="9px"
            alignItems="flex-start"
          >
            {locatedItemError && (
              <Text
                styles={{ 'white-space': 'nowrap' }}
                color="#CB0000"
                size="15px"
              >{`"Invalid Barcode"`}</Text>
            )}
            {locateItemLoading && <Loader size={30} />}
            {!locatedItemError &&
              locatedItem?.Items?.length &&
              !locateItemLoading && (
                <>
                  <Text
                    styles={{ 'white-space': 'nowrap' }}
                    color="#000000"
                    size="15px"
                  >
                    {locatedItem?.Items[0]?.Name}
                  </Text>
                  <Text
                    styles={{ 'white-space': 'nowrap' }}
                    weight="500"
                    color="#2EBEBD"
                    size="15px"
                  >
                    {locatedItem?.Items[0]?.Location.join(';')}
                  </Text>
                </>
              )}
          </Flex>
          {!locatedItemError &&
            locatedItem?.Items?.length &&
            !locateItemLoading && (
              <Button
                onClick={cancelLocatedItem}
                styles={{ padding: '8px 16px', 'align-self': 'fles-start' }}
                minWidth="auto"
                kind="primary"
              >
                Cancel
              </Button>
            )}
        </Flex>
      </Flex>
      <Wrapper
        styles={{
          display: 'flex',
          'flex-direction': 'column',
          'align-items': 'flex-start'
        }}
        padding="41px 0 35px"
      >
        <Flex
          styles={{ 'margin-bottom': '50px', 'max-width': '1100px' }}
          alignItems="flex-start"
          gap="58px"
        >
          <WarehouseUnitRender
            warehouseData={warehouseData}
            unitItem={warshouseMap[0]}
          />
          <WarehouseUnitRender
            warehouseData={warehouseData}
            unitItem={warshouseMap[1]}
          />
        </Flex>
        <Flex
          styles={{ 'margin-bottom': '50px', 'max-width': '1100px' }}
          alignItems="flex-start"
          gap="58px"
        >
          <WarehouseUnitRender
            warehouseData={warehouseData}
            unitItem={warshouseMap[2]}
          />
          <WarehouseUnitRender
            warehouseData={warehouseData}
            unitItem={warshouseMap[3]}
          />
        </Flex>
        <Flex
          styles={{ 'margin-bottom': '50px' }}
          alignItems="flex-start"
          gap="58px"
        >
          <WarehouseUnitRender
            warehouseData={warehouseData}
            unitItem={warshouseMap[4]}
          />
        </Flex>
      </Wrapper>
    </Wrapper>
  )
}

export default React.memo(Map)

const InputGroup = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`
const GridItem = styled.div`
  width: 120px;
  height: 90px;
  transition: all 0.3s ease-in;
  background-color: ${({ active }) =>
    active ? 'rgba(46, 190, 189, .4)' : '#D9D9D9'};
  position: relative;

  &:hover {
    background-color: #2ebebd;
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
const GridRow = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: nowrap;
  & > div {
    border-bottom: 1px solid #999999;
  }
  & > div:not(:last-of-type) {
    border-right: 3px solid #999999;
  }
`
