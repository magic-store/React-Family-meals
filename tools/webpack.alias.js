const path = require('path')

/**
 * Webpack Alias
 */
module.exports = {
  asset: path.resolve(__dirname, '../src/asset'),
  components: path.resolve(__dirname, '../src/components'),
  router: path.resolve(__dirname, '../src/router'),
  service: path.resolve(__dirname, '../src/service'),
  root: path.resolve(__dirname, '../src/root'),
  store: path.resolve(__dirname, '../src/store')
}
