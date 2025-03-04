/**
 * Create a new array filled with random numbers.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length - Length of the new array
 * @param {number} minNumber - Minimal random number
 * @param {number} maxNumber - Maximal random number
 * @returns {number[]} Random numbers array
 * @throws Throws an error if the input consists of non-finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({ length }, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

// =============================================================================

const randomNumbers = createRandomNumbersArray(7, 0, 40)
const maxOddNumberDivisibleBy3 = randomNumbers.reduce(
  (max, item, i) => (item > max && i % 2 && item % 3 === 0 ? item : max),
  -Infinity,
)

document.write(`<p>Масив: [${randomNumbers.join(', ')}];`)
document.write(
  `<p>Результат: ${maxOddNumberDivisibleBy3 === -Infinity ? 'таких елементів немає' : maxOddNumberDivisibleBy3}.`,
)
