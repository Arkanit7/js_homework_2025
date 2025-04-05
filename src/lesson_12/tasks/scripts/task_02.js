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

  return Array.from({length}, () => {
    return generateRandomNumber(minNumber, maxNumber)
  })
}

// =============================================================================

// ## ⚙️ Solution

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
 * Sorts an array using the cocktail shaker sort algorithm.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {[number, number]} - An array containing two elements: the number of comparisons and the number of exchanges made during the sort.
 */
function cocktailSort(arr) {
  let exchanges = 0
  let comparisons = 0

  let left = 0
  let right = arr.length - 1

  while (left < right) {
    let newRight = 0

    for (let i = left; i < right; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1)
        newRight = i
        exchanges++
      }
      comparisons++
    }

    right = newRight

    // ---

    let newLeft = arr.length - 1

    for (let i = right; i > left; i--) {
      if (arr[i - 1] > arr[i]) {
        swap(arr, i - 1, i)
        newLeft = i
        exchanges++
      }
      comparisons++
    }

    left = newLeft
  }

  return [comparisons, exchanges]
}

const numbersList = generateNumbersArray(30, -99, 99)

document.write(`<p>Масив: [${numbersList.join(', ')}]`)

const [cocktailComparisons, cocktailExchanges] = cocktailSort(numbersList)

document.write(`<p>Посортований масив: [${numbersList.join(', ')}]`)
document.write(`<p>Порівнянь: ${cocktailComparisons}`)
document.write(`<p>Обмінів: ${cocktailExchanges}`)
