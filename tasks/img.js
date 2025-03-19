import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const img = () =>
  gulp
    .src(paths.src.img)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Error',
          message: '<%= error.message %>',
        }),
      }),
    )
    .pipe(newer(paths.dist.img))
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream())

export default img
