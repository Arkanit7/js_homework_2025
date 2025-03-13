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

/**
 * Create markup which highlight items in an array at the given indexes using the chosen color.
 *
 * @param {Array} array - The array to create markup from.
 * @param {string} color - A color which use to highlight indexes.
 * @param  {...number} indexes - The array of indexes to highlight.
 * @returns {string} The string representing array markup.
 */
function createComparisonStage(array, color, ...indexes) {
  let html = '<div class="c-steps__array">'

  for (let i = 0; i < array.length; i++) {
    let className = ''

    if (indexes.includes(i)) {
      className = `u-border-2 u-border-dashed u-border-${color}-500`
    }

    html += `
    <div class="c-steps__item">
      <div class="c-steps__number ${className}">
        ${array[i]}
      </div>
    </div>`
  }

  return (html += '</div>')
}

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
 * Sorts a copy of the array and get markup representing taken steps.
 *
 * @param {Array} arr - The array to sort.
 * @returns {string} - The markup.
 */
function createBubleSortScheme(arr) {
  let html = `
    <div>
      <h3 class="u-text-center">Bubble Sort</h3>
      <div
        class="c-steps"
        style="
          grid-template-columns: repeat(${arr.length}, auto);
        "
      >
  `

  const arrCopy = [...arr]
  let right = arrCopy.length - 1

  while (right >= 1) {
    let newRight = 0

    for (let i = 1; i <= right; i++) {
      html += createComparisonStage(arrCopy, 'red', i, i - 1)

      if (arrCopy[i] < arrCopy[i - 1]) {
        swap(arrCopy, i, i - 1)
        newRight = i
        html += createComparisonStage(arrCopy, 'blue', i, i - 1)
      }
    }

    right = newRight
  }

  return (html += '</div></div>')
}

/**
 * Sorts a copy of the array and get markup representing taken steps.
 *
 * @param {Array} arr - The array to sort.
 * @returns {string} - The markup.
 */
function createCocktailSortScheme(arr) {
  let html = `
    <div>
      <h3 class="u-text-center">Cocktail Sort</h3>
      <div
        class="c-steps"
        style="
          grid-template-columns: repeat(${arr.length}, auto);
        "
      >
  `

  const arrCopy = [...arr]
  let left = 0
  let right = arrCopy.length - 1

  while (left < right) {
    let newRight = 0

    for (let i = left; i < right; i++) {
      html += createComparisonStage(arrCopy, 'red', i, i + 1)

      if (arrCopy[i] > arrCopy[i + 1]) {
        swap(arrCopy, i, i + 1)
        newRight = i
        html += createComparisonStage(arrCopy, 'blue', i, i + 1)
      }
    }

    right = newRight

    // ---

    let newLeft = arrCopy.length - 1

    for (let i = right; i > left; i--) {
      html += createComparisonStage(arrCopy, 'red', i, i - 1)

      if (arrCopy[i - 1] > arrCopy[i]) {
        swap(arrCopy, i - 1, i)
        newLeft = i
        html += createComparisonStage(arrCopy, 'blue', i, i - 1)
      }
    }

    left = newLeft
  }

  return (html += '</div></div>')
}

/**
 * Sorts a copy of the array and get markup representing taken steps.
 *
 * @param {Array} arr - The array to sort.
 * @returns {string} - The markup.
 */
function createInsertionSortScheme(arr) {
  let html = `
    <div>
      <h3 class="u-text-center">Insertion Sort</h3>
      <div
        class="c-steps"
        style="
          grid-template-columns: repeat(${arr.length}, auto);
        "
      >
  `

  const arrCopy = [...arr]

  for (let left = 1; left < arrCopy.length; left++) {
    const cachedEl = arrCopy[left]
    let i = left - 1

    html += createComparisonStage(arrCopy, 'red', left)

    while (i >= 0 && arrCopy[i] > cachedEl) {
      arrCopy[i + 1] = arrCopy[i]
      html += createComparisonStage(arrCopy, 'blue', i, i + 1)
      i--
    }

    if (i + 1 !== left) {
      arrCopy[i + 1] = cachedEl
      html += createComparisonStage(arrCopy, 'blue', i + 1)
    }
  }

  return (html += '</div></div>')
}

/**
 * Generates a markup for a comparison table based on the provided array and sorting schemes.
 *
 * @param {Array} arr - The array of items to be compared and displayed.
 * @param {...Function} sortingSchemeFn - One or more functions that define the sorting schemes. Each function should take the array as an argument and return an HTML string representing a sorted section of the table.
 * @returns {string} The generated HTML string for the comparison table.
 */
function createComparisonTable(arr, ...sortingSchemeFn) {
  return `
    <div class="u-flex u-gap-600 u-overflow-auto u-pbe-400">
      ${sortingSchemeFn.map((sortingFn) => sortingFn(arr)).join('')}
    </div>
  `
}

const numbersList = generateNumbersArray(5, -188, 188)
const comparisonTable = createComparisonTable(
  numbersList,
  createBubleSortScheme,
  createCocktailSortScheme,
  createInsertionSortScheme,
)

document.write(comparisonTable)
