import gulp from 'gulp'
import paths from '../config/paths.js'
import process from 'node:process'
import sourcemaps from 'gulp-sourcemaps'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import ifPlugin from 'gulp-if'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const isProduction = process.argv.includes('--build')
const scss = gulpSass(sass)

const css = () =>
  gulp
    .src(paths.src.css)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Error',
          message: '<%= error.message %>',
        }),
      }),
    )
    .pipe(ifPlugin(!isProduction, sourcemaps.init()))
    .pipe(scss().on('error', scss.logError))
    .pipe(ifPlugin(isProduction, postcss()))
    .pipe(ifPlugin(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())

export default css
