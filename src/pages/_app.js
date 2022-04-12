import ThemeWrapper from '../components/ThemeProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeWrapper>
        <Component {...pageProps} />
    </ThemeWrapper>
  )
}

export default MyApp
