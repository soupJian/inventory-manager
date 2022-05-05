import { ThemeProvider } from "styled-components"
import { theme } from "../../constants/theme";


const ThemeWrapper = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default ThemeWrapper;
