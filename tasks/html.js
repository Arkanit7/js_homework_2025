import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import pug from 'gulp-pug'
import versionNumber from 'gulp-version-number'
import ifPlugin from 'gulp-if'
import browserSync from 'browser-sync'
import process from 'node:process'
import highlightMath from '../filters/highlightMath.js'
import highlightCode from '../filters/highlightCode.js'
import escape from '../filters/escape.js'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const isProduction = process.argv.includes('--build')

const html = () => {
  return gulp
    .src(paths.src.html)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Error',
          message: '<%= error.message %>',
        }),
      }),
    )
    .pipe(newer({dest: paths.dist.html, ext: '.html'}))
    .pipe(
      pug({
        pretty: !isProduction,
        verbose: false,
        basedir: paths.srcFolder,
        data: {
          root: isProduction ? '/js_homework_2025/' : '/',
        },
        filters: {
          math: highlightMath,
          code: highlightCode,
          escape,
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
}

export default html
