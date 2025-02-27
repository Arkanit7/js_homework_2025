/**
 * Create a new array filled with random numbers.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length
 * @param {number} minNumber
 * @param {number} maxNumber
 * @returns {number[]}
 * @throws Gen an error if the input consist of not finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Incorrect arguments.')

  const randomNumbersArray = []

  for (let i = 0; i < length; i++) {
    const randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    randomNumbersArray.push(randomNumber)
  }

  return randomNumbersArray
}

// =============================================================================

/**
 * Calc the product of an array.
 * If no numbers met the condition - return 0.
 * @param {number[]} array
 * @param {(arrEntry: number) => boolean} conditionFn
 * @returns {number}
 */
function calcConditionalProduct(array, conditionFn) {
  let product = 1
  let hasMultiplied = false

  for (const number of array) {
    if (!conditionFn(number)) continue

    product *= number
    hasMultiplied = true
  }

  return hasMultiplied ? product : 0
}

const COMPARE_WITH = 0
const randomArray = createRandomNumbersArray(10, -100, 10)
const product = calcConditionalProduct(
  randomArray,
  (number) => number > COMPARE_WITH,
)

document.write(`<p>Масив: ${randomArray};`)
document.write(`<p>Добуток чисел, більших за ${COMPARE_WITH}: ${product}.`)
