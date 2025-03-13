const names = [
  'Thomas',
  'David',
  'Grace',
  'Kate',
  'Frank',
  'Eve',
  'Charlie',
  'Liam',
  'Sophia',
  'Henry',
  'Alice',
  'Jack',
  'Noah',
  'Peter',
  'Olga',
  'Quinn',
  'Mia',
  'Ivy',
  'Ryan',
  'Olivia',
  'Bob',
]

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
 * Sort the array using the selection sort algorithm.
 *
 * @param {Array} arr - The array to sort.
 * @returns {Array} The reference to the same array.
 */
function selectionSort(arr) {
  const right = arr.length - 1

  for (let left = 0; left < right; left++) {
    let minIndex = left

    for (let i = left + 1; i <= right; i++) {
      if (arr[minIndex] > arr[i]) minIndex = i
    }

    if (minIndex !== left) swap(arr, left, minIndex)
  }

  return arr
}

/**
 * Performs binary search in a sorted array.
 *
 * @param {any} searchValue - The value to search for in the array.
 * @param {any[]} arr - The sorted array to search within.
 * @returns {number} The index of the searchValue in the array, or -1 if not found.
 */
function indexOfUsingBinarySearch(searchValue, arr) {
  let index = -1
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const middle = Math.floor((left + right) / 2)

    if (searchValue === arr[middle]) {
      index = middle

      break
    }

    if (searchValue > arr[middle]) left = middle + 1
    else right = middle - 1
  }

  return index
}

selectionSort(names)

const nameToFind = 'Olga'
const indexOfOlga = indexOfUsingBinarySearch(nameToFind, names)

document.write(`<p>Масив: [${names.join(', ')}]`)

if (indexOfOlga === -1)
  document.write(`<p>Масив не містить імені "${nameToFind}".`)
else
  document.write(
    `<p>Ім'я "${nameToFind}" знаходиться під індексом ${indexOfOlga}.`,
  )
