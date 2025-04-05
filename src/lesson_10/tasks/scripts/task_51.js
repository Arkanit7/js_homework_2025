// ## 🧮 Utilities

/**
 * Creates random numbers array in the given range.
 * @param {number} length - Array length.
 * @param {number} minNumber - Minimal number.
 * @param {number} maxNumber - Maximal number.
 * @param {number} decimalPoints - Number of decimal points to round to.
 * @returns {number[]} Random numbers array.
 * @throws {Error} If the input consists of non-finite numbers.
 */
function createRandomNumbersArray(
  length,
  minNumber,
  maxNumber,
  decimalPoints = 0,
) {
  if (
    !isFinite(length) ||
    !isFinite(minNumber) ||
    !isFinite(maxNumber) ||
    !isFinite(decimalPoints)
  )
    throw new Error('Arguments must be finite numbers.')

  return Array.from({length}, () => {
    const randomNumber = minNumber + Math.random() * (maxNumber - minNumber + 1)
    return Number(randomNumber.toFixed(decimalPoints))
  })
}

/**
 * Deeply compares two elements for equality.
 * @param {any} el1 - First element.
 * @param {any} el2 - Second element.
 * @returns {boolean} - True if equal, false otherwise.
 */
function deepEqual(el1, el2) {
  if (el1 === el2) return true

  if (typeof el1 !== 'object' || typeof el2 !== 'object') {
    return false
  }

  const keys1 = Object.keys(el1)
  const keys2 = Object.keys(el2)

  if (keys1.length !== keys2.length) return false

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(el1[key], el2[key])) {
      return false
    }
  }

  return true
}

/**
 * Asserts that the actual value equals the expected value.
 * @param {any} expected - The expected value.
 * @param {any} toBe - The actual value.
 * @param {string} [message] - Optional test message.
 */
function printTest(expect, toBe, message = 'Test') {
  if (deepEqual(expect, toBe)) console.info(`${message} passed`)
  else {
    console.error(`${message} failed. Expected:`, toBe, ', but got:', expect)
  }
}

// =============================================================================

// ## ⚙️ Solution

/**
 * @param {number[]} array
 * @returns {{first: number, second: number}}
 */
function findTwoMin(array) {
  if (array.length < 2)
    throw new Error('Array must include at least two items.')

  return array.reduce(
    (minimals, item) => {
      if (item < minimals.first) minimals.first = item
      else if (item < minimals.second) minimals.second = item

      return minimals
    },
    {first: Infinity, second: Infinity},
  )
}

const array = createRandomNumbersArray(7, -20, 20, 2)
const {first, second} = findTwoMin(array)

document.write(`<p>Масив: [${array.join(', ')}];`)
document.write(`<p>Два найменші елементи: ${first}, ${second}.`)

// =============================================================================

// ## 🧪 Tests

printTest(findTwoMin([2, 2]), {first: 2, second: 2})
printTest(findTwoMin([-6.89, 13, -1.82, -15.96, -19.06, -2.68, -14.11]), {
  first: -19.06,
  second: -14.11,
})
printTest(findTwoMin([22, 9, 2, 3, 4]), {
  first: 2,
  second: 3,
})
