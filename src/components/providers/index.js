import MainStateProvider from './MainStateProvider'
import ThemeWrapper from './ThemeProvider'

const HomeProviders = ({ children, store }) => {
  return (
    <MainStateProvider store={store}>
      <ThemeWrapper>{children}</ThemeWrapper>
    </MainStateProvider>
  )
}

export default HomeProviders
