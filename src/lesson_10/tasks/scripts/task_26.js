/**
 * Create a new array filled with random numbers.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length - Length of the new array
 * @param {number} minNumber - Minimal random number
 * @param {number} maxNumber - Maximal random number
 * @returns {number[]} - Random numbers array
 * @throws Throws an error if the input consists of non-finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({length}, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

// =============================================================================

function calcSum(array) {
  let sum = 0
  let hasEven = false

  for (const number of array) {
    if (number % 2 === 0) {
      hasEven = true
      break
    }

    sum += number
  }

  if (!hasEven) sum -= array.at(0) + array.at(-1)

  return sum
}

const randomNumbers = createRandomNumbersArray(7, 0, 9)
const specificSum = calcSum(randomNumbers)

document.write(`<p>Масив: [${randomNumbers.join(', ')}]</p>`)
document.write(`<p>Сума: ${specificSum}`)
