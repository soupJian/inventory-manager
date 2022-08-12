import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Login } from '..'
import { Header, SideBar, Wrapper } from '../commons'

const Layout = ({ children }) => {
  const user = useSelector((state) => state.user.user)
  return (
    <Container>
      <SideBar user={user} />
      <Content>
        <Header user={user} />
        <Main>
          {user.isLoggedIn && user.accessToken ? (
            children
          ) : (
            <CustomWrapper>
              <Login />
            </CustomWrapper>
          )}
        </Main>
      </Content>
    </Container>
  )
}

export default Layout

const Container = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  min-width: 1440px;
  min-height: 100vh;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.menuBackground};
`

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;

  & > header {
    flex: 0 0 auto;
  }
`

const Main = styled.main`
  flex: 1 1 auto;
`

const CustomWrapper = styled(Wrapper)`
  display: grid;
  place-items: center;
`
