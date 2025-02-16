import gulp from 'gulp'
import reset from './tasks/reset.js'
import create from './tasks/create.js'
import html from './tasks/html.js'
import css from './tasks/css.js'
import js from './tasks/js.js'
import img from './tasks/img.js'
import server from './tasks/server.js'
import watcher from './tasks/watcher.js'

const mainTasks = gulp.series(gulp.parallel(html, css, js, img))

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))
const build = gulp.series(reset, mainTasks)

gulp.task('dev', dev)
gulp.task('build', build)
gulp.task('create', create)
