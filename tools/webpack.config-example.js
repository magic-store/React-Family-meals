// webpack.config.js

const path = require('path'); // 路由

// 插件都是一个类，所以我们命名的时候尽量用大写开头
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 模板

// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// mini-css-extract-plugin css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 创建多个实例 拆分css
const extractSassCSS = new ExtractTextWebpackPlugin('[name]-one.css');
const extractLESS = new ExtractTextWebpackPlugin('[name]-two.css');

// clean DIST
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');

module.exports = {

  resolve: {
    // 别名
    alias: {
        $: './src/jquery.js'
    },
    // 省略后缀
    extensions: ['.js', '.json', '.ts', 'tsx']
  },

  devServer: {
    contentBase: './dist',
    host: 'localhost',      // 默认是localhost
    port: 3000,             // 端口
    open: true,             // 自动打开浏览器
    hot: true               // 开启热更新
  },

  mode: 'development', // 指定 mode
  
  // 1. 写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个文件 main.js
  // entry: './src/index.js', || entry: ['./src/index.js', './src/login.js'], 

  // 2. 真正实现多入口和多出口需要写成对象的方式
//   entry: {
//       index: './src/index.js',  // 入口文件
//       login: './src/login.js'

//   },

  entry: './src/index.js',
  
  output: {
    /* 
        1. filename: 'bundle.js',
        2. [name]就可以将出口文件名和入口文件名一一对应
        3. 添加hash可以防止文件缓存，每次都会生成4位的hash串
    */

    filename: '[name].[hash:8].js',      // 打包后的文件名称 打包后会生成index.js和login.js文件
    path: path.resolve('dist')  // 打包后的目录，必须是绝对路径
  },

  module: {
    rules: [

        /** css */
        {
            test: /\.scss$/,     // 解析css
            use: ExtractTextWebpackPlugin.extract({
                // 将css用link的方式引入就不再需要style-loader了
                use: ['css-loader', 'sass-loader', 'postcss-loader']
            })
            
            /* 
                也可以这样写，这种方式方便写一些配置参数
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            */

           // 多个实例 use:  extractSassCSS.extract({ fallback:'style-loader', use: ['css-loader', 'sass-loader']}) // 从右向左解析
        },
        {
            test: /\.less$/,     // 解析css { fallback: 'style-loader', use: [ 'css-loader' ] }

            // 多个实例
            use: extractLESS.extract({fallback: 'style-loader', use: ['css-loader', 'less-loader', 'postcss-loader']}) // 从右向左解析
        },

        /** png */

        {
            test: /\.(jpe?g|png|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,    // 小于8k的图片自动转成base64格式，并且不会存在实体图片
                  outputPath: 'images/'   // 图片打包后存放的目录
                }
              }
            ]
        },

        // html imng

        {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader'
        },

        // font

        {
          test: /\.(eot|ttf|woff|svg)$/,
          use: 'file-loader'
      },

      // es6
      {
        test:/\.js$/,
        use: 'babel-loader',
        include: /src/,          // 只转化src目录下的js
        exclude: /node_modules/  // 排除掉node_modules，优化打包速度
    }

    ]
  },

  // 提取公共代码
 optimization: {
  splitChunks: {
      cacheGroups: {
          vendor: {   // 抽离第三方插件
              test: /node_modules/,   // 指定是node_modules下的第三方包
              chunks: 'initial',
              name: 'vendor',  // 打包后的文件名，任意命名    
              // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
              priority: 10    
          },
          utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
              chunks: 'initial',
              name: 'utils',  // 任意命名
              minSize: 0    // 只要超出0字节就生成一个新包
          }
      }
    }
  },
  plugins: [

    // 单页面开发 
    // 通过new一下这个类来使用插件 
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      // 在src目录下创建一个index.html页面当做模板来用
      template: './src/index.html',
      hash: true, // 会在打包好的bundle.js后面加上hash串
    }),

    // 多页面开发
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',   
    //   filename: 'index.html',
    //   chunks: ['index']   // 对应关系,index.js对应的是index.html
    // }),
    // new HtmlWebpackPlugin({
    //     template: './src/login.html',
    //     filename: 'login.html',
    //     chunks: ['login']   // 对应关系,login.js对应的是login.html
    // }),


    // 单个实例
    new ExtractTextWebpackPlugin({
        filename: 'css/style.css',
    }),

    // clean dist
    new CleanWebpackPlugin('dist'),

    // 多个实例
    // extractSassCSS, extractLESS
    new webpack.HotModuleReplacementPlugin()
  ]
}
