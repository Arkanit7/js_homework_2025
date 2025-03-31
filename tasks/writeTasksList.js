//@ts-check

import process from 'process'
import fs from 'node:fs'
import path from 'node:path'
import paths from '../config/paths.js'

/**
 * Read a value that immediately follows the specified attribute
 * @param {string} attribute - A string, in console it starts with "--"
 * @returns {string} - Value of the corresponding attribute
 */
function getArgvValue(attribute) {
  const value = process.argv.find(
    (arg, index, array) => array[index - 1] === '--' + attribute,
  )

  if (value === undefined)
    throw new Error(`There's no value passed for the attribute "${attribute}".`)

  return value
}

/**
 * @param {string} id
 * @returns {string}
 */
const indexTasksTemplate = (id) => {
  return `extends ../layouts/_nav-layout.pug

block append frontmatter
  include ./_collection
  -
    const currentLesson = lessons.find((lesson) => lesson.id === ${id})
`
}

/**
 * @param {string} id
 * @returns {string}
 */
const taskTemplate = (id) => {
  return `extends ../../layouts/_task-layout.pug

block frontmatter
  include ../_collection
  -
    const currentTask = taskGroups
      .flatMap((group) => group.tasks)
      .find((task) => task.id === ${id})


block content
  p= currentTask.description

  hr
  h2 Рішення:
  script(src="./scripts/task_${id.padStart(2, '0')}.js")
  include:code(lang="javascript") ./scripts//task_${id.padStart(2, '0')}.js
`
}

/**
 * Creates file along with the necessary directories.
 * Skip if the file already exists.
 * @param {string} name - File name with extension
 * @param {string} dirPath - Path to the file
 * @param {string} content - What to fill file with
 */
function createFile(name, dirPath, content) {
  const fullPath = path.join(dirPath, name)

  if (fs.existsSync(fullPath)) {
    console.log(`File "${fullPath}" already exists. Skipping...`)
    return
  }

  fs.mkdirSync(dirPath, { recursive: true })
  fs.writeFileSync(fullPath, content)
}

// function appendNewTask(id, taskGroups) {
//   const task = {
//     title: `Задача №${id}`,
//     id: id,
//     href: `task_${id.padStart(2, '0')}.html`,
//     description: '',
//   }

//   taskGroups.at(-1).tasks.push(task)

//   return taskGroups
// }

// function appendNewLesson(id, lessons) {
//   const lesson = {
//     href: `lesson_${id.padStart(2, '0')}/`,
//     title: `ДЗ №${id}.`,
//     img: { src: 'homework-placeholder-01.webp', alt: '' },
//     id: id,
//     datetime: new Date(),
//   }

//   lessons.push(lesson)

//   return lessons
// }

// function transformToPug(jsObject, objectName) {
//   let pugObject = JSON.stringify(jsObject, null, 2)

//   pugObject = pugObject.replace(/"/g, "'")
//   pugObject = pugObject.replace(/\n/g, '\n    ')
//   pugObject = `-\n  const ${objectName} = ` + pugObject

//   return pugObject
// }

// function readPugObject(filePath) {
//   const fileContent = fs.readFileSync(filePath, 'utf8')

//   return new Function(
//     `return ${fileContent.replace(/^-\n\s+const (\w)+ = /, '')}`,
//   )()
// }

// function addLessonToCollection(id) {
//   const collectionPath = '${paths.srcFolder}_collection.pug'
//   const lessons = readPugObject(collectionPath)

//   if (lessons.some((lesson) => lesson.id == id)) return

//   const updatedLessons = appendNewLesson(id, lessons)
//   const pugLessons = transformToPug(updatedLessons, 'lessons')

//   fs.writeFileSync(collectionPath, pugLessons)
// }

// function addTaskToCollection(id, lessonId) {
//   const collectionPath = `${paths.srcFolder}lesson_${lessonId.padStart(
//     2,
//     '0',
//   )}/_collection.pug`
//   const taskGroups = readPugObject(collectionPath)

//   if (
//     taskGroups.some((taskGroup) =>
//       taskGroup.tasks.some((task) => task.id == id),
//     )
//   )
//     return

//   const updatedTasks = appendNewTask(id, taskGroups)
//   const pugTaskGroups = transformToPug(updatedTasks, 'taskGroups')

//   fs.writeFileSync(collectionPath, pugTaskGroups)
// }

/**
 * Creates list of files from the specified constrains
 * Use a template function as content filler
 * @param {string} dirPath
 * @param {string} extension
 * @param {(id:string) => string} contentFn
 * @param {number} fromNumber
 * @param {number} toNumber
 */
function createFileList(
  dirPath,
  extension,
  fromNumber,
  toNumber,
  contentFn = () => '',
) {
  for (let i = fromNumber; i <= toNumber; i++) {
    if (i - fromNumber > 100)
      throw new Error('[Safety] Writing too many files!')

    const id = String(i)

    createFile(
      `task_${id.padStart(2, '0')}${extension}`,
      dirPath,
      contentFn(id),
    )
  }
}

/**
 * Create lesson folder and fill it with .pug & .js file templates
 * @example gulp write --lesson 7 --from 5 --to 9
 * @returns {Promise}
 */
function writeTasksList() {
  const lessonId = getArgvValue('lesson')
  const fromTask = parseInt(getArgvValue('from'))
  const toTask = parseInt(getArgvValue('to'))

  if (!isFinite(fromTask) || !isFinite(toTask))
    throw new Error('Arguments --from & --to must be finite numbers')

  // create index
  const lessonDir = `${paths.srcFolder}lesson_${lessonId.padStart(2, '0')}`

  createFile('index.pug', lessonDir, indexTasksTemplate(lessonId))

  // create tasks
  const tasksDir = `${paths.srcFolder}lesson_${lessonId.padStart(2, '0')}/tasks`

  createFileList(tasksDir, '.pug', fromTask, toTask, taskTemplate)

  // create scripts
  const scriptsDir = `${paths.srcFolder}lesson_${lessonId.padStart(2, '0')}/tasks/scripts`

  createFileList(scriptsDir, '.js', fromTask, toTask, () => "'use strict'\n\n")

  return Promise.resolve()
}

export default writeTasksList
