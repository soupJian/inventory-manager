import { useSelector } from 'react-redux'
// components
import { Icon, Text } from '@/components/commons'
import RangeAccordion from './components/RangeAccordion'
// css
import styled from 'styled-components'

// main
const History = ({ show, onClose }) => {
  const user = useSelector((state) => state.user)
  const today = new Date()
  const yesterday = new Date()
  const last7days = new Date()
  const last30days = new Date()
  const last90days = new Date()
  const thisYear = new Date(new Date().getFullYear(), 0, 1)
  yesterday.setDate(yesterday.getDate() - 1)
  last7days.setDate(yesterday.getDate() - 7)
  last30days.setDate(yesterday.getDate() - 30)
  last90days.setDate(yesterday.getDate() - 90)

  return (
    <HistoryWrapper show={show}>
      <Content>
        <Title>
          <Text size="20px" weight="500" as="h3">
            Activity History
          </Text>
        </Title>
        <CloseWrapper>
          <CloseButton onClick={onClose}>
            <Icon name="close-rounded" width="24px" height="24px" />
          </CloseButton>
        </CloseWrapper>
        <Body>
          <RangeAccordion
            rangeParams={`from=${today.toISOString().split('T')[0]}&order=des`}
            user={user}
            label="Today"
          />
          <RangeAccordion
            rangeParams={`from=${
              new Date(yesterday).toISOString().split('T')[0]
            }&to=${new Date(yesterday).toISOString().split('T')[0]}`}
            user={user}
            label="Yesterday"
          />
          <RangeAccordion
            rangeParams={`from=${
              new Date(last7days).toISOString().split('T')[0]
            }`}
            user={user}
            label="Last 7 days"
          />
          <RangeAccordion
            rangeParams={`from=${
              new Date(last30days).toISOString().split('T')[0]
            }`}
            user={user}
            label="Last 30 days"
          />
          <RangeAccordion
            rangeParams={`from=${
              new Date(last90days).toISOString().split('T')[0]
            }`}
            user={user}
            label="Last 90 days"
          />
          <RangeAccordion
            rangeParams={`from=${
              new Date(thisYear).toISOString().split('T')[0]
            }`}
            user={user}
            label="This year"
          />
        </Body>
      </Content>
    </HistoryWrapper>
  )
}

export default History

const HistoryWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  z-index: ${({ theme }) => theme.zIndex.modal};
  transform: ${({ show }) => (show ? 'translateX(0)' : 'translateX(110%)')};
  transition: all 0.3s ease-in-out;
`
const Content = styled.div`
  position: relative;
  width: 350px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -8px 0px 16px rgba(0, 0, 0, 0.2);
  padding: 56px 16px 0px;
  display: flex;
  flex-direction: column;
  line-height: 20px;
`
const CloseWrapper = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
`
const CloseButton = styled.div`
  background-color: transparent;
  border: none;
  cursor: pointer;
`
const Title = styled.div`
  padding: 20px;
`

const Body = styled.div`
  margin-top: 32px;
  flex: 1 1 auto;
  overflow-y: auto;
`
