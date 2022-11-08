import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
// components
import {
  Filter,
  Flex,
  Pagination,
  Tab,
  Table,
  TableCell,
  TableRow,
  Tabs,
  Wrapper,
  Dialog,
  BaseButton
} from '../../../components/commons'
import { Popover } from 'antd'
import { PlusCircleFilled } from '@ant-design/icons'
// api
import {
  getSettledInventory,
  getUnsettledInventory
} from '../../../service/inventory'
import { updateInventory } from '../../../service/inventory'
// js
import { toggleLoading } from '../../../store/slices/globalSlice'
import { formatTimeStr } from '../../../utils/formatTime'
import {
  dateList,
  settledHeaders,
  unSettledHeaders
} from '../../../constants/pageConstants/warehouse'
import { locations } from '../../../constants/pageConstants/locations'
import { ISOStringToReadableDate } from '../../../utils/utils'
// css
import styled from 'styled-components'
import styles from '../index.module.less'

// main
const Settline = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('notsettled')
  const [date, setDate] = useState('365')
  const [page, setPage] = useState(1)
  //for looking up an Item
  const [settledItems, setSettledItems] = useState([])
  const [unSettledItems, setUnSettledItems] = useState([])
  const [settledItemsToShow, setSettledItemsToShow] = useState([])
  const [unSettledItemsToShow, setUnSettledItemsToShow] = useState([])
  const [locationList, setLocationList] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [dialog, setDialog] = useState({
    name: '',
    location: [],
    onConfirm: () => null,
    show: false
  })
  const handleDate = (val) => {
    setDate(val)
  }
  const handlePage = (page) => {
    setPage(page)
  }
  const handleSettledItemsToShow = (list, page) => {
    const dataToShow = list.slice(
      page * itemsPerPage - itemsPerPage,
      page * itemsPerPage
    )
    setSettledItemsToShow(dataToShow)
  }
  const handleUnSettledItemsToShow = (list, page) => {
    const dataToShow = list.slice(
      page * itemsPerPage - itemsPerPage,
      page * itemsPerPage
    )
    setUnSettledItemsToShow(dataToShow)
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
  const saveLocations = (key, locationsToBeSave) => {
    let item = unSettledItems.filter((item) => item.SKU === key)[0]
    const arr = item.Location.concat(locationsToBeSave)
    const set = new Set(arr)
    updateInventory('update', {
      ...item,
      SettledTime: new Date(),
      Settled: item.Settled + item.Unsettled,
      Unsettled: 0,
      Updated: new Date(),
      SettledTime: new Date(),
      ['Location']: Array.from(set)
    }).then((data) => {
      if (data) {
        getData()
      }
      setDialog({
        show: false
      })
    })
  }
  const confirmSettle = (item) => {
    const locationsToBeSave = [...locationList[item.SKU].map((loc) => loc)]
    if (locationsToBeSave.length == 0) {
      return
    }
    setDialog({
      name: item.Name,
      location: locationsToBeSave,
      onConfirm: () => saveLocations(item.SKU, locationsToBeSave),
      show: true
    })
  }
  const getData = () => {
    dispatch(toggleLoading(true))
    const settledData = getSettledInventory({
      date: date
    }).then((data) => {
      setSettledItems(data.Items)
      handleSettledItemsToShow(data.Items, 1)
    })
    const unSettledData = getUnsettledInventory({
      date
    }).then((data) => {
      let locationListObj = {}
      setUnSettledItems(data.Items)
      handleUnSettledItemsToShow(data.Items, 1)
      data.Items?.forEach((item) => (locationListObj[item.SKU] = []))
      setLocationList(locationListObj)
    })
    Promise.all([settledData, unSettledData]).then(() => {
      dispatch(toggleLoading(false))
    })
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])
  useEffect(() => {
    if (activeTab === 'settled') {
      handleSettledItemsToShow(settledItems, page)
    } else {
      handleUnSettledItemsToShow(unSettledItems, page)
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
          <Table
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
                />
              </Wrapper>
            }
          >
            {settledItemsToShow.map((item, idx) => (
              <TableRow idx={idx} key={item.SKU}>
                {settledHeaders.map((i) => (
                  <TableCell key={i.key}>
                    {i.key === 'SettledTime' ? (
                      ISOStringToReadableDate(item[i.key])
                    ) : i.key === 'Location' ? (
                      <Flex justifyContent="flex-start">
                        {item[i.key][0]}
                        {item['Location'].length > 1 && (
                          <Popover
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
                      </Flex>
                    ) : i.key === 'Received' ? (
                      formatTimeStr(item[i.key], 'DD/MM/YY')
                    ) : (
                      item[i.key]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </Table>
        ) : (
          <div style={{ paddingBottom: '30px' }}>
            <Table
              name="warehousing-unsettled"
              headers={unSettledHeaders}
              paginationComponent={
                <Wrapper padding="32px 0">
                  <Pagination
                    itemsInPage={unSettledItemsToShow?.length}
                    totalItems={unSettledItems?.length}
                    totalPages={Math.ceil(
                      unSettledItems?.length / itemsPerPage
                    )}
                    onPageChange={handlePage}
                    currentPage={page}
                  />
                </Wrapper>
              }
            >
              {unSettledItemsToShow.map((item, idx) => (
                <TableRow idx={idx} key={item.SKU}>
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
                            OptionWrapperStyle={{
                              'max-height': '230px'
                            }}
                            name={item.SKU}
                            value={locationList[item.SKU]}
                            label=""
                            list={locations}
                            multiSelect
                            onSelect={handleLocationList}
                          />
                          <SettleButton onClick={() => confirmSettle(item)}>
                            Settle
                          </SettleButton>
                        </Flex>
                      ) : i.key === 'Received' ? (
                        formatTimeStr(item[i.key], 'DD/MM/YY')
                      ) : (
                        item[i.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </Table>
            {dialog.show && (
              <Dialog>
                <Wrapper padding="60px 54px" style={{ minWidth: '557px' }}>
                  <div className={styles.dialogText}>
                    <div>{dialog.name}</div>
                    <div className={styles.location}>
                      {dialog.location.join(';')}
                    </div>
                  </div>
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
          </div>
        )}
      </Wrapper>
    </Wrapper>
  )
}

export default Settline
const SettleButton = styled.button`
  height: 40px;
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
