import Providers from '../components/providers'
import BasicLayout from '../layouts/BasicLayout'
import 'antd/lib/style/index.css'
import '../styles/globals.css'

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
