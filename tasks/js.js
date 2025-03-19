import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const js = () =>
  gulp
    .src(paths.src.js)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Error',
          message: '<%= error.message %>',
        }),
      }),
    )
    .pipe(newer(paths.dist.js))
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())

export default js
