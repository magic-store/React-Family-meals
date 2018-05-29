const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const pull = require('lodash/pull')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackMonitor = require('webpack-monitor')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const commonConfig = require('./webpack.common')
const packageJSON = require('../package.json')

const jsName = 'js/[name].[chunkhash:8].js'
const cssName = 'css/[name].[chunkhash:8].css'

const cssOption = {
  modules: true,
  importLoaders: 1,
  localIdentName: '[name]_[hash:5]',
  sourceMap: false
}

const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    filename: jsName,
    publicPath: `http://www.example.com/${packageJSON.name}/`
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
  plugins: [
    new CleanWebpackPlugin('dist'),
    new ExtractTextWebpackPlugin({ allChunks: true, filename: cssName }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.SplitChunksPlugin({
      names: ['common'],
      chunks: pull(Object.keys(commonConfig.entry)),
      filename: jsName,
      minChunks: Infinity
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: 'manifest',
      chunks: ['common']
    }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 1024 * 244 }),
    new webpack.optimize.OccurrenceOrderPlugin(true)
    // new webpack.optimize.minimize({
    //   sourceMap: false,
    //   comments: false,
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
})

module.exports = config
