import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'

const img = () =>
  gulp
    .src(paths.src.img)
    .pipe(newer(paths.dist.img))
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream())

export default img
