//babel.config.js
// 配置 antd 按需导入
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true
        // style: function (defaultName) {
        //   let name = defaultName
        //   switch (name) {
        //     case 'antd/lib/row': // row 采用的是 grid布局
        //       name = 'antd/lib/grid'
        //       break
        //     case 'antd/lib/col': // col 采用的是 grid布局
        //       name = 'antd/lib/grid'
        //       break
        //     case 'antd/lib/table':
        //       break
        //     default:
        //       name = defaultName
        //   }
        //   return `${name}/style/index.css`
        // }
      }
    ],
    [
      'import',
      {
        libraryName: '@ant-design/icons',
        libraryDirectory: 'lib/icons',
        camel2DashComponentName: false
      },
      '@ant-design/icons'
    ]
  ]
}
