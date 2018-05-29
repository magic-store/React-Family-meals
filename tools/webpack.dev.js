const HappyPack = require('happypack')
const os = require('os')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const commonConfig = require('./webpack.common')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const cssName = 'css/[name].[chunkhash:8].css'

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const jsName = '[name].js'

const cssOption = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]_[hash:5]',
  sourceMap: true
}

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  output: {
    filename: jsName,
    pathinfo: true
    // publicPath: 'http://localhost:3000/'
  },
  devServer: {
    contentBase: './dist',
    host: 'localhost', // 默认是localhost
    port: 3000, // 端口
    open: true, // 自动打开浏览器
    hot: true // 开启热更新
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: cssOption
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: cssOption
            },
            {
              loader: 'stylus-loader',
              query: 'sourceMap=true'
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: cssOption
            },
            'sass-loader',
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: cssOption
            },
            'less-loader',
            'postcss-loader'
          ]
        })
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 300
  },
  plugins: [
    new ExtractTextWebpackPlugin({ allChunks: true, filename: cssName }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
    // 热替换需要开启

    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段
    // new HappyPack({
    //   id: 'css',
    //   loaders: ['style-loader?sourceMap=true', 'css-loader?sourceMap=true'],
    //   threadPool: happyThreadPool
    // })
  ]
})
