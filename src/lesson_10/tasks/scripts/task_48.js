/**
 * @param {number[]} array - Array of integers
 * @returns {number} Most frequent item
 * @throws {Error} If empty array
 */
function findMaxCountElement(array) {
  if (array.length < 1) throw new Error('Empty array.')

  const counts = {}
  let maxCount = 0
  let mostFrequent = array[0]

  array.forEach((item) => {
    counts[item] = (counts[item] ?? 0) + 1

    if (counts[item] > maxCount) {
      maxCount = counts[item]
      mostFrequent = item
    }
  })

  return mostFrequent
}

// =============================================================================

// ## 🧪 Tests

/**
 * Asserts that the actual value equals the expected value.
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} message - Optional test message.
 */
function printTest(expect, toBe, message = 'Test') {
  if (expect === toBe) console.info(`${message} passed`)
  else
    console.error(`${message} failed. Expected: ${toBe}, but got: ${expect}.`)
}

printTest(findMaxCountElement([1, 2, 3, 4]), 1)
printTest(findMaxCountElement([1, 1, 3, 4]), 1)
printTest(findMaxCountElement([6, 5, 5, 4, 1, 1, 1, 5, 6, 5, 7, 5, 2]), 5)
