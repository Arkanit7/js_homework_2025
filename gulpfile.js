import gulp from 'gulp'
import reset from './tasks/reset.js'
import writeTasksList from './tasks/writeTasksList.js'
import html from './tasks/html.js'
import css from './tasks/css.js'
import js from './tasks/js.js'
import ts from './tasks/ts.js'
import img from './tasks/img.js'
import server from './tasks/server.js'
import watcher from './tasks/watcher.js'

const mainTasks = gulp.series(gulp.parallel(html, css, js, ts, img))

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))
const build = gulp.series(reset, mainTasks)

gulp.task('dev', dev)
gulp.task('build', build)
gulp.task('write', writeTasksList)
