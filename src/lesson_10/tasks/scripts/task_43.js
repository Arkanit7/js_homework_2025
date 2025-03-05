/** Print to the console if the given value is what is expected */
function printTest(expect, toBe) {
  if (expect === toBe) console.info('Test passed')
  else console.error(`Expected: ${toBe}, but got: ${expect}.`)
}

/**
 * @param {number} length
 * @param {number} firstNumber
 * @param {number} difference
 * @returns {number[]}
 */
function createArithmeticProgression(length, firstElement, difference) {
  const arithmeticProgression = []

  for (let i = 0; i < length; i++)
    arithmeticProgression.push(firstElement + i * difference)

  return arithmeticProgression
}

/**
 * @param {number} length
 * @param {number} firstNumber
 * @param {number} commonRatio
 * @returns {number[]}
 */
function createGeometricProgression(length, firstNumber, commonRatio) {
  const progression = [firstNumber]

  for (let i = 1; i < length; i++) {
    progression[i] = progression[i - 1] * commonRatio
  }

  return progression
}

// =============================================================================

/**
 * @param {number[]} array
 * @returns {boolean}
 */
function isProgression(array) {
  if (array.length < 3)
    throw new Error('Array must include more than two elements.')

  // No need to check for the zero progression as it's valid arithmetic progression.
  const commonRatio = array[0] === 0 ? 0 : array[1] / array[0]
  const isGeometric = array.every(
    (item, i, arr) => commonRatio === item / arr[i - 1] || i === 0,
  )

  const difference = array[1] - array[0]
  const isArithmetic = array.every(
    (item, i, arr) => difference === item - arr[i - 1] || i === 0,
  )

  return isArithmetic || isGeometric
}

printTest(isProgression(createArithmeticProgression(7, 4, 3)), true)
printTest(isProgression(createGeometricProgression(7, 4, 3)), true)
printTest(isProgression([3, 2, 1]), true)
printTest(isProgression([7, 4, 2]), false)
printTest(isProgression([2, 8, 4]), false)
printTest(isProgression([2, 2, 4, 4]), false)
printTest(isProgression([2, 2, 2]), true)
printTest(isProgression([0, 0, 0]), true)
