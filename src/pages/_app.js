import Providers from '../components/providers'
import BasicLayout from '../layouts/BasicLayout'
import '../styles/globals.css'
import 'antd/lib/style/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <BasicLayout>
        <Component {...pageProps} />
      </BasicLayout>
    </Providers>
  )
}

export default MyApp
