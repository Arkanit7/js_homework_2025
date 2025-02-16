import path from '../config/path.js'
import { rm } from 'node:fs/promises'

const reset = async (cb) => {
  try {
    await rm(path.buildFolder, { recursive: true, force: true })
    cb()
  } catch (error) {
    console.log(error)
  }
}

export default reset
