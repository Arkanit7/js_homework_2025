import gulp from 'gulp'
import path from '../config/path.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'

const js = () =>
  gulp
    .src(path.src.js)
    .pipe(newer(path.dist.js))
    .pipe(gulp.dest(path.dist.js))
    .pipe(browserSync.stream())

export default js
