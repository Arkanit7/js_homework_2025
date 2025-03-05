/** Print to the console if the given value is what is expected */
function printTest(expect, toBe) {
  if (expect === toBe) console.info('Test passed')
  else console.error(`Expected: ${toBe}, but got: ${expect}.`)
}

// =============================================================================

/**
 * @param {number[]} array
 * @returns {number}
 */
function countSignChange(array) {
  return array.reduce(
    (count, item, i, arr) =>
      i === 0 || Math.sign(item) === Math.sign(arr[i - 1]) ? count : count + 1,
    0,
  )
}

// 🧪 Tests

printTest(countSignChange([1, 2, 3, 4]), 0)
printTest(countSignChange([4, -3, 2, -1]), 3)
printTest(countSignChange([1, -3, 2, 1]), 2)
printTest(countSignChange([1, 1]), 0)
printTest(countSignChange([1, 2]), 0)
printTest(countSignChange([1]), 0)
printTest(countSignChange([-1, -1, -2, -2]), 0)
printTest(countSignChange([1, 0, 2, 0]), 3)
printTest(countSignChange([0, 0, 2, 2]), 1)
