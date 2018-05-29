const HappyPack = require('happypack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const HTMLWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin') // 用于模板编译自动插入文件
const os = require('os')
const path = require('path')
const webpack = require('webpack')

const alias = require('./webpack.alias')

const fontName = 'fonts/[name].[hash:8].[ext]'
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }) // happy config
const imageName = 'images/[name].[hash:8].[ext]'
const jsName = '[name].[hash:8].js'
const videoName = 'videos/[name].[hash:8].[ext]'

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  entry: {
    common: [path.join(__dirname, '../src/common')],
    main: [path.join(__dirname, '../src/main')]
  },
  output: {
    filename: jsName,
    path: path.join(__dirname, '../dist')
  },
  resolve: {
    alias: alias,
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.web.jsx',
      '.web.js',
      '.js',
      '.ts',
      '.tsx',
      '.css'
    ]
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve('src'),
        use: ['cache-loader', 'happypack/loader?id=ts']
      },
      {
        test: /\.(svg|cur)$/,
        loader: 'file-loader',
        exclude: /asset\/icon/,
        query: { name: imageName }
      },
      {
        test: /\.(mp4|webm)$/,
        loader: 'file-loader',
        query: { name: videoName }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: { limit: 8192, name: imageName }
      },
      {
        test: /\.eot((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: { limit: 100, name: fontName }
      },
      {
        test: /\.ttf((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/octet-stream',
          name: fontName
        }
      },
      {
        test: /\.woff((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: { limit: 100, minetype: 'application/font-woff', name: fontName }
      },
      {
        test: /\.woff2((\?|#)[?#\w\d_-]+)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          minetype: 'application/font-woff2',
          name: fontName
        }
      }
    ]
  },

  plugins: [
    new HappyPack({
      id: 'ts',
      threadPool: happyThreadPool,
      loaders: ['ts-loader?transpileOnly=true&happyPackMode=true']
    }),
    // new HTMLWebpackHarddiskPlugin(),

    // Html Template Auto Link Boundles
    new HTMLWebpackPlugin({
      alwaysWriteToDisk: true,
      filename: 'index.html', // 输出路径和文件名 相对于 output.path
      /**
       * 1、filename配置的 html 文件目录是相对于webpackConfig.output.path路径而言的，不是相对于当前项目目录结构的。
       * 2、指定生成的 html 文件内容中的link和script路径是相对于生成目录下的，写路径的时候请写生成目录下的相对路径。
       */
      template: path.resolve(__dirname, '../src/app.template.html'), // 入口模板文件位置
      /**
       * 本地模板文件的位置，支持加载器(如handlebars、ejs、undersore、html等)
       * 1、template 配置项在html文件使用 file-loader时，其所指定的位置找不到，导致生成的html文件内容不是期望的内容。
       * 2、为template指定的模板文件没有指定任何 loader的话，默认使用ejs-loader。如template: './index.html'，若没有为.html 指定任何 loader就使用 ejs-loader
       */
      inject: true,
      /**
       * 向template或者templateContent中注入所有静态资源，不同的配置值注入的位置不经相同。
        1、true或者body：所有JavaScript资源插入到body元素的底部
        2、head: 所有JavaScript资源插入到head元素中
        3、false： 所有静态资源css和JavaScript都不会注入到模板文件中
       */
      development: process.env.NODE_ENV,
      showErrors: process.env.NODE_ENV === 'development',
      // config: JSON.stringify(process.env.CONFIG), // 配置项
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    //Global Variables
    new webpack.DefinePlugin({
      __DEBUG__: process.env.NODE_ENV === 'development'
    })
  ]
}
