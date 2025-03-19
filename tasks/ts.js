import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import typescript from 'gulp-typescript'
import plumber from 'gulp-plumber'
import notify from 'gulp-notify'

const tsProject = typescript.createProject('tsconfig.json')

const ts = () =>
  gulp
    .src(paths.src.ts)
    .pipe(
      plumber({
        errorHandler: notify.onError({
          title: 'Gulp Error',
          message: '<%= error.message %>',
        }),
      }),
    )
    .pipe(newer(paths.dist.ts))
    .pipe(tsProject())
    .pipe(gulp.dest(paths.dist.ts))
    .pipe(browserSync.stream())

export default ts
