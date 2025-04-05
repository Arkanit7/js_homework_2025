// ---
// ✅ AI approved
// ---

/**
 * Creates random numbers array in the given range.
 * @param {number} length - Array length.
 * @param {number} minNumber - Minimal number.
 * @param {number} maxNumber - Maximal number.
 * @returns {number[]} Random numbers array.
 * @throws {Error} If the input consists of non-finite numbers.
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({length}, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

// =============================================================================

/**
 * Counts how many elements equal the sum of the squares of their neighbors
 * and are not the largest element in the array.
 * @param {numbers[]} array - Array of numbers.
 * @returns {number} The counter.
 * @throws {Error} If the array is smaller than 3.
 */
function countElementsEqualToSumOfSquaresOfNeighbors(array) {
  if (array.length < 3) throw new Error('The array is too small.')

  let counter = 0
  const max = array.reduce((max, item) => (item > max ? item : max))

  for (let i = 1; i < array.length - 1; i++) {
    if (array[i] === max) continue
    if (array[i + 1] ** 2 + array[i - 1] ** 2 === array[i]) counter++
  }

  return counter
}

const numbers = createRandomNumbersArray(24, -99, 99)
const counter = countElementsEqualToSumOfSquaresOfNeighbors(numbers)

document.write(`<p>Масив: [${numbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${counter}.</p>`)
