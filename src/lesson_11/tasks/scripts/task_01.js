// ## 🧮 Utilities

/**
 * Asserts that the actual value equals the expected value.
 * @param {any} expect - The expected value.
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

const testTable = [
  [7, 6, 8, 2, 7, 9],
  [4, 0, 6, 5, 3, 1],
  [6, 10, 1, 9, 9, 0],
  [4, 9, 10, 10, 10, 5],
]

document.write('<p>Таблиця: ')
document.write(JSON.stringify(testTable))
document.write('<ol>')

// 1. номери рядків від 0 до половини, стовпці від 0 до половини;
// Option 1
{
  let secondQuarterSum = 0
  const halfOfRows = testTable.length / 2

  for (let rowIndex = 0; rowIndex < halfOfRows; rowIndex++) {
    const halfOfCols = testTable[rowIndex].length / 2

    for (let colIndex = 0; colIndex < halfOfCols; colIndex++)
      secondQuarterSum += testTable[rowIndex][colIndex]
  }

  printTest(secondQuarterSum, 31, 'Second quarter sum test')
  document.write('<li>' + secondQuarterSum)
}
// Option 2 (for small arrays)
{
  const secondQuarterSum = testTable
    .slice(0, Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(0, Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit, 0)

  printTest(secondQuarterSum, 31, 'Second quarter sum test (functional)')
}

// 2. номери рядків від 0 до половини, стовпці від половини до кінця;
// Option 1
{
  let firstQuarterSum = 0
  const halfOfRows = testTable.length / 2

  for (let rowIndex = 0; rowIndex < halfOfRows; rowIndex++) {
    const halfOfCols = Math.floor(testTable[rowIndex].length / 2)

    for (
      let colIndex = halfOfCols;
      colIndex < testTable[rowIndex].length;
      colIndex++
    )
      firstQuarterSum += testTable[rowIndex][colIndex]
  }

  printTest(firstQuarterSum, 27, 'First quarter sum test')
  document.write('<li>' + firstQuarterSum)
}
// Option 2 (for small arrays)
{
  const firstQuarterSum = testTable
    .slice(0, Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit, 0)

  printTest(firstQuarterSum, 27, 'First quarter sum test (functional)')
}

// 3. номери рядків від половини до кінця, стовпці від 0 до половини;
// Option 1
{
  let thirdQuarterSum = 0

  const halfOfRows = Math.floor(testTable.length / 2)

  for (let rowIndex = halfOfRows; rowIndex < testTable.length; rowIndex++) {
    const halfOfCols = testTable[rowIndex].length / 2

    for (let colIndex = 0; colIndex < halfOfCols; colIndex++)
      thirdQuarterSum += testTable[rowIndex][colIndex]
  }

  printTest(thirdQuarterSum, 40, 'Third quarter sum test')
  document.write('<li>' + thirdQuarterSum)
}
// Option 2 (for small arrays)
{
  const thirdQuarterSum = testTable
    .slice(Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(0, Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit, 0)

  printTest(thirdQuarterSum, 40, 'Third quarter sum test (functional)')
}

// 4. номери рядків від половини до кінця, стовпці від половини до кінця;
// Option 1
{
  let fourthQuarterSum = 0

  const halfOfRows = Math.floor(testTable.length / 2)

  for (let rowIndex = halfOfRows; rowIndex < testTable.length; rowIndex++) {
    const halfOfCols = Math.floor(testTable[rowIndex].length / 2)

    for (
      let colIndex = halfOfCols;
      colIndex < testTable[rowIndex].length;
      colIndex++
    )
      fourthQuarterSum += testTable[rowIndex][colIndex]
  }

  printTest(fourthQuarterSum, 43, 'Fourth quarter sum test')
  document.write('<li>' + fourthQuarterSum)
}
// Option 2 (for small arrays)
{
  const firstQuarterSum = testTable
    .slice(Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit, 0)

  printTest(firstQuarterSum, 43, 'First quarter sum test (functional)')
}

// 5. суму парних рядків;
// Option 1
{
  let evenRowsSum = 0

  for (let rowIndex = 0; rowIndex < testTable.length; rowIndex += 2) {
    evenRowsSum += testTable[rowIndex].reduce((sum, item) => sum + item, 0)
  }

  printTest(evenRowsSum, 74, 'Even rows sum test')
  document.write('<li>' + evenRowsSum)
}
// Option 2 (for small arrays)
{
  const evenRowsSum = testTable
    .filter((_, rowIndex) => rowIndex % 2 === 0)
    .flat()
    .reduce((sum, profit) => sum + profit, 0)

  printTest(evenRowsSum, 74, 'Even rows sum test (functional)')
}

// 6. суму непарних стовпців;
// Option 1
{
  let oddColsSum = 0

  for (const row of testTable)
    for (let i = 1; i < row.length; i += 2) oddColsSum += row[i]

  printTest(oddColsSum, 66, 'Odd columns sum test')
  document.write('<li>' + oddColsSum)
}
// Option 2 (for small arrays)
{
  const evenRowsSum = testTable
    .flatMap((row) => row.filter((_, colIndex) => colIndex % 2))
    .reduce((sum, profit) => sum + profit, 0)

  printTest(evenRowsSum, 66, 'Odd columns sum test (functional)')
}

// 7. у парних рядках – непарні стовпці, у непарних – парні.
// Option 1
{
  let oddEvenReverseSum = 0

  for (let rowIndex = 0; rowIndex < testTable.length; rowIndex++)
    for (
      let colIndex = rowIndex % 2 ? 0 : 1;
      colIndex < testTable[rowIndex].length;
      colIndex += 2
    )
      oddEvenReverseSum += testTable[rowIndex][colIndex]

  printTest(
    oddEvenReverseSum,
    73,
    'Even rows, odd columns and vise versa sum test',
  )
  document.write('<li>' + oddEvenReverseSum)
}
// Option 2 (for small arrays)
{
  const evenRowsOddCols = testTable
    .filter((_, rowIndex) => rowIndex % 2 === 0)
    .map((row) => row.filter((_, colIndex) => colIndex % 2))

  const oddRowsEvenCols = testTable
    .filter((_, rowIndex) => rowIndex % 2)
    .map((row) => row.filter((_, colIndex) => colIndex % 2 === 0))

  const oddEvenReverseSum = evenRowsOddCols
    .concat(oddRowsEvenCols)
    .flat()
    .reduce((sum, profit) => sum + profit, 0)

  printTest(
    oddEvenReverseSum,
    73,
    'Even rows, odd columns and vise versa sum test (functional)',
  )
}
