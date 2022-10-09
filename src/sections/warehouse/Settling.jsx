import React, { useState, useEffect } from 'react'
import {
  Filter,
  Flex,
  Icon,
  Pagination,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
  Wrapper
} from '../../components/commons'
import styled from 'styled-components'
import Tooltip from '../../components/commons/Tooltip/Tooltip'
import {
  dateList,
  settledHeaders,
  unSettledHeaders
} from '../../constants/pageConstants/warehouse'
import { Api, ISOStringToReadableDate } from '../../utils/utils'
const api = new Api()
import { useSelector } from 'react-redux'

const Settline = () => {
  const user = useSelector((state) => state.user)

  const [activeTab, setActiveTab] = useState('notsettled')
  const [date, setDate] = useState('365')
  const [loadingTable, setLoadingTable] = useState(false)
  const [page, setPage] = useState(1)
  //for looking up an Item
  const [settledItems, setSettledItems] = useState([])
  const [unSettledItems, setUnSettledItems] = useState([])
  const [settledItemsToShow, setSettledItemsToShow] = useState([])
  const [unSettledItemsToShow, setUnSettledItemsToShow] = useState([])
  const [locationList, setLocationList] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const handleDate = (val) => {
    setDate(val)
  }
  const handlePage = (page) => {
    setPage(page)
  }
  const handleSettledItemsToShow = () => {
    setLoadingTable(true)
    const dataToShow = settledItems.slice(page * 10 - 10, page * 10)
    setSettledItemsToShow(dataToShow)
    setLoadingTable(false)
  }
  const handleUnSettledItemsToShow = () => {
    setLoadingTable(true)
    const dataToShow = unSettledItems.slice(page * 10 - 10, page * 10)
    setUnSettledItemsToShow(dataToShow)
    setLoadingTable(false)
  }
  const handleLocationList = (name, val) => {
    console.log(val, name)
    const idx = locationList[name].findIndex((loc) => loc === val)
    let newLocationList = [...locationList[name]]
    if (idx >= 0) {
      newLocationList.splice(idx, 1)
      setLocationList({ ...locationList, [name]: newLocationList })
    } else {
      setLocationList({ ...locationList, [name]: [...newLocationList, val] })
    }
  }
  const saveLocations = (key) => {
    const locationsToBeSave = [...locationList[key].map((loc) => loc)]
    let item = unSettledItems.filter((item) => item.SKU === key)[0]
    api
      .updateInventory(
        {
          ...item,
          SettledTime: new Date(),
          Settled: true,
          ['Location']: locationsToBeSave
        },
        { Authorization: `Bearer ${user.accessToken}` }
      )
      .then((data) => {
        if (data) {
          api
            .getUnsettledInventory(
              {},
              { Authorization: `Bearer ${user.accessToken}` }
            )
            .then((data) => {
              let locationListObj = {}
              setUnSettledItems(data.Items)
              data.Items?.forEach((item) => (locationListObj[item.SKU] = []))
              setLocationList(locationListObj)
            })
        }
      })
  }
  useEffect(() => {
    api
      .getSettledInventory(`date=${date}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        setSettledItems(data.Items)
      })
    api
      .getUnsettledInventory(`date=${date}`, {
        Authorization: `Bearer ${user.accessToken}`
      })
      .then((data) => {
        let locationListObj = {}
        setUnSettledItems(data.Items)
        data.Items?.forEach((item) => (locationListObj[item.SKU] = []))
        setLocationList(locationListObj)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])
  useEffect(() => {
    if (activeTab === 'settled') {
      handleSettledItemsToShow()
    } else {
      handleUnSettledItemsToShow()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page])
  return (
    <Wrapper height="auto" padding="36px 0">
      <Flex justifyContent="space-between" alignItems="center">
        <Tabs>
          <Tab
            contentStyles={{ 'font-size': '18px' }}
            onClick={() => setActiveTab('notsettled')}
            active={activeTab === 'notsettled'}
            idx={0}
          >
            Not Settled
          </Tab>
          <Tab
            contentStyles={{ 'font-size': '18px' }}
            onClick={() => setActiveTab('settled')}
            active={activeTab === 'settled'}
            idx={1}
          >
            Settled
          </Tab>
        </Tabs>
        <Filter
          value={date}
          label={activeTab === 'settled' ? 'Settled' : 'Received'}
          list={dateList}
          onSelect={handleDate}
        />
      </Flex>
      <Wrapper padding="22px 0">
        {activeTab === 'settled' ? (
          <>
            <Table
              loading={loadingTable}
              name="warehousing-settled"
              headers={settledHeaders}
              paginationComponent={
                <Wrapper padding="32px 0 0">
                  <Pagination
                    itemsInPage={settledItemsToShow?.length}
                    totalItems={settledItems?.length}
                    totalPages={Math.ceil(settledItems?.length / itemsPerPage)}
                    onPageChange={handlePage}
                    currentPage={page}
                  />{' '}
                </Wrapper>
              }
            >
              {settledItemsToShow.map((item, idx) => (
                <TableRow idx={idx} height="72px" key={item.SKU}>
                  {settledHeaders.map((i) => (
                    <TableCell key={i.key}>
                      {i.key === 'SettledTime' ? (
                        ISOStringToReadableDate(item[i.key])
                      ) : i.key === 'Location' ? (
                        <Flex justifyContent="flex-start">
                          {item[i.key][0]}
                          {item[i.key].length > 1 && (
                            <Tooltip
                              wrapperStyles={{ 'margin-left': '4px' }}
                              contentStyles={{
                                'background-color': '#ffffff'
                              }}
                              place="top"
                              content={
                                <Wrapper>
                                  <HeaderText>All Locations</HeaderText>
                                  <Flex>
                                    {item[i.key].map((loc) => (
                                      <SpanText key={loc}>{loc};</SpanText>
                                    ))}
                                  </Flex>
                                </Wrapper>
                              }
                            >
                              <Button
                                styles={{
                                  padding: '3px',
                                  'background-color': '#000000',
                                  'border-radius': '50%',
                                  width: '20px',
                                  height: '20px'
                                }}
                              >
                                <Icon name="add" width="100%" height="100%" />
                              </Button>
                            </Tooltip>
                          )}
                        </Flex>
                      ) : (
                        item[i.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Table>
          </>
        ) : (
          <>
            <Table
              loading={loadingTable}
              name="warehousing-unsettled"
              headers={unSettledHeaders}
              paginationComponent={
                <Wrapper padding="32px 0 0">
                  <Pagination
                    itemsInPage={unSettledItemsToShow?.length}
                    totalItems={unSettledItems?.length}
                    totalPages={Math.ceil(
                      unSettledItems?.length / itemsPerPage
                    )}
                    onPageChange={handlePage}
                    currentPage={page}
                  />{' '}
                </Wrapper>
              }
            >
              {unSettledItemsToShow.map((item, idx) => (
                <TableRow idx={idx} height="72px" key={item.SKU}>
                  {unSettledHeaders.map((i) => (
                    <TableCell key={i.key}>
                      {i.key === 'Location' ? (
                        <Flex
                          styles={{ 'max-width': '260px' }}
                          gap="10px"
                          alignItems="stretch"
                          justifyContent="flex-start"
                        >
                          <Filter
                            wrapperStyles={{
                              flex: '1 0 auto',
                              width: '100%'
                            }}
                            name={item.SKU}
                            value={locationList[item.SKU]}
                            label=""
                            list={locations}
                            multiSelect
                            onSelect={handleLocationList}
                          />
                          <SettleButton onClick={() => saveLocations(item.SKU)}>
                            Settle
                          </SettleButton>
                        </Flex>
                      ) : (
                        item[i.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Table>
          </>
        )}
      </Wrapper>
    </Wrapper>
  )
}

export default Settline
const SettleButton = styled.button`
  padding: 8px 16px;
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
const Button = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #000000;
  cursor: pointer;
  padding: 5px;
  border: none;
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
