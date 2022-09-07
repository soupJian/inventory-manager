import { Providers } from '../components'
// import Layout from '../components/layout/Layout'
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
