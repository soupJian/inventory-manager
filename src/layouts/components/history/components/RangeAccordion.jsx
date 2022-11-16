import { useEffect, useState } from 'react'
// components
import { Flex, Icon, Loader, Text, Wrapper } from '@/components/commons'
// api
import { getHistory } from '@/service/user'
// css
import styled from 'styled-components'

const changeKeys = [
  { label: 'Available', key: 'Available' },
  { label: 'Name', key: 'Name' },
  { label: 'Location', key: 'Location' },
  { label: 'ReorderAlert', key: 'Reorder Alert' },
  { label: 'Reserved', key: 'Reserved' },
  { label: 'SettledTime', key: 'Settled Time' },
  { label: 'Stock', key: 'Stock' },
  { label: 'Tags', key: 'Tags' },
  { label: 'TotalCost', key: 'Total Cost' }
]

const RangeAccordion = ({ label, rangeParams }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({})

  const fetchData = () => {
    setIsLoading(true)
    getHistory(rangeParams).then((data) => {
      setData(data)
      setIsLoading(false)
      console.log(data)
    })
  }

  const renderChanges = (hist) => {
    let changes = []
    changeKeys.forEach((item) => {
      if (hist.NewItem[item.key] !== hist.OldItem.Attributes[item.key]) {
        changes.push(
          `${item.label} changed from ${hist.NewItem[item.key]} to ${
            hist.OldItem.Attributes[item.key]
          }`
        )
      }
    })
    return changes
  }

  useEffect(() => {
    if (isOpen && !Object.keys(data).length) {
      fetchData()
    }
  }, [isOpen])

  return (
    <AccordionWrapper>
      <Header onClick={() => setIsOpen(!isOpen)}>
        <Flex alignItems="center" justifyContent="space-between">
          <Text size="16px" weight="500">
            {label}
          </Text>
          <Icon
            styles={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(270deg)' }}
            name="chevron"
            width="8px"
            height="12px"
          />
        </Flex>
      </Header>
      {isOpen && (
        <Content>
          {isLoading ? (
            <Loader size={30} />
          ) : data.Items?.length ? (
            <HistoryItems>
              {data.Items?.sort(
                (a, b) => -a.Created.localeCompare(b.Created)
              ).map((data) => (
                <HistoryItem key={data.Id}>
                  <Text size="16px" color="#808080">
                    {data.Created.match(/\d\d:\d\d/)[0]}
                  </Text>
                  <Flex
                    styles={{ 'margin-top': '20px' }}
                    justifyContent="flex-start"
                    alignItems="center"
                    gap="8px"
                  >
                    <Icon name="user" width="18px" height="18px" />
                    <Text weight="500" color="#000000" size="16px">
                      {data.UserName || data.UserId}
                    </Text>
                  </Flex>
                  <Wrapper padding="20px 26px">
                    <Text as="p" size="14px" color="#808080">
                      {data.NewItem.Name || data.OldItem.Name}
                    </Text>
                    {data.Manipulation === 'Create' ? (
                      <Text
                        as="p"
                        styles={{ 'margin-top': '8px' }}
                        size="14px"
                        color="#000000"
                      >
                        Added item to the system
                      </Text>
                    ) : data.Manipulation === 'Delete' ? (
                      <Text
                        as="p"
                        styles={{ 'margin-top': '8px' }}
                        size="14px"
                        color="#000000"
                      >
                        Deleted from the system
                      </Text>
                    ) : (
                      renderChanges(data).map((change, idx) => (
                        <Text
                          key={idx}
                          as="p"
                          styles={{ 'margin-top': '8px' }}
                          size="14px"
                          color="#000000"
                        >
                          {change}
                        </Text>
                      ))
                    )}
                  </Wrapper>
                </HistoryItem>
              ))}
            </HistoryItems>
          ) : (
            <Text>No Activity</Text>
          )}
        </Content>
      )}
    </AccordionWrapper>
  )
}

export default RangeAccordion

const AccordionWrapper = styled.div`
  width: 100%;
  padding: 0 16px;
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
`

const Header = styled.div`
  width: 100%;
  cursor: pointer;
`
const Content = styled.div`
  width: 100%;
  padding-top: 24px;
`

const HistoryItems = styled.div`
  padding: 20px;
  border: 2px solid #f0f0f0;
  border-radius: 10px;
`

const HistoryItem = styled.div`
  padding: 20px 0;
  &:first-of-type {
    padding: 0 0 20px;
  }
  &:last-of-type {
    padding: 20px 0 0;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }
`
