// ## Option 1

/**
 * @param {any[]} array
 * @returns {number}
 */
function findMaxCountElement(array) {
  const counter = {}
  let maxCount = 0

  array.forEach((item) => {
    if (counter[item] !== undefined) counter[item]++
    else counter[item] = 1

    if (counter[item] > maxCount) maxCount = counter[item]
  })

  return maxCount
}

// ## Option 2 (long)

// /**
//  * @param {any[]} array
//  * @returns {number}
//  */
// function countMaxSame(array) {
//   const sorted = [...array].sort()
//   let pointer = 0
//   let maxSame = 0

//   while (pointer < sorted.length) {
//     const nextPointer = sorted.lastIndexOf(sorted[pointer]) + 1
//     const same = nextPointer - pointer

//     if (same > maxSame) maxSame = same

//     pointer = nextPointer
//   }

//   return maxSame
// }

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
printTest(findMaxCountElement([4, -3, 2, -1]), 1)
printTest(findMaxCountElement([1, -3, 2, 1]), 2)
printTest(findMaxCountElement([1, 1]), 2)
printTest(findMaxCountElement([2, 2, 2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0]), 6)
printTest(findMaxCountElement([1]), 1)
printTest(findMaxCountElement([-1, -1, -2, -2]), 2)
printTest(findMaxCountElement([true, true, -1, -2]), 2, 'Boolean test')
printTest(findMaxCountElement([1, 0, 2, 0]), 2)
printTest(findMaxCountElement([0, 0, 2, 2, 2, 1]), 3)
printTest(
  findMaxCountElement([
    'cat',
    'meow',
    'cat',
    'kitty',
    'love',
    'cat',
    'paw',
    2,
    false,
  ]),
  3,
)
