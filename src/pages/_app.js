import { Providers } from '../components'
import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import 'antd/lib/style/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <Providers>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default MyApp
