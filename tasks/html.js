import gulp from 'gulp'
import path from '../config/path.js'
import pug from 'gulp-pug'
import versionNumber from 'gulp-version-number'
import ifPlugin from 'gulp-if'
import browserSync from 'browser-sync'
import temml from 'temml'
import process from 'node:process'

const isProduction = process.argv.includes('--build')

const html = () =>
  gulp
    .src(path.src.html)
    .pipe(
      pug({
        pretty: !isProduction,
        verbose: false,
        basedir: path.srcFolder,
        data: {
          root: isProduction ? '/js_homework_2025/' : '/',
        },
        filters: {
          math: (mathString, options = {}) => {
            const { inline = true } = options

            try {
              return temml.renderToString(mathString, { displayMode: !inline })
            } catch (error) {
              console.error('Temml rendering error:', error)
              return `<span style="color:red">Temml rendering error: ${error.message}</span>`
            }
          },
        },
      }),
    )
    .pipe(
      ifPlugin(
        isProduction,
        versionNumber({
          value: '%DT%',
          append: {
            key: 'v',
            cover: 0,
            to: ['css', 'js', 'img'],
          },
        }),
      ),
    )
    .pipe(gulp.dest(path.dist.html))
    .pipe(browserSync.stream())

export default html
