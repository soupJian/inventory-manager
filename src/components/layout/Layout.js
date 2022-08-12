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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  min-width: 1440px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.menuBackground};
`

const Content = styled.div`
  flex: 1 1 auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
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
