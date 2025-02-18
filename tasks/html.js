import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import pug from 'gulp-pug'
import versionNumber from 'gulp-version-number'
import ifPlugin from 'gulp-if'
import browserSync from 'browser-sync'
import temml from 'temml'
import process from 'node:process'

const isProduction = process.argv.includes('--build')

const html = () =>
  gulp
    .src(paths.src.html)
    .pipe(newer({ dest: paths.dist.html, ext: '.html' }))
    .pipe(
      pug({
        pretty: !isProduction,
        verbose: false,
        basedir: paths.srcFolder,
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
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream())

export default html
