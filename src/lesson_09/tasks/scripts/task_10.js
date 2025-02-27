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

const TAX = 0.2
const priceList = createRandomNumbersArray(10, 100, 5000)
const taxesList = priceList.map((price) => price * TAX)

document.write(`<p>Ціни: ${priceList};`)
document.write(`<p>Податки: ${taxesList.map((tax) => tax.toFixed(2))}.`)
