import React, { useEffect, useState } from 'react'
import {
  Button,
  Flex,
  Icon,
  Input,
  Loader,
  Text,
  Wrapper,
  Popover
} from '../../components/commons'
import WarehouseUnit from './WarehouseUnit'
import styled from 'styled-components'
import { Api, ISOStringToReadableDate } from '../../utils/utils'
const api = new Api()

const Map = ({ user }) => {
  const [loadingWarehouse, setLoadingWarehouse] = useState(false)
  const [warehouseData, setWarehouseData] = useState({})
  const [locatedItem, setLocatedItem] = useState({})
  const [locatedItemInput, setLocatedItemInput] = useState('')
  const [locatedItemError, setLocatedItemError] = useState('')
  const [locateItemLoading, setLocateItemLoading] = useState(false)
  const [showLocationPopover, setShowLocationPopover] = useState(false)
  const [activeLocationKey, setActiveLocationKey] = useState([])

  const locateItem = () => {
    setLocateItemLoading(true)
    api
      .getInventory(`barcode=${locatedItemInput}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        if (data.Items && data.Items?.length === 0) {
          setLocatedItemError("Sorry, We can't find the item!")
        } else if (!data.Items && data.message) {
          setLocatedItemError(data.message)
        }
        setLocateItemLoading(false)
        setLocatedItem(data)
        console.log(data)
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
  const handleGridItem = (val) => {
    setActiveLocationKey(val)
    setShowLocationPopover(true)
  }
  const fetchItems = () => {
    setLoadingWarehouse(true)
    api
      .getAllInventory(`projectionExpression=SKU,Location,Name,SettledTime`, {
        Authorization: `Bearer ${user.accessToken}`
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
        console.log(dataObj)
        setWarehouseData(dataObj)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingWarehouse(false)
      })
  }
  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      {loadingWarehouse && (
        <LoadingWrapper>
          <Loader size={100} />
          <Text>Loading warehouse data...</Text>
        </LoadingWrapper>
      )}
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
            <WarehouseUnit
              unit="A"
              label="Against the left wall"
              yLabel={['R1', 'R2', 'R3'].reverse()}
              xLabel={['A1', 'A2', 'A3', 'A4']}
            >
              {['R1', 'R2', 'R3'].reverse().map((row) => (
                <GridRow key={row + 'A'}>
                  {['A1', 'A2', 'A3', 'A4'].map((col) => (
                    <Popover
                      isOpen={
                        showLocationPopover &&
                        activeLocationKey === [col, row].join('-')
                      }
                      key={[col, row].join('-')}
                      onClose={() => setShowLocationPopover(false)}
                      contentStyles={{
                        'background-color': '#ffffff',
                        padding: '24px',
                        transform: 'translate(50%, 100%)'
                      }}
                      content={
                        <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                          <Text
                            family="Rubik"
                            weight="500"
                            size="16px"
                            color="#000000"
                          >
                            {[col, row].join('-')}
                          </Text>
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="20px 0 0">
                              {warehouseData[[col, row].join('-')]?.map(
                                (item) => (
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
                                )
                              )}
                            </Wrapper>
                          )}
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="16px 0 0">
                              <Text
                                color="#999999"
                                as="p"
                                size="15px"
                                weight="500"
                              >
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                      <GridItem
                        onMouseLeave={() => setShowLocationPopover(false)}
                        active={
                          (showLocationPopover &&
                            activeLocationKey === [col, row].join('-')) ||
                          (locatedItem?.Items?.length &&
                            locatedItem?.Items[0]?.Location.filter(
                              (val) => val === [col, row].join('-')
                            ).length)
                        }
                        onClick={(e) =>
                          handleGridItem([row, col].reverse().join('-'))
                        }
                        data-location={[row, col].join('-')}
                      ></GridItem>
                    </Popover>
                  ))}
                </GridRow>
              ))}
            </WarehouseUnit>
            <WarehouseUnit
              unit="B"
              label="In the center facing the left"
              xLabel={['B1', 'B2', 'B3', 'B4']}
              yLabel={['R1', 'R2', 'R3'].reverse()}
            >
              {['R1', 'R2', 'R3'].reverse().map((row) => (
                <GridRow key={row + 'B'}>
                  {['B1', 'B2', 'B3', 'B4'].map((col) => (
                    <Popover
                      isOpen={
                        showLocationPopover &&
                        activeLocationKey === [col, row].join('-')
                      }
                      key={[col, row].join('-')}
                      onClose={() => setShowLocationPopover(false)}
                      contentStyles={{
                        'background-color': '#ffffff',
                        padding: '24px',
                        transform: 'translate(50%, 100%)'
                      }}
                      content={
                        <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                          <Text
                            family="Rubik"
                            weight="500"
                            size="16px"
                            color="#000000"
                          >
                            {[col, row].join('-')}
                          </Text>
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="20px 0 0">
                              {warehouseData[[col, row].join('-')]?.map(
                                (item) => (
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
                                )
                              )}
                            </Wrapper>
                          )}
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="16px 0 0">
                              <Text
                                color="#999999"
                                as="p"
                                size="15px"
                                weight="500"
                              >
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                      <GridItem
                        onMouseLeave={() => setShowLocationPopover(false)}
                        active={
                          (showLocationPopover &&
                            activeLocationKey === [col, row].join('-')) ||
                          (locatedItem?.Items?.length &&
                            locatedItem?.Items[0]?.Location.filter(
                              (val) => val === [col, row].join('-')
                            ).length)
                        }
                        onClick={(e) =>
                          handleGridItem([row, col].reverse().join('-'))
                        }
                        data-location={[row, col].join('-')}
                      ></GridItem>
                    </Popover>
                  ))}
                </GridRow>
              ))}
            </WarehouseUnit>
          </Flex>
          <Flex
            styles={{ 'margin-bottom': '50px', 'max-width': '1100px' }}
            alignItems="flex-start"
            gap="58px"
          >
            <WarehouseUnit
              unit="C"
              label="In the center facing the left"
              xLabel={['C1', 'C2', 'C3', 'C4']}
              yLabel={['R1', 'R2', 'R3', 'R4'].reverse()}
            >
              {['R1', 'R2', 'R3', 'R4'].reverse().map((row) => (
                <GridRow key={row + 'C'}>
                  {['C1', 'C2', 'C3', 'C4'].map((col) => (
                    <Popover
                      isOpen={
                        showLocationPopover &&
                        activeLocationKey === [col, row].join('-')
                      }
                      key={[col, row].join('-')}
                      onClose={() => setShowLocationPopover(false)}
                      contentStyles={{
                        'background-color': '#ffffff',
                        padding: '24px',
                        transform: 'translate(50%, 100%)'
                      }}
                      content={
                        <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                          <Text
                            family="Rubik"
                            weight="500"
                            size="16px"
                            color="#000000"
                          >
                            {[col, row].join('-')}
                          </Text>
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="20px 0 0">
                              {warehouseData[[col, row].join('-')]?.map(
                                (item) => (
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
                                )
                              )}
                            </Wrapper>
                          )}
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="16px 0 0">
                              <Text
                                color="#999999"
                                as="p"
                                size="15px"
                                weight="500"
                              >
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                      <GridItem
                        onMouseLeave={() => setShowLocationPopover(false)}
                        active={
                          (showLocationPopover &&
                            activeLocationKey === [col, row].join('-')) ||
                          (locatedItem?.Items?.length &&
                            locatedItem?.Items[0]?.Location.filter(
                              (val) => val === [col, row].join('-')
                            ).length)
                        }
                        onClick={(e) =>
                          handleGridItem([row, col].reverse().join('-'))
                        }
                        data-location={[row, col].join('-')}
                      ></GridItem>
                    </Popover>
                  ))}
                </GridRow>
              ))}
            </WarehouseUnit>
            <WarehouseUnit
              unit="D"
              label="Against the right wall and near entrance"
              xLabel={['D1', 'D2', 'D3']}
              yLabel={['R1', 'R2', 'R3', 'R4'].reverse()}
            >
              {['R1', 'R2', 'R3', 'R4'].reverse().map((row) => (
                <GridRow key={row + 'B'}>
                  {['D1', 'D2', 'D3'].map((col) => (
                    <Popover
                      isOpen={
                        showLocationPopover &&
                        activeLocationKey === [col, row].join('-')
                      }
                      key={[col, row].join('-')}
                      onClose={() => setShowLocationPopover(false)}
                      contentStyles={{
                        'background-color': '#ffffff',
                        padding: '24px',
                        transform: 'translate(50%, 100%)'
                      }}
                      content={
                        <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                          <Text
                            family="Rubik"
                            weight="500"
                            size="16px"
                            color="#000000"
                          >
                            {[col, row].join('-')}
                          </Text>
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="20px 0 0">
                              {warehouseData[[col, row].join('-')]?.map(
                                (item) => (
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
                                )
                              )}
                            </Wrapper>
                          )}
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="16px 0 0">
                              <Text
                                color="#999999"
                                as="p"
                                size="15px"
                                weight="500"
                              >
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                      <GridItem
                        onMouseLeave={() => setShowLocationPopover(false)}
                        active={
                          (showLocationPopover &&
                            activeLocationKey === [col, row].join('-')) ||
                          (locatedItem?.Items?.length &&
                            locatedItem?.Items[0]?.Location.filter(
                              (val) => val === [col, row].join('-')
                            ).length)
                        }
                        onClick={(e) =>
                          handleGridItem([row, col].reverse().join('-'))
                        }
                        data-location={[row, col].join('-')}
                      ></GridItem>
                    </Popover>
                  ))}
                </GridRow>
              ))}
            </WarehouseUnit>
          </Flex>
          <Flex
            styles={{ 'margin-bottom': '50px' }}
            alignItems="flex-start"
            gap="58px"
          >
            <WarehouseUnit
              unit="E"
              label="Against the right wall"
              xLabel={['E1']}
              yLabel={['R1', 'R2', 'R3'].reverse()}
            >
              {['R1', 'R2', 'R3'].reverse().map((row, idx) => (
                <GridRow key={row + 'E'}>
                  {['E1'].map((col) => (
                    <Popover
                      isOpen={
                        showLocationPopover &&
                        activeLocationKey === [col, row].join('-')
                      }
                      key={[col, row].join('-')}
                      onClose={() => setShowLocationPopover(false)}
                      contentStyles={{
                        'background-color': '#ffffff',
                        padding: '24px',
                        transform: 'translate(50%, 100%)'
                      }}
                      content={
                        <Wrapper padding="0" styles={{ 'min-width': '340px' }}>
                          <Text
                            family="Rubik"
                            weight="500"
                            size="16px"
                            color="#000000"
                          >
                            {[col, row].join('-')}
                          </Text>
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="20px 0 0">
                              {warehouseData[[col, row].join('-')]?.map(
                                (item) => (
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
                                )
                              )}
                            </Wrapper>
                          )}
                          {warehouseData[[col, row].join('-')]?.length && (
                            <Wrapper padding="16px 0 0">
                              <Text
                                color="#999999"
                                as="p"
                                size="15px"
                                weight="500"
                              >
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                                          ...warehouseData[
                                            [col, row].join('-')
                                          ]?.sort(
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
                      <GridItem
                        onMouseLeave={() => setShowLocationPopover(false)}
                        active={
                          (showLocationPopover &&
                            activeLocationKey === [col, row].join('-')) ||
                          (locatedItem?.Items?.length &&
                            locatedItem?.Items[0]?.Location.filter(
                              (val) => val === [col, row].join('-')
                            ).length)
                        }
                        onClick={(e) =>
                          handleGridItem([row, col].reverse().join('-'))
                        }
                        data-location={[row, col].join('-')}
                      ></GridItem>
                    </Popover>
                  ))}
                </GridRow>
              ))}
            </WarehouseUnit>
          </Flex>
        </Wrapper>
      </Wrapper>
    </>
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
  &:not(:last-of-type) > div > div:first-of-type {
    border-bottom: 1px solid #999999;
  }
  & > div:not(:last-of-type) {
    border-right: 3px solid #999999;
  }
`
const LoadingWrapper = styled.div`
  position: fixed;
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
