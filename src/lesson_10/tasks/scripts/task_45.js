/** Print to the console if the given value is what is expected */
function printTest(expect, toBe) {
  if (expect === toBe) console.info('Test passed')
  else console.error(`Expected: ${toBe}, but got: ${expect}.`)
}

// =============================================================================

/**
 * @param {any[]} array
 * @returns {number}
 */
function countSignChange(array) {
  // return new Set(array).size

  return array.reduce((unique, item) => {
    if (!unique.includes(item)) unique.push(item)

    return unique
  }, []).length
}

printTest(countSignChange([1, 2, 3, 4]), 4)
printTest(countSignChange([4, 3, 2, 1]), 4)
printTest(countSignChange([1, 3, 2, 1]), 3)
printTest(countSignChange([1, 1]), 1)
printTest(countSignChange([1, 2]), 2)
printTest(countSignChange([1, 1, 2, 2]), 2)
printTest(countSignChange([1, 2, 2, 3]), 3)
printTest(countSignChange([2, 2, 2, 2]), 1)
printTest(countSignChange(['cat', 'cat']), 1)
printTest(countSignChange(['cat', 'kitty']), 2)
printTest(countSignChange(['cat']), 1)
