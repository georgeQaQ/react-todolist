const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const HTMLPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development' //判断执行环境

const config = webpackMerge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../src/app.js'), //应用程序app入口
  },
  output: {
    filename: '[name].[hash].js',// []代表变量，文件更改hash变化
  },
  plugins: [
    new HTMLPlugin({
      template: path.join(__dirname, '../src/template.html')
    })
  ]
})

// localhost:8888/filename
if (isDev) {
  config.entry = {
    app: [
      // 'react-hot-loader/patch',
      path.join(__dirname, '../src/app.js')
    ]
  }
  config.devServer = {
    host: '0.0.0.0',
    compress: true,
    port: '8888',
    contentBase: path.join(__dirname, '../dist'), //打包后静态文件路径
    hot: true,
    inline: true,
    //错误提醒显示（不包括warning）
    overlay: {
      errors: true
    },
    publicPath: '/public/', //指定主机和端口后加/public/才能访问
    //404请求返回指定页面
    historyApiFallback: {
      index: '/public/index.html'
    }
  }
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
}

module.exports = config
