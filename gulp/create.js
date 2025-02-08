import process from 'process'
import fs from 'node:fs'

const taskTemplate = (number) =>
  `extends ../../layouts/_task-layout.pug

block frontmatter
  include ../_collection
  -
    const currentTask = tasks.find(task => task.id === ${number})

block content
  p!= currentTask.description
  hr
  h2 Рішення:
  script(src="./scripts/task_${number}.js")
`
const SCRIPT_TEMPLATE = ``

function create() {
  const number = process.argv[process.argv.length - 1].split('--')[1]
  if (number) {
    fs.writeFileSync(
      `./src/lesson_06/tasks/task_${number}.pug`,
      taskTemplate(number),
    )
    fs.writeFileSync(
      `./src/lesson_06/tasks/scripts/task_${number}.js`,
      SCRIPT_TEMPLATE,
    )
  }
  return Promise.resolve('Done!')
}

export default create
