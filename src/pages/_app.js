import { useRouter } from 'next/router'
import Providers from '../components/providers'
import BasicLayout from '../layouts/BasicLayout'
import 'antd/lib/style/index.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  console.log(router)
  return (
    <Providers>
      {/* 注册页面不需要布局 */}
      {router.route == '/register' ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <BasicLayout>
          <Component {...pageProps} />
        </BasicLayout>
      )}
    </Providers>
  )
}

export default MyApp
