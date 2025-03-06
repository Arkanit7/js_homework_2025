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
 * Asserts that the actual value equals the expected value.
 * @param {any} actual - The actual value.
 * @param {any} expected - The expected value.
 * @param {string} message - Optional test message.
 */
function printTest(expect, toBe, message = 'Test') {
  if (expect === toBe) console.info(`${message} passed`)
  else {
    console.error(`${message} failed. Expected: ${toBe}, but got: ${expect}.`)
    console.dir({ expect, toBe })
  }
}

// =============================================================================

/**
 * @param {number[]} array
 * @returns {number}
 */
function getMinItemIndex(array) {
  if (array.length === 0) throw new Error('Array must be no empty.')

  return array.reduce(
    (prevIndex, item, nextIndex, arr) =>
      item < arr[prevIndex] ? nextIndex : prevIndex,
    0,
  )
}

/**
 * @param {number[]} array
 * @returns {number}
 */
function countLocalMax(array) {
  let first = -1
  let second = -1

  for (let i = 0; i < array.length; i++) {
    if (array[i] >= 0) continue

    if (first === -1) first = i
    else {
      second = i
      break
    }
  }

  if (first === -1 || second === -1) return 0

  let sum = 0

  for (let i = first + 1; i < second; i++) {
    sum += array[i]
  }

  return sum
}

const array = createRandomNumbersArray(7, -20, 20, 2)

document.write(`<p>Масив: [${array.join(', ')}];`)
document.write('<p>Індекс мінімального елемента: ' + getMinItemIndex(array))
document.write('<p>Сума: ' + countLocalMax(array).toFixed(2))

// =============================================================================

// ## 🧪 Tests

// printTest(getMinItemIndex([]), -1)
printTest(getMinItemIndex([0]), 0)
printTest(getMinItemIndex([1, 2, 3, 4]), 0)
printTest(getMinItemIndex([1, 2, -3, 4]), 2)
printTest(getMinItemIndex([-1, 22, 4, -3, -41, 0, 5]), 4)

printTest(countLocalMax([1]), 0, 'Test calcSum')
printTest(countLocalMax([-1]), 0, 'Test calcSum')
printTest(countLocalMax([1, 2]), 0, 'Test calcSum')
printTest(countLocalMax([-1, 2]), 0, 'Test calcSum')
printTest(countLocalMax([-1, -2]), 0, 'Test calcSum')
printTest(countLocalMax([-1, 3, -2]), 3, 'Test calcSum')
printTest(countLocalMax([2, -1, 3, 4, 5, -2, 1]), 12, 'Test calcSum')
printTest(
  countLocalMax([-16.25, -11.41, 3.7, 17.83, -14.72, -17.52, -0.52]),
  0,
  'Test calcSum',
)
