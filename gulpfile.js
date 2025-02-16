import gulp from 'gulp'
import ifPlugin from 'gulp-if' // Condition

// html
import pug from 'gulp-pug'
import versionNumber from 'gulp-version-number'

// css
import sourcemaps from 'gulp-sourcemaps'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'

// local server
import browserSync from 'browser-sync'

import reset from './gulp/reset.js'

import temml from 'temml'

import create from './gulp/create.js'

const isProduction = process.argv.includes('--build')

const renderMathToMathML = (mathString, inline = true) => {
  return temml.renderToString(mathString, { displayMode: !inline })
}

const html = () =>
  gulp
    .src(['./src/**/*.pug', '!./src/**/_*.pug'])
    .pipe(
      pug({
        pretty: !isProduction,
        verbose: false, // show compiled files in console
        basedir: './src/', // The root directory of all absolute inclusion.
        data: {
          root: isProduction ? '/js_homework_2025/' : '/',
        },
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
    // Cache busting
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
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())

const scss = gulpSass(sass)
const css = () =>
  gulp
    .src(['./src/**/*.scss', '!./src/**/_*.scss'])
    .pipe(ifPlugin(!isProduction, sourcemaps.init()))
    .pipe(scss().on('error', scss.logError))
    .pipe(ifPlugin(isProduction, postcss()))
    .pipe(ifPlugin(!isProduction, sourcemaps.write('./')))
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
const build = gulp.series(reset, mainTasks)
// Default tasks
gulp.task('dev', dev)
gulp.task('build', build)
gulp.task('create', create)
