// ## 🧮 Utilities

/**
 * Asserts that the actual value equals the expected value.
 * @param {any} expected - The expected value.
 * @param {any} toBe - The actual value.
 * @param {string} [message] - Optional test message.
 */
function printTest(expect, toBe, message = 'Test') {
  if (expect === toBe) console.info(`${message} passed`)
  else {
    console.error(`${message} failed. Expected:`, toBe, ', but got:', expect)
  }
}

// =============================================================================

// ## ⚙️ Solution

// Задача. Знайти суми елементів у вказаній області (зафарбована область охоплює відповідну половину рядків і стовпців)

/**
 * @typedef {Object} CalcTableSegmentSumOptions
 * @property {number} [rowStart]
 * @property {number} [colStart]
 * @property {number} [rowEnd]
 * @property {number} [colEnd]
 * @property {number} [rowStep]
 * @property {number} [colStep]
 */

/**
 * Calculates the sum of a segment of a 2D table (array).
 *
 * @param {number[][]} table
 * @param {CalcTableSegmentSumOptions} [options]
 * @returns {number}
 */
function calcTableSegmentSum(table, options = {}) {
  const {
    rowStart = 0,
    colStart = 0,
    rowEnd = table.length,
    colEnd = table[0].length,
    rowStep = 1,
    colStep = 1,
  } = options

  let segmentSum = 0

  for (let rowIndex = rowStart; rowIndex < rowEnd; rowIndex += rowStep)
    for (let colIndex = colStart; colIndex < colEnd; colIndex += colStep)
      segmentSum += table[rowIndex][colIndex]

  return segmentSum
}

const testTable = [
  [7, 6, 8, 2, 7, 9], // 17
  [4, 0, 6, 5, 3, 1], // 13
  [6, 10, 1, 9, 9, 0], // 19
  [4, 9, 10, 10, 10, 5], // 24
]
const halfOfRows = Math.floor(testTable.length / 2)
const halfOfCols = Math.floor(testTable[0].length / 2)

document.write('<p>Таблиця: ')
document.write(JSON.stringify(testTable))
document.write('<ol>')

// 1. номери рядків від 0 до половини, стовпці від 0 до половини;
const secondQuarterSum = calcTableSegmentSum(testTable, {
  rowEnd: halfOfRows,
  colEnd: halfOfCols,
})

document.write('<li>' + secondQuarterSum)
printTest(secondQuarterSum, 31, 'Second quarter sum test')

// 2. номери рядків від 0 до половини, стовпці від половини до кінця;
const firstQuarterSum = calcTableSegmentSum(testTable, {
  rowEnd: halfOfRows,
  colStart: halfOfCols,
})

document.write('<li>' + firstQuarterSum)
printTest(firstQuarterSum, 27, 'First quarter sum test')

// 3. номери рядків від половини до кінця, стовпці від 0 до половини;
const thirdQuarterSum = calcTableSegmentSum(testTable, {
  rowStart: halfOfRows,
  colEnd: halfOfCols,
})

document.write('<li>' + thirdQuarterSum)
printTest(thirdQuarterSum, 40, 'Third quarter sum test')

// 4. номери рядків від половини до кінця, стовпці від половини до кінця;
const fourthQuarterSum = calcTableSegmentSum(testTable, {
  rowStart: halfOfRows,
  colStart: halfOfCols,
})

document.write('<li>' + fourthQuarterSum)
printTest(fourthQuarterSum, 43, 'Fourth quarter sum test')

// 5. суму парних рядків;
const evenRowsSum = calcTableSegmentSum(testTable, { rowStep: 2 })

document.write('<li>' + evenRowsSum)
printTest(evenRowsSum, 74, 'Even rows sum test')

// 5.1 суму непарних рядків;
const oddRowsSum = calcTableSegmentSum(testTable, { rowStart: 1, rowStep: 2 })

printTest(oddRowsSum, 67, 'Odd rows sum test')

// 6. суму непарних стовпців;
const oddColsSum = calcTableSegmentSum(testTable, { colStart: 1, colStep: 2 })

document.write('<li>' + oddColsSum)
printTest(oddColsSum, 66, 'Odd columns sum test')

// 6.1 суму парних стовпців;
const evenColsSum = calcTableSegmentSum(testTable, {
  colStep: 2,
})

document.write('<li>' + evenColsSum)
printTest(evenColsSum, 75, 'Even columns sum test')

// 7. у парних рядках – непарні стовпці, у непарних – парні.
const evenRowsOddColsSum = calcTableSegmentSum(testTable, {
  rowStep: 2,
  colStart: 1,
  colStep: 2,
})

const oddRowsEvenColsSum = calcTableSegmentSum(testTable, {
  rowStart: 1,
  rowStep: 2,
  colStep: 2,
})

const oddEvenReverseSum = evenRowsOddColsSum + oddRowsEvenColsSum

document.write('<li>' + oddEvenReverseSum)
printTest(
  oddEvenReverseSum,
  73,
  'Even rows, odd columns and vise versa sum test',
)
