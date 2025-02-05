import process from 'process'
import fs from 'node:fs'

const taskTemplate = (number) => `extends ../../layouts/_task-layout.pug

block frontmatter
  include ../_collection
  -
    const currentTask = tasks.find(task=>task.number === ${number})

block content
  p Вивести на екран номери місяців весни і літа (від 3 до 8)
  hr
  h2 Рішення:
  script(src="./scripts/task_${number}.js")
`
const SCRIPT_TEMPLATE = `/*
## Алгоритм

*/
`

function create() {
  const number = process.argv[process.argv.length - 1].split('--')[1]
  if (number) {
    fs.writeFileSync(
      `./src/lesson_05/tasks/task_${number}.pug`,
      taskTemplate(number),
    )
    fs.writeFileSync(
      `./src/lesson_05/tasks/scripts/task_${number}.js`,
      SCRIPT_TEMPLATE,
    )
  }
  return Promise.resolve('Done!')
}

export default create
