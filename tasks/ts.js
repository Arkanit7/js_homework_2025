import gulp from 'gulp'
import paths from '../config/paths.js'
import newer from 'gulp-newer'
import browserSync from 'browser-sync'
import typescript from 'gulp-typescript'

const tsProject = typescript.createProject('tsconfig.json')

const ts = () =>
  gulp
    .src(paths.src.ts)
    .pipe(newer(paths.dist.ts))
    .pipe(tsProject())
    .pipe(gulp.dest(paths.dist.ts))
    .pipe(browserSync.stream())

export default ts
