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
 * @param {any[]} array
 * @param {(entry: number) => boolean} conditionFn
 * @returns {any[]}
 */
function filterArray(array, conditionFn) {
  const filtered = []

  for (const entry of array) {
    if (conditionFn(entry)) filtered.push(entry)
  }

  return filtered
}

const COMPARE_WITH = 100
const numbersArray = createRandomNumbersArray(20, 0, 200)
const filteredArray = filterArray(
  numbersArray,
  (number) => number > COMPARE_WITH,
)

document.write(`<p>Масив: ${numbersArray};`)
document.write(`<p>Елементи, які більші за ${COMPARE_WITH}: ${filteredArray}.`)
