/**
 * Returns an array filed with random numbers
 *
 * @param {number} length
 * @param {number} [minNumber=1]
 * @param {number} [maxNumber=5]
 * @returns {number[]}
 */
function getRandomNumbersArray(length, minNumber = 1, maxNumber = 5) {
  const gradesArray = []

  for (let i = 0; i < length; i++) {
    const grade =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    gradesArray.push(grade)
  }

  return gradesArray
}

/**
 * Get comparison function based on the comparison type
 *
 * @param {'less'|'more'|'equal'} comparisonType
 * @returns {(a: any, b: any) => boolean}
 * @throws Error if the comparison type is invalid
 */
function getComparator(comparisonType) {
  let comparator

  switch (comparisonType) {
    case 'less':
      comparator = (a, b) => a < b
      break
    case 'more':
      comparator = (a, b) => a > b
      break
    case 'equal':
      comparator = (a, b) => a === b
      break
    default:
      throw new Error('Invalid comparator name')
  }

  return comparator
}

/**
 * Get all indexes that evaluate to true using the specified comparison type
 *
 * @param {any[]} array Array to filter
 * @param {'less'|'more'|'equal'} comparisonType
 * @param {any} comparable Value to compare with
 * @returns {number[]} Returns index + 1
 */
function getComparedEntryIndexes(array, comparisonType, comparable) {
  const indexes = []
  const isCompared = getComparator(comparisonType)

  for (let i = 0; i < array.length; i++) {
    if (isCompared(array[i], comparable)) indexes.push(i + 1)
  }

  return indexes
}

function getMaxNumber(numbersArray) {
  let maxNumber = -Infinity

  for (let i = 0; i < numbersArray.length; i++) {
    maxNumber = Math.max(maxNumber, numbersArray[i])
  }

  return maxNumber
  // return Math.max(...numbersArray)
}

function getMinNumber(numbersArray) {
  let minNumber = Infinity

  for (let i = 0; i < numbersArray.length; i++) {
    minNumber = Math.min(minNumber, numbersArray[i])
  }

  return minNumber
  // return Math.min(...numbersArray)
}

/**
 * Get a portion of the original array
 *
 * @param {any[]} array
 * @param {number} from from where slice
 * @param {number} to to where slice
 * @returns {any[]}
 */
function sliceArray(array, from, to) {
  const slicedArray = []

  for (let i = from; i < to; i++) {
    slicedArray.push(array[i])
  }

  return slicedArray
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function getArraySum(array) {
  let sum = 0

  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }

  return sum
}

try {
  const visitorsAmountList = getRandomNumbersArray(7, 0, 40)
  const lowVisitorsDays = getComparedEntryIndexes(
    visitorsAmountList,
    'less',
    20,
  )

  const maxVisitors = getMaxNumber(visitorsAmountList)
  const maxVisitorsDays = getComparedEntryIndexes(
    visitorsAmountList,
    'equal',
    maxVisitors,
  )

  const minVisitors = getMinNumber(visitorsAmountList)
  const minVisitorsDays = getComparedEntryIndexes(
    visitorsAmountList,
    'equal',
    minVisitors,
  )

  const visitorsAmountOnWeekdaysList = sliceArray(visitorsAmountList, 0, 5)
  const visitorsAmountOnWeekdays = getArraySum(visitorsAmountOnWeekdaysList)

  const visitorsAmountOnWeekendsList = sliceArray(visitorsAmountList, 5, 7)
  const visitorsAmountOnWeekends = getArraySum(visitorsAmountOnWeekendsList)

  document.write(
    `<p>Кількість відвідувачів по днях (1-7): ${visitorsAmountList}`,
  )
  document.write(`<p>Дні, коли відвідувачів було менше 20: ${lowVisitorsDays}`)
  document.write(
    `<p>Дні, коли кількість відвідувачів була найбільшою: ${maxVisitorsDays}`,
  )
  document.write(
    `<p>Дні, коли кількість відвідувачів була найменшою: ${minVisitorsDays}`,
  )
  document.write(
    `<p>Кількість відвідувачів у робочі дні: ${visitorsAmountOnWeekdays}`,
  )
  document.write(
    `<p>Кількість відвідувачів у вихідні дні: ${visitorsAmountOnWeekends}`,
  )
} catch (error) {
  console.log(error)
}
