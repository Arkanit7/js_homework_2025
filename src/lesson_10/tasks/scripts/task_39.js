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
 * Find the smallest neighboring sequence.
 * @param {number[]} array - Numbers array.
 * @param {number} sequenceAmount - Amount of neighboring elements.
 * @returns {number[]} - The best sequence.
 * @throws If the array is too small.
 */
function findBiggestSequence(array, sequenceAmount) {
  if (array.length < sequenceAmount)
    throw new Error(`Array must have at least ${sequenceAmount} elements.`)

  let bestSequence = array.slice(0, sequenceAmount)
  let biggestSum = bestSequence.reduce((sum, item) => sum + item)

  // Even though it starts from "i + 1", it excludes element "i + 1" from the calculation. It requires that "i" can bee equal to the length.
  for (let i = sequenceAmount + 1; i <= array.length; i++) {
    const pair = array.slice(i - sequenceAmount, i)
    const sum = pair.reduce((sum, item) => sum + item)

    if (sum > biggestSum) {
      biggestSum = sum
      bestSequence = pair
    }
  }

  return bestSequence
}

const numbers = createRandomNumbersArray(14, -9, 9)
const triplet = findBiggestSequence(numbers, 3)

document.write(`<p>Масив: [${numbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${triplet}.</p>`)
