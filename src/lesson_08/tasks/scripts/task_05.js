/**
 * Returns an array filled with random numbers
 *
 * @param {number} length
 * @param {number} [minNumber=1]
 * @param {number} [maxNumber=5]
 * @returns {number[]}
 */
function getRandomNumbersArray(length, minNumber = 1, maxNumber = 5) {
  const randomNumbersArray = []

  for (let i = 0; i < length; i++) {
    const randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    randomNumbersArray.push(randomNumber)
  }

  return randomNumbersArray
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
 * Count if any given number matches a number in the array
 *
 * @param {any[]} toCheckArray
 * @param {'less'|'more'|'equal'} comparisonType
 * @param {...any} toMatchArray
 * @returns {number}
 */
function countComparedMatches(toCheckArray, comparisonType, ...toMatchArray) {
  let counter = 0
  const isCompared = getComparator(comparisonType)

  for (let i = 0; i < toCheckArray.length; i++) {
    const toCheck = toCheckArray[i]

    for (let j = 0; j < toMatchArray.length; j++) {
      if (isCompared(toCheck, toMatchArray[j])) counter++
    }
  }

  return counter
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function getAverage(array) {
  let sum = 0

  for (let i = 0; i < array.length; i++) {
    sum += array[i]
  }

  return sum / array.length
}

try {
  const learnerGrades = getRandomNumbersArray(12)
  const twoGradesAmount = countComparedMatches(learnerGrades, 'equal', 2)
  const goodGradesAmount = countComparedMatches(learnerGrades, 'equal', 4, 5)
  const averageGrade = getAverage(learnerGrades)
  const loverThanAverageAmount = countComparedMatches(
    learnerGrades,
    'less',
    averageGrade,
  )

  document.write(`<p>Оцінки: ${learnerGrades};`)
  document.write(`<p>Середній бал: ${averageGrade.toFixed(2)};`)
  document.write(`<p>Двійок: ${twoGradesAmount};`)
  document.write(`<p>Хороших оцінки: ${goodGradesAmount};`)
  document.write(`<p>Оцінок нижчих за середнє: ${loverThanAverageAmount}.`)
} catch (error) {
  console.log(error)
}
