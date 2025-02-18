import gulp from 'gulp'
import paths from '../config/paths.js'
import html from './html.js'
import css from './css.js'
import js from './js.js'
import img from './img.js'

const watcher = () => {
  gulp.watch(paths.watch.html, html)
  gulp.watch(paths.watch.css, css)
  gulp.watch(paths.watch.js, js)
  gulp.watch(paths.watch.img, img)
}

export default watcher
