import gulp from 'gulp'
// html
import pug from 'gulp-pug'
// css
import sourcemaps from 'gulp-sourcemaps'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
// local server
import browserSync from 'browser-sync'

import reset from './gulp/reset.js'

import temml from 'temml'

const renderMathToMathML = (mathString, inline = true) => {
  return temml.renderToString(mathString, { displayMode: !inline })
}

const html = () =>
  gulp
    .src(['./src/**/*.pug', '!./src/**/_*.pug'])
    .pipe(
      pug({
        pretty: true, // format html
        verbose: true, // show compiled files in console
        basedir: './src/', // The root directory of all absolute inclusion.
        filters: {
          math: (math, options) => {
            try {
              return renderMathToMathML(math, options.inline)
            } catch (error) {
              console.error('Temml rendering error:', error)
              return `<span style="color:red">Temml rendering error: ${error.message}</span>`
            }
          },
        },
      }),
    )
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())

const scss = gulpSass(sass)
const css = () =>
  gulp
    .src(['./src/**/*.scss', '!./src/**/_*.scss'])
    .pipe(sourcemaps.init())
    .pipe(scss().on('error', scss.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())

const copy = () =>
  gulp
    .src([
      './src/**/*.{svg,png,jpg,ico,webp,avif,gif,js}',
      '!./src/**/_*.{svg,png,jpg,ico,webp,avif,gif,js}',
    ])
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())

const server = () => {
  browserSync.init({
    server: {
      baseDir: './dist/',
    },
    notify: false,
    port: 3000,
    browser: 'firefox',
  })
}

const watcher = () => {
  gulp.watch('./src/**/*.pug', html)
  gulp.watch('./src/**/*.scss', css)
  gulp.watch('./src/**/*.{svg,png,jpg,ico,webp,avif,gif,js}', copy)
}

const mainTasks = gulp.series(gulp.parallel(html, css, copy))

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))

// Default tasks
gulp.task('default', dev)
gulp.task('build', dev)
