const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const WebpackMonitor = require('webpack-monitor')
const webpackMerge = require('webpack-merge')

const productionConfig = require('./webpack.prod')

module.exports = webpackMerge(
  {
    plugins: [
      new WebpackMonitor({
        capture: true, // -> default 'true'
        target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
        launch: true, // -> default 'false'
        port: 3030, // default -> 8081
      }),
      new DuplicatePackageCheckerPlugin()
    ]
  },
  productionConfig
)
