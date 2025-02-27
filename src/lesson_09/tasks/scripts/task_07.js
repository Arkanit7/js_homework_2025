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

const DISCOUNT = 0.3
const DISCOUNT_THRESHOLD = 1000
const pricesArray = createRandomNumbersArray(10, 500, 1500)

document.write(`<p>Оригінальні ціни: ${pricesArray};`)

pricesArray.forEach((price, index, array) => {
  if (price > DISCOUNT_THRESHOLD) array[index] *= 1 - DISCOUNT
})

document.write(`<p>Нові ціни: ${pricesArray.map((price) => price.toFixed(2))}.`)
