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
 * Sorts the array by string length using Selection Sort.
 *
 * @param {Array} arr - The array to sort.
 * @returns {Array} The reference to the same array.
 */
function selectionSortByLength(arr) {
  const right = arr.length - 1

  for (let left = 0; left < right; left++) {
    let minIndex = left

    for (let i = left + 1; i <= right; i++) {
      if (arr[minIndex].length > arr[i].length) minIndex = i
    }

    if (minIndex !== left) swap(arr, left, minIndex)
  }

  return arr
}

/**
 * Performs recursive binary search on a sorted array to find the index by string length.
 *
 * @param {number} targetLength - The value to search for in the array.
 * @param {string[]} arr - The sorted array to search within.
 * @param {number} [left] - Left boundary.
 * @param {number} [right] - Right boundary.
 * @returns {number} The index of the searchValue in the array, or -1 if not found.
 */
function findIndexByLength(
  targetLength,
  arr,
  left = 0,
  right = arr.length - 1,
) {
  if (left > right) return -1

  const middle = Math.floor((left + right) / 2)

  if (arr[middle].length === targetLength) return middle

  return arr[middle].length < targetLength
    ? findIndexByLength(targetLength, arr, middle + 1, right)
    : findIndexByLength(targetLength, arr, left, middle - 1)
}

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

document.write(`<p>Масив: [${names.join(', ')}]`)
selectionSortByLength(names)

const lengthToFind = 5
const indexOfName5Chars = findIndexByLength(lengthToFind, names)

document.write(`<p>Посортований масив: [${names.join(', ')}]`)

if (indexOfName5Chars === -1)
  document.write(`<p>Масив не містить імені довжиною ${lengthToFind} символи.`)
else
  document.write(
    `<p>Ім'я довжиною у ${lengthToFind} символів знаходиться під індексом ${indexOfName5Chars}.`,
  )
