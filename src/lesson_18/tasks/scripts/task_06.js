'use strict'

const GRADES_ATTRIBUTE = 'grades[]'

/**
 * Calculate average value out of all form's inputs.
 *
 * @param {SubmitEvent} e
 */
function handleSubmit(e) {
  e.preventDefault()

  const inputElList = e.target.elements[GRADES_ATTRIBUTE]
  const gradesSum = [].reduce.call(
    inputElList,
    (sum, {value}) => sum + Number(value),
    0,
  )
  const averageGrade = gradesSum / inputElList.length

  e.target.querySelector('output').innerText = averageGrade.toFixed(1)
}

/**
 * @param {string} type - Type of the input
 */
function createInputCell(type) {
  const cellEl = document.createElement('td')
  const inputEl = document.createElement('input')

  inputEl.type = type
  inputEl.name = GRADES_ATTRIBUTE
  inputEl.placeholder = '0'
  inputEl.className = 'u-is-full'

  cellEl.append(inputEl)

  return cellEl
}

/**
 * @param {number} cells - Amount of cells in the row
 */
function createTableRow(cells) {
  if (typeof cells !== 'number')
    throw new TypeError('Amount of cells must be a number.')
  if (cells <= 0) throw new RangeError('Amount of cells must be positive.')

  const rowEl = document.createElement('tr')

  for (let i = 0; i < cells; i++) {
    const cellEl = createInputCell('number')

    rowEl.append(cellEl)
  }

  return rowEl
}

/**
 * @param {number} cells - Amount of cells in the table
 */
function createTable(cells, cellsPerRow = 4) {
  if (typeof cells !== 'number')
    throw new TypeError('Amount of cells must be a number.')
  if (cells <= 0) throw new RangeError('Amount of cells must be positive.')

  const tableEl = document.createElement('table')
  const tBodyEl = document.createElement('tbody')

  tableEl.append(tBodyEl)

  const rows = Math.ceil(cells / cellsPerRow)
  let cellsLeft = cells

  for (let i = 0; i < rows; i++) {
    const rowEl = createTableRow(Math.min(cellsLeft, cellsPerRow))

    cellsLeft -= cellsPerRow
    tBodyEl.append(rowEl)
  }

  return tableEl
}

/**
 * @param {number} gradesAmount
 */
function createGradesForm(gradesAmount) {
  const formEl = document.createElement('form')
  const captionEl = document.createElement('caption')
  const tableEl = createTable(gradesAmount)
  const submitEl = document.createElement('button')
  const outputEl = document.createElement('output')
  const footerEl = document.createElement('div')

  outputEl.className = 'u-text-bolder u-text-400'

  captionEl.innerText = 'Оцінки'
  captionEl.className = 'u-mbe-100'

  tableEl.prepend(captionEl)

  submitEl.innerText = 'Обчислити середнє'

  footerEl.className = 'u-flex u-flex-wrap u-gap-200 u-items-center'
  footerEl.append(submitEl, outputEl)

  formEl.className = 'js-form-average u-flow-200 u-overflow-auto u-pb-500'
  formEl.append(tableEl, footerEl)
  formEl.addEventListener('submit', handleSubmit)

  return formEl
}

// =============================================================================

const buildTableForm = document.querySelector('.js-build-table')

// Create a new tale for calculation of average grade
buildTableForm?.addEventListener('submit', (e) => {
  e.preventDefault()

  const gradesAmount = +e.target?.elements?.amount?.value

  if (!isFinite(gradesAmount) || gradesAmount <= 0) return

  const newFormEl = createGradesForm(gradesAmount)
  const oldFormEl = document.querySelector('.js-form-average')

  oldFormEl?.replaceWith(newFormEl)
})
