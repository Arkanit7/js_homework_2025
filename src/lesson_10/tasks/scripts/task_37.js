// ---
// ✅ AI approved
// ---

/**
 * Creates random numbers array in the given range.
 * @param {number} length - Length of the array
 * @param {number} minNumber - Minimal number
 * @param {number} maxNumber - Maximal number
 * @returns {number[]} Random numbers array
 * @throws If the input consists of non-finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({ length }, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

// =============================================================================

// ## Option 1 (fast)

/**
 * Find two numbers from the array that have the closest sum to the target number
 * @param {number[]} array - Array of numbers to pick numbers from
 * @param {number} target - The number to which the sum should be closest
 * @param {boolean} [inPlace] - If you may sort the array in place then say true
 * @returns {[number, number] | null}
 * @remarks Time complexity: O(log n) - Logarithmic time complexity.
 * @throws If the array has less than 2 elements
 */
function findClosestPair(array, target, inPlace = false) {
  if (array.length < 2)
    throw new Error('Array must have at least two elements.')

  const sortedArray = inPlace
    ? array.sort((a, b) => a - b)
    : [...array].sort((a, b) => a - b)

  let [leftPointer, rightPointer] = [0, sortedArray.length - 1]

  let minDelta = Infinity
  let bestPair = null

  while (leftPointer < rightPointer) {
    const sum = sortedArray[leftPointer] + sortedArray[rightPointer]
    const delta = Math.abs(sum - target)

    if (delta < minDelta) {
      minDelta = delta
      bestPair = [sortedArray[leftPointer], sortedArray[rightPointer]]
    }

    if (sum > target) rightPointer--
    else if (sum < target) leftPointer++
    else break
  }

  return bestPair
}

const targetNumber = Math.floor(Math.random() * 40)
const randomNumbers = createRandomNumbersArray(7, 0, 40)
const [firstNum, secondNum] = findClosestPair(randomNumbers, targetNumber)

document.write(`<p>Число p: ${targetNumber};</p>`)
document.write(`<p>Масив: [${randomNumbers.join(', ')}];</p>`)
document.write(`<p>Результат: ${firstNum}, ${secondNum}.</p>`)

// =============================================================================

// ## Option 2 (brute force)

// /**
//  * Find two numbers from the array that have the closest sum to the targe number
//  * @param {number[]} array - Array of numbers to pick numbers from
//  * @param {number} closeTo - Numbers must sum as close as possible to this
//  * @returns {[number, number]}
//  */
// function findClosestPair(array, closeTo) {
//   let closestNumber1, closestNumber2
//   let delta = Infinity

//   array.forEach((number, i, arr) => {
//     for (let j = i + 1; j < arr.length; j++) {
//       const currentDelta = Math.abs(arr[j] + number - closeTo)

//       if (currentDelta >= delta) continue

//       delta = currentDelta
//       ;[closestNumber1, closestNumber2] = [arr[j], number]
//     }
//   })

//   return [closestNumber1, closestNumber2]
// }

// const targetNumber = Math.floor(Math.random() * 40)
// const randomNumbers = createRandomNumbersArray(7, 0, 40)
// const [firstNum, secondNum] = findClosestPair(
//   randomNumbers,
//   targetNumber,
// )

// document.write(`<p>Число p: ${targetNumber};`)
// document.write(`<p>Масив: [${randomNumbers.join(', ')}];`)
// document.write(`<p>Результат: ${firstNum}, ${secondNum}.`)
