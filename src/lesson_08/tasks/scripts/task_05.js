/**
 * Returns an array filled with random numbers
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
 * Count if any given number matches a number in the array
 *
 * @param {any[]} toCheckArray
 * @param {...any} toMatchArray
 * @returns {number}
 */
function countMatches(toCheckArray, ...toMatchArray) {
  let counter = 0

  for (let i = 0; i < toCheckArray.length; i++) {
    const toCheck = toCheckArray[i]

    for (let j = 0; j < toMatchArray.length; j++) {
      if (toCheck === toMatchArray[j]) counter++
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

/**
 * @param {number[]} toCheckArray
 * @param {number} lesserThan
 * @returns {number}
 */
function countLesserThan(toCheckArray, lesserThan) {
  let counter = 0

  for (let i = 0; i < toCheckArray.length; i++) {
    if (toCheckArray[i] < lesserThan) counter++
  }

  return counter
}

const learnerGrades = getRandomNumbersArray(12)
const twoGradesAmount = countMatches(learnerGrades, 2)
const goodGradesAmount = countMatches(learnerGrades, 4, 5)
const averageGrade = getAverage(learnerGrades)
const loverThanAverageAmount = countLesserThan(learnerGrades, averageGrade)

document.write(`<p>Оцінки: ${learnerGrades};`)
document.write(`<p>Середній бал: ${averageGrade.toFixed(2)};`)
document.write(`<p>Двійок: ${twoGradesAmount};`)
document.write(`<p>Хороших оцінки: ${goodGradesAmount};`)
document.write(`<p>Оцінок нижчих за середнє: ${loverThanAverageAmount}.`)
