import paths from '../config/paths.js'
import browserSync from 'browser-sync'

const server = () => {
  browserSync.init({
    server: {
      baseDir: paths.buildFolder,
    },
    notify: false,
    port: 3000,
    browser: 'firefox',
  })
}

export default server
