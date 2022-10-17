/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true
  // images: {
  //   domains: [
  //     's3.us-west-2.amazonaws.com',
  //     'beyond-diving.s3.us-west-2.amazonaws.com'
  //   ]
  // }
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

module.exports = nextConfig
