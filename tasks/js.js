import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'

const js = () =>
  gulp
    .src(paths.src.js)
    .pipe(newer(paths.dist.js))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())

export default js
