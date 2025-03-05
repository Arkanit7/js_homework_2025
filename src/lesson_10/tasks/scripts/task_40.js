// ---
// ✅ Debugged
// ---

/**
 * Creates random numbers array in the given range.
 * @param {number} length - Array length.
 * @param {number} minNumber - Minimal number.
 * @param {number} maxNumber - Maximal number.
 * @returns {number[]} Random numbers array.
 * @throws If the input consists of non-finite numbers.
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({ length }, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

// =============================================================================

/**
 * Count all neighboring elements that are not too different.
 * @param {numbers[]} array - Array of numbers.
 * @param {number} - Difference between elements.
 * @returns {number} - The counter.
 * @throws If the array is too small.
 */
function countDifferent(array, difference = 0.5) {
  if (array.length < 3) throw new Error('The array is too small.')

  let counter = 0

  for (let i = 1; i < array.length - 1; i++) {
    const threshold = Math.abs(array[i - 1] * difference)

    if (Math.abs(array[i + 1] - array[i - 1]) > threshold) counter++
  }

  return counter
}

const numbers = createRandomNumbersArray(7, 0, 20)
const counter = countDifferent(numbers)

document.write(`<p>Масив: [${numbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${counter}.</p>`)
