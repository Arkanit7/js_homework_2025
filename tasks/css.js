import gulp from 'gulp'
import path from '../config/path.js'
import process from 'node:process'
import sourcemaps from 'gulp-sourcemaps'
import * as sass from 'sass'
import gulpSass from 'gulp-sass'
import postcss from 'gulp-postcss'
import ifPlugin from 'gulp-if'
import browserSync from 'browser-sync'

const isProduction = process.argv.includes('--build')
const scss = gulpSass(sass)

const css = () =>
  gulp
    .src(path.src.css)
    .pipe(ifPlugin(!isProduction, sourcemaps.init()))
    .pipe(scss().on('error', scss.logError))
    .pipe(ifPlugin(isProduction, postcss()))
    .pipe(ifPlugin(!isProduction, sourcemaps.write('./')))
    .pipe(gulp.dest(path.dist.css))
    .pipe(browserSync.stream())

export default css
