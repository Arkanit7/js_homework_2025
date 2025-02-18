import paths from '../config/paths.js'
import { rm } from 'node:fs/promises'

const reset = async (cb) => {
  try {
    await rm(paths.buildFolder, { recursive: true, force: true })
    cb()
  } catch (error) {
    console.log(error)
  }
}

export default reset
