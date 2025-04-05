// ---
// ✅ Tested
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

/** Print to the console if the given value is what is expected */
function printTest(expect, toBe) {
  if (expect === toBe) console.info('Test passed')
  else console.error(`Expected: ${toBe}, but got: ${expect}.`)
}

// =============================================================================

/**
 * Test wether the array has all numbers from 1 to it length
 * @param {number[]} array - The array
 * @returns {boolean}
 */
function hasAllNumbers(array) {
  if (!array.length) throw new Error('The array must be not empty.')

  const from = 0
  const to = array.length
  let has = true
  const numbers = []

  for (let i = from; i < to; i++) {
    const number = array[i]

    if (to < number || number < from || numbers.includes(number)) {
      has = false
      break
    }

    numbers.push(number)
  }

  return has
}

const numbers = createRandomNumbersArray(7, 0, 9)
const counter = hasAllNumbers(numbers)

printTest(hasAllNumbers([1, 2]), true)
printTest(hasAllNumbers([1]), true)
printTest(hasAllNumbers([2]), false)
printTest(hasAllNumbers([1, 2, 3, 4, 4]), false)
printTest(hasAllNumbers([3, 2, 1]), true)
printTest(hasAllNumbers([3, 1, 2]), true)

document.write(`<p>Масив: [${numbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${counter}.</p>`)
