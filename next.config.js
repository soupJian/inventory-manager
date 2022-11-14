/** @type {import('next').NextConfig} */
const withAntdLess = require('next-plugin-antd-less')

const nextConfig = {
  // reactStrictMode: true
  swcMinify: true,
  images: {
    domains: [
      's3.us-west-2.amazonaws.com',
      'beyond-diving.s3.us-west-2.amazonaws.com'
    ]
  },
  env: {
    BASE_URL: 'https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1',
    CRM_BASE_URL: 'https://oypcwmk5j1.execute-api.us-west-2.amazonaws.com/v1',
    IMG_UPLOAD_URL: 'https://westshade-erp.s3.us-west-2.amazonaws.com',
    version: '0.0.1'
  },
  modifyVars: { '@primary-color': '#000' }, // 修改antd的primary颜色为黑色
  cssLoaderOptions: {},
  webpack(config) {
    return config
  },
  async rewrites() {
    return {
      fallback: [
        // {
        //   source: '/old_api/:path*',
        //   destination: `https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/:path*`
        // },
        {
          source: '/api/:path*',
          destination: `https://oypcwmk5j1.execute-api.us-west-2.amazonaws.com/v1/:path*`
        }
      ]
    }
  }
}

module.exports = withAntdLess(nextConfig)
