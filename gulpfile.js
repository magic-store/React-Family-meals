const cdnUploader = require('cdn-uploader')
const gulp = require('gulp')
const path = require('path')

const packageJSON = require('./package.json')

gulp.task('cdn', () => {
  if (!process.env.CDN_UPYUN_PWD) {
    throw new Error('CDN password required!')
  }


gulp.task('tslint', () => {
  return gulp
    .src([
      path.join(__dirname, './src/**/*.ts'),
      path.join(__dirname, './src/**/*.tsx')
    ])
    .pipe(tslint({
      formatter: 'stylish'
    }))
    .pipe(tslint.report())
})
