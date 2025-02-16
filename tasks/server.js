import path from '../config/path.js'
import browserSync from 'browser-sync'

const server = () => {
  browserSync.init({
    server: {
      baseDir: path.buildFolder,
    },
    notify: false,
    port: 3000,
    browser: 'firefox',
  })
}

export default server
