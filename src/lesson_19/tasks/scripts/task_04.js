'use strict'

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInteger(min = 0, max = 99) {
  if (typeof min !== 'number' || typeof max !== 'number')
    throw new TypeError('Range must be numeric.')

  return min + Math.floor(Math.random() * (max - min + 1))
}

class Table {
  #rowsAmount
  #colsAmount

  /**
   * @param {number} rowsAmount
   * @param {number} colsAmount
   * @param {string} [label]
   * @param {boolean} [hasCounter]
   */
  constructor(rowsAmount, colsAmount, label, hasCounter) {
    this.rowsAmount = rowsAmount
    this.colsAmount = colsAmount
    this.label = label
    this.hasCounter = hasCounter
  }

  get rowsAmount() {
    return this.#rowsAmount
  }

  set rowsAmount(newRowsAmount) {
    if (typeof newRowsAmount !== 'number')
      throw new TypeError('Rows amount amount must be number.')
    if (newRowsAmount <= 0)
      throw new RangeError('Rows amount amount must be positive.')

    this.#rowsAmount = newRowsAmount
  }

  get colsAmount() {
    return this.#colsAmount
  }

  set colsAmount(newColsAmount) {
    if (typeof newColsAmount !== 'number')
      throw new TypeError('Cols amount amount must be number.')
    if (newColsAmount <= 0)
      throw new RangeError('Cols amount amount must be positive.')

    this.#colsAmount = newColsAmount
  }

  createCell() {
    const cell = document.createElement('TD')

    cell.textContent = String(getRandomInteger())

    return cell
  }

  createRow() {
    const row = document.createElement('TR')

    for (let i = 0; i < this.colsAmount; i++) {
      row.append(this.createCell())
    }

    return row
  }

  createCaption() {
    const caption = document.createElement('CAPTION')

    caption.textContent = this.label

    if (!this.hasCounter) return caption

    const counter = document.createElement('SPAN')
    counter.dataset.clickCounter = '0'
    counter.textContent = counter.dataset.clickCounter
    caption.append('. Натискань: ', counter)

    return caption
  }

  createTable() {
    const table = document.createElement('TABLE')
    const tBody = document.createElement('TBODY')

    if (this.label) table.append(this.createCaption())

    table.append(tBody)

    for (let i = 0; i < this.rowsAmount; i++) {
      tBody.append(this.createRow())
    }

    return table
  }

  render(selector) {
    const table = this.createTable()

    if (selector) {
      const target = document.querySelector(selector)
      target.append(table)
    }

    return table
  }
}

// =============================================================================
// Event handlers

/**
 * @param {Event} e
 */
function highlightTable({target, currentTarget}) {
  const td = target.closest('td')

  if (!td) return

  // reset borders
  const tables = currentTarget.querySelectorAll('table')

  for (const table of tables) {
    table.style.borderColor = ''
  }

  const table = td.closest('table')
  table.style.borderColor = 'red'
}

/**
 * @param {Event} e
 */
function increaseTableCounter({target}) {
  const td = target.closest('td')

  if (!td) return

  const table = td.closest('table')
  const counter = table.querySelector('[data-click-counter]')

  if (!counter) return

  counter.dataset.clickCounter = String(
    Number(counter.dataset.clickCounter) + 1,
  )
  counter.textContent = counter.dataset.clickCounter
}

// =============================================================================
try {
  const container = document.querySelector('.js-app')

  for (let i = 0; i < 3; i++) {
    const table = new Table(3, 3, `Таблиця №${i + 1}`, true)
    const tableEl = table.render()

    tableEl.style.border = '2px solid'
    container.append(tableEl)
  }

  container.addEventListener('click', highlightTable)
  container.addEventListener('click', increaseTableCounter)
} catch (error) {
  console.error(error)
}
