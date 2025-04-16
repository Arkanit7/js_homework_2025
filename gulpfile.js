import gulp from 'gulp'
import reset from './tasks/reset.js'
import writeTasksList from './tasks/writeTasksList.js'
import html from './tasks/html.js'
import css from './tasks/css.js'
import js from './tasks/js.js'
import img from './tasks/img.js'
import server from './tasks/server.js'
import watcher from './tasks/watcher.js'
import sprite from './tasks/sprite.js'

const mainTasks = gulp.series(gulp.parallel(html, css, js, img, sprite))

const dev = gulp.series(reset, mainTasks, gulp.parallel(server, watcher))
const build = gulp.series(reset, mainTasks)

gulp.task('dev', dev)
gulp.task('build', build)
gulp.task('write', writeTasksList)
