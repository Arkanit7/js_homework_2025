// ## 🧮 Utilities

/**
 * Generates a random integer between the specified minimum and maximum values, inclusive.
 *
 * @param {number} minNumber - The minimum value of the range.
 * @param {number} maxNumber - The maximum value of the range.
 * @returns {number} A random integer between minNumber and maxNumber,
 * inclusive.
 * @throws {Error} If the input consists of non-finite numbers.
 */
function generateRandomNumber(minNumber, maxNumber) {
  if (!isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
}

/**
 * Creates random numbers array in the given range.
 * @param {number} length - Array length.
 * @param {number} minNumber - Minimal number.
 * @param {number} maxNumber - Maximal number.
 * @returns {number[]} Random numbers array.
 * @throws {Error} If the input consists of non-finite numbers.
 */
function generateNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({ length }, () => {
    return generateRandomNumber(minNumber, maxNumber)
  })
}

// =============================================================================

// ## ⚙️ Solution

const numbersList = generateNumbersArray(30, -99, 99)

/**
 * Swaps the elements at the specified positions in the given array.
 *
 * @param {Array} arr - The array in which to swap elements.
 * @param {number} i - The index of the first element to swap.
 * @param {number} j - The index of the second element to swap.
 */
function swap(arr, i, j) {
  ;[arr[i], arr[j]] = [arr[j], arr[i]]
}

/**
 * Sorts an array using the bubble sort algorithm and returns the number of comparisons and exchanges made.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {[number, number]} An array where the first element is the number of comparisons and the second element is the number of exchanges.
 */
function bubleSort(arr) {
  let exchanges = 0
  let comparisons = 0

  let right = arr.length - 1

  while (right >= 1) {
    let newRight = 0

    for (let i = 1; i <= right; i++) {
      if (arr[i] < arr[i - 1]) {
        swap(arr, i, i - 1)
        newRight = i
        exchanges++
      }
      comparisons++
    }

    right = newRight
  }

  return [comparisons, exchanges]
}

const [bubbleComparisons, bubbleExchanges] = bubleSort(numbersList)

document.write(`<p>Масив: [${numbersList.join(', ')}]`)
document.write(`<p>Порівнянь: ${bubbleComparisons}`)
document.write(`<p>Обмінів: ${bubbleExchanges}`)
