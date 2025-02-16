import gulp from 'gulp'
import path from '../config/path.js'
import html from './html.js'
import css from './css.js'
import js from './js.js'
import img from './img.js'

const watcher = () => {
  gulp.watch(path.watch.html, html)
  gulp.watch(path.watch.css, css)
  gulp.watch(path.watch.js, js)
  gulp.watch(path.watch.img, img)
}

export default watcher
