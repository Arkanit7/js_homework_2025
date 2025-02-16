import gulp from 'gulp'
import path from '../config/path.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'

const img = () =>
  gulp
    .src(path.src.img)
    .pipe(newer(path.dist.img))
    .pipe(gulp.dest(path.dist.img))
    .pipe(browserSync.stream())

export default img
