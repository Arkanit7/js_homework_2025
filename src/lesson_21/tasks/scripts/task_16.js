'use strict'

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInteger(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * @param {number} size
 * @param {number} min
 * @param {number} max
 */
function createRandomArray(size, min, max) {
  return Array.from({length: size}, () => getRandomInteger(min, max))
}

function swap(list, index1, index2) {
  ;[list[index1], list[index2]] = [list[index2], list[index1]]
}

/**
 * @param {number[]} list
 * @param {boolean} [inPlace=true]
 */
function bubbleSort(list, inPlace = true) {
  const arr = inPlace ? list : [...list]

  let right = arr.length - 1

  while (right) {
    let newRight = 0

    for (let left = 0; left < right; left++) {
      if (arr[left] > arr[left + 1]) {
        swap(arr, left, left + 1)
        newRight = left
      }
    }

    right = newRight
  }

  return arr
}

/**
 * @param {number[]} list
 * @param {boolean} [inPlace=true]
 */
function insertionSort(list, inPlace = true) {
  const arr = inPlace ? list : [...list]

  for (let left = 1; left < arr.length; left++) {
    const cachedEl = arr[left]
    let i = left - 1

    while (i >= 0 && arr[i] > cachedEl) {
      arr[i + 1] = arr[i]
      i--
    }

    if (i + 1 !== left) {
      arr[i + 1] = cachedEl
    }
  }

  return arr
}

/**
 *
 * @param {number} times
 * @param {Function} fn
 * @param  {...any} params
 * @returns {number}
 */
function benchmark(times, fn, ...params) {
  const start = Date.now()

  for (let i = 0; i < times; i++) {
    fn(...params)
  }

  return Date.now() - start
}

// =============================================================================

const randomList = createRandomArray(1e3, 1, 800)

let bubbleTime = 0
let insertionTime = 0

for (let i = 0; i < 10; i++) {
  bubbleTime += benchmark(10, bubbleSort, randomList, false)
  insertionTime += benchmark(10, insertionSort, randomList, false)
}

const template = `
<p><b>Кожне сортування проводиться по 100 разів</b>
<p>Сортування бульбашкою: ${bubbleTime} мс
<p>Сортування включенням: ${insertionTime} мс
<p>Різниця (бульбашкою мінус включенням): ${bubbleTime - insertionTime} мс
`
document.querySelector('.js-app')?.insertAdjacentHTML('beforeend', template)
