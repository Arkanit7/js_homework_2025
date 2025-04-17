'use strict'

function getRandomNumber(min = 0, max = 99) {
  if (typeof min !== 'number' || typeof max !== 'number')
    throw new TypeError('Both min and max must be numbers.')

  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * @param {number} cells - Amount of cells in the row
 */
function createTableRow(cells, min = 0, max = 99) {
  if (typeof cells !== 'number')
    throw new TypeError('Amount of cells must be a number.')
  if (cells <= 0) throw new RangeError('Amount of cells must be positive.')

  const rowEl = document.createElement('tr')

  for (let i = 0; i < cells; i++) {
    const cellEl = document.createElement('td')

    cellEl.innerText = String(getRandomNumber(min, max))
    rowEl.append(cellEl)
  }

  return rowEl
}

/**
 * @param {number} rows - Amount of rows in the table
 * @param {number} cols - Amount of cells in a row
 */
function createTable(rows, cols, min = 0, max = 99) {
  if (typeof rows !== 'number')
    throw new TypeError('Amount of rows must be a number.')
  if (rows <= 0) throw new RangeError('Amount of rows must be positive.')

  const tableEl = document.createElement('table')
  const tBodyEl = document.createElement('tbody')

  for (let i = 0; i < rows; i++) {
    const rowEl = createTableRow(cols, min, max)

    tBodyEl.append(rowEl)
  }

  tableEl.append(tBodyEl)

  return tableEl
}

// =============================================================================

try {
  const app = document.querySelector('.js-app')
  const table = createTable(3, 4)

  app?.append(table)
} catch (error) {
  console.error(error)
}
