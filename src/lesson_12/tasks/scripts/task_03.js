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
 * Sorts an array using the insertion sort algorithm and counts the number of comparisons and exchanges made.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {[number, number]} - An array containing two elements: the number of comparisons and the number of exchanges made during the sort.
 */
function insertionSort(arr) {
  let exchanges = 0
  let comparisons = 0

  for (let left = 1; left < arr.length; left++) {
    const cachedEl = arr[left]
    let i = left - 1

    while (i >= 0 && arr[i] > cachedEl) {
      arr[i + 1] = arr[i]
      i--
      exchanges++
      comparisons++
    }

    if (i + 1 !== left) {
      arr[i + 1] = cachedEl
      exchanges++
    }
  }

  return [comparisons, exchanges]
}

const [insertionComparisons, insertionExchanges] = insertionSort(numbersList)

document.write(`<p>Масив: [${numbersList.join(', ')}]`)
document.write(`<p>Порівнянь: ${insertionComparisons}`)
document.write(`<p>Обмінів: ${insertionExchanges}`)
