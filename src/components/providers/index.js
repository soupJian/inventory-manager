import MainStateProvider from "./MainStateProvider"
import ThemeWrapper from "./ThemeProvider"

const Providers = ({children}) => {
    return (
        <MainStateProvider>
            <ThemeWrapper>
                {children}
            </ThemeWrapper>
        </MainStateProvider>
    )
}

export default Providers
