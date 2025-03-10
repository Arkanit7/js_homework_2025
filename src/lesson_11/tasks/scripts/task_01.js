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
{
  let secondQuarterSum = 0
  const halfOfRows = testTable.length / 2

  for (let rowIndex = 0; rowIndex < halfOfRows; rowIndex++) {
    const halfOfCols = testTable[rowIndex].length / 2

    for (let colIndex = 0; colIndex < halfOfCols; colIndex++)
      secondQuarterSum += testTable[rowIndex][colIndex]
  }

  document.write('<li>' + secondQuarterSum)
  printTest(secondQuarterSum, 31, 'Second quarter sum test (imperative)')
}
{
  const secondQuarterSum = testTable
    .slice(0, Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(0, Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit)

  printTest(secondQuarterSum, 31, 'Second quarter sum test (functional)')
}

// 2. номери рядків від 0 до половини, стовпці від половини до кінця;
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

  document.write('<li>' + firstQuarterSum)
  printTest(firstQuarterSum, 27, 'First quarter sum test (imperative)')
}
{
  const firstQuarterSum = testTable
    .slice(0, Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit)

  printTest(firstQuarterSum, 27, 'First quarter sum test (functional)')
}

// 3. номери рядків від половини до кінця, стовпці від 0 до половини;
{
  let thirdQuarterSum = 0

  const halfOfRows = Math.floor(testTable.length / 2)

  for (let rowIndex = halfOfRows; rowIndex < testTable.length; rowIndex++) {
    const halfOfCols = testTable[rowIndex].length / 2

    for (let colIndex = 0; colIndex < halfOfCols; colIndex++)
      thirdQuarterSum += testTable[rowIndex][colIndex]
  }

  document.write('<li>' + thirdQuarterSum)
  printTest(thirdQuarterSum, 40, 'Third quarter sum test (imperative)')
}
{
  const thirdQuarterSum = testTable
    .slice(Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(0, Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit)

  printTest(thirdQuarterSum, 40, 'Third quarter sum test (functional)')
}

// 4. номери рядків від половини до кінця, стовпці від половини до кінця;
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

  document.write('<li>' + fourthQuarterSum)
  printTest(fourthQuarterSum, 43, 'Fourth quarter sum test (imperative)')
}
{
  const firstQuarterSum = testTable
    .slice(Math.floor(testTable.length / 2))
    .flatMap((row) => row.slice(Math.floor(row.length / 2)))
    .reduce((sum, profit) => sum + profit)

  printTest(firstQuarterSum, 43, 'First quarter sum test (functional)')
}

// 5. суму парних рядків;
// Option 1
{
  let evenRowsSum = 0

  for (let rowIndex = 0; rowIndex < testTable.length; rowIndex += 2) {
    evenRowsSum += testTable[rowIndex].reduce((sum, item) => sum + item)
  }

  document.write('<li>' + evenRowsSum)
  printTest(evenRowsSum, 74, 'Even rows sum test (imperative)')
}
{
  const evenRowsSum = testTable
    .filter((_, rowIndex) => rowIndex % 2 === 0)
    .flat()
    .reduce((sum, profit) => sum + profit)

  printTest(evenRowsSum, 74, 'Even rows sum test (functional)')
}

// 6. суму непарних стовпців;
{
  let oddColsSum = 0

  for (const row of testTable)
    for (let i = 1; i < row.length; i += 2) oddColsSum += row[i]

  document.write('<li>' + oddColsSum)
  printTest(oddColsSum, 66, 'Odd columns sum test (imperative)')
}
{
  const evenRowsSum = testTable
    .flatMap((row) => row.filter((_, colIndex) => colIndex % 2))
    .reduce((sum, profit) => sum + profit)

  printTest(evenRowsSum, 66, 'Odd columns sum test (functional)')
}

// 7. у парних рядках – непарні стовпці, у непарних – парні.
{
  let oddEvenReverseSum = 0

  testTable.forEach((row, rowIndex) => {
    for (
      let colIndex = rowIndex % 2 ? 0 : 1;
      colIndex < row.length;
      colIndex += 2
    )
      oddEvenReverseSum += row[colIndex]
  })

  document.write('<li>' + oddEvenReverseSum)
  printTest(
    oddEvenReverseSum,
    73,
    'Even rows, odd columns and vise versa sum test (imperative)',
  )
}
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
    .reduce((sum, profit) => sum + profit)

  printTest(
    oddEvenReverseSum,
    73,
    'Even rows, odd columns and vise versa sum test (functional)',
  )
}
