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

  return Array.from({ length }, () => {
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
 * Create integer-filled array, made by the user.
 * @param {number} length - Amount of inputs.
 * @returns {number[]}
 */
function promptUserList(length) {
  if (length < 1) throw new Error('The length must be more than 1.')

  const userList = []

  for (let i = 0; i < length; i++) {
    userList.push(parseInt(prompt(`Введіть число №${i}`, '')))
  }

  return userList
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function countLocalMax(array) {
  if (array.length < 1) return 0

  return array.reduce(
    (count, item, i, arr) =>
      item <= arr[i - 1] || item <= arr[i + 1] ? count : count + 1,
    0,
  )
}

const length = parseInt(prompt('Введіть кількість чисел:', '3'))

try {
  const userArray = promptUserList(length)
  const localMaxAmount = countLocalMax(userArray)

  document.write(`<p>Масив: [${userArray.join(', ')}];`)
  document.write(`<p>Кількість локальних максимумів: ${localMaxAmount}.`)
} catch (error) {
  document.write(error.message)
}

// =============================================================================

// ## 🧪 Tests

printTest(countLocalMax([1]), 1)
printTest(countLocalMax([1, 1]), 0)
printTest(countLocalMax([11, -2, 31]), 2)
printTest(countLocalMax([11, 0, 31]), 2)
printTest(countLocalMax([1, 2, 9]), 1)
printTest(countLocalMax([1, 9, 1]), 1)
printTest(countLocalMax([1, 9, 1, 4, 2, 9, 7]), 3)
