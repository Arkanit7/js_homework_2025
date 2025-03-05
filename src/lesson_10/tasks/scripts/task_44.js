/** Print to the console if the given value is what is expected */
function printTest(expect, toBe) {
  if (expect === toBe) console.info('Test passed')
  else console.error(`Expected: ${toBe}, but got: ${expect}.`)
}

// =============================================================================

/**
 * @param {number[]} array
 * @returns {boolean}
 */
function isAscendingOrDescending(array) {
  if (array.length < 2)
    throw new Error('Array must have more than one elements.')

  const isAscending = array.every(
    (item, i, arr) => i === 0 || item > arr[i - 1],
  )

  const isDescending = array.every(
    (item, i, arr) => i === 0 || item < arr[i - 1],
  )

  return isAscending || isDescending
}

printTest(isAscendingOrDescending([1, 2, 3, 4]), true)
printTest(isAscendingOrDescending([4, 3, 2, 1]), true)
printTest(isAscendingOrDescending([1, 3, 2, 1]), false)
printTest(isAscendingOrDescending([1, 1]), false)
printTest(isAscendingOrDescending([1, 2]), true)
printTest(isAscendingOrDescending([1, 1, 2, 2]), false)
printTest(isAscendingOrDescending([1, 2, 2, 3]), false)
