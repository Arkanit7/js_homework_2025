// ---
// ✅ AI approved
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
 * Find the smallest neighboring pair.
 * @param {number[]} array - Numbers array.
 * @returns {[number, number]} - The best pair.
 * @throws If the array is too small.
 */
function findSmallestPair(array) {
  if (array.length < 2)
    throw new Error('Array must have at least two elements.')

  let bestPair = [array[0], array[1]]
  let smallestSum = array[0] + array[1]

  for (let i = 2; i < array.length; i++) {
    const sum = array[i - 1] + array[i]

    if (sum < smallestSum) {
      smallestSum = sum
      bestPair = [array[i - 1], array[i]]
    }
  }

  return bestPair
}

const numbers = createRandomNumbersArray(14, -9, 9)
const [firstNum, secondNum] = findSmallestPair(numbers)

document.write(`<p>Масив: [${numbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${firstNum}, ${secondNum}.</p>`)
