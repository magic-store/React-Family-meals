module.exports = {
  modules: true,
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 3 versions', 'Android >= 4.0']
    })
  ]
}
