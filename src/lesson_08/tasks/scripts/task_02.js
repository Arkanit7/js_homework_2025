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

function getIndexesOfNumbersLesserThan(numbersArray, lesserThan = 20) {
  const lesserNumbersIndexesArray = []

  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i]

    if (number < lesserThan) lesserNumbersIndexesArray.push(i + 1)
  }

  return lesserNumbersIndexesArray
}

/**
 * Returns index + 1
 *
 * @param {number[]} numbersArray
 * @returns {number[]}
 */
function getIndexesOfMaxNumbers(numbersArray) {
  const maxNumberIndexesArray = []
  let maxNumber = -Infinity
  // determine the max number in the array
  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i]

    maxNumber = Math.max(maxNumber, number)
  }

  // get indexes of all elements that are max numbers
  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i]

    if (number === maxNumber) maxNumberIndexesArray.push(i + 1)
  }

  return maxNumberIndexesArray
}

/**
 * Returns index + 1
 *
 * @param {number[]} numbersArray
 * @returns {number[]}
 */
function getIndexesOfMinNumbers(numbersArray) {
  const minNumberIndexesArray = []
  let minNumber = Infinity

  // determine the min number in the array
  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i]

    minNumber = Math.min(minNumber, number)
  }

  // get indexes of all elements that are min numbers
  for (let i = 0; i < numbersArray.length; i++) {
    const number = numbersArray[i]

    if (number === minNumber) minNumberIndexesArray.push(i + 1)
  }

  return minNumberIndexesArray
}

/**
 * @param {any[]} array
 * @param {number} from
 * @param {number} to
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

const visitorsAmountList = getRandomNumbersArray(7, 0, 40)
const lowVisitorsDays = getIndexesOfNumbersLesserThan(visitorsAmountList)
const maxVisitorsDays = getIndexesOfMaxNumbers(visitorsAmountList)
const minVisitorsDays = getIndexesOfMinNumbers(visitorsAmountList)
const visitorsAmountOnWeekdaysList = sliceArray(visitorsAmountList, 0, 5)
const visitorsAmountOnWeekdays = getArraySum(visitorsAmountOnWeekdaysList)
const visitorsAmountOnWeekendsList = sliceArray(visitorsAmountList, 5, 7)
const visitorsAmountOnWeekends = getArraySum(visitorsAmountOnWeekendsList)

document.write(`<p>Кількість відвідувачів по днях (1-7): ${visitorsAmountList}`)
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
