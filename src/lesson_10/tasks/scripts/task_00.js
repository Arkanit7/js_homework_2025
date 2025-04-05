/**
 * Create a new array filled with random numbers.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length - Length of the new array
 * @param {number} minNumber - Minimal random number
 * @param {number} maxNumber - Maximal random number
 * @returns {number[]} - Random numbers array
 * @throws Throws an error if the input consists of non-finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({length}, () => {
    return minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
  })
}

/**
 * Print pretty table with indexes and values based on the array
 * @param {any[]} array - Array to print
 * @param {string} title - Table's caption
 */
function printArrayTable(array, title) {
  document.write(`<table><caption>${title}</caption><thead><tr>`)

  array.forEach((_, i) => {
    document.write(`<th>${i}</th>`)
  })

  document.write('</thead><tbody><tr>')

  array.forEach((item) => {
    document.write(`<td>${item}</td>`)
  })

  document.write('</tr></tbody></table>')
}

const TARGET_PRICE = 1e3
const priceHistory = createRandomNumbersArray(10, 1, 1e4)

printArrayTable(priceHistory, 'Історія цін')
document.write('<ol>')

// =============================================================================

// 1. Сформувати новий масив, у якому є тільки ті, що більші за 1000 грн.
const priceHistoryMoreThanTarget = priceHistory.filter(
  (price) => price > TARGET_PRICE,
)

document.write('<li>' + priceHistoryMoreThanTarget.join(', '))

// 2. Сформувати новий масив, у якому є номери тільки тих, що більші за 1000 грн.
const indexesOfMoreThanTarget = priceHistory.reduce(
  (prevArr, item, i) => (item > TARGET_PRICE ? prevArr.concat(i) : prevArr),
  [],
)

document.write('<li>' + indexesOfMoreThanTarget.join(', '))

// 3. Сформувати список з тих цін, які більші за попереднє значення
const moreThanPrevPrice = priceHistory.filter(
  (price, i, arr) => price > arr[i - 1] && i > 0,
)

document.write('<li>' + moreThanPrevPrice.join(', '))

// 4. Сформувати новий масив, що міститиме значення цін у відсотках стосовно максимального
const maximalPrice = Math.max(...priceHistory)
const percentageOfMaximum = priceHistory.map(
  (price) => (price / maximalPrice) * 100,
)

document.write(
  '<li>' +
    percentageOfMaximum.map((price) => price.toFixed(2)).join('%, ') +
    '%',
)

// 5. Підрахувати кількість змін цін
const priceChangeCount = priceHistory.reduce(
  (count, price, i, arr) =>
    price === arr[i - 1] || i === 0 ? count : count + 1,
  0,
)

document.write('<li>' + priceChangeCount)

// 6. Визначити, чи є ціна, що менше 1000
const IsPriceMoreThanTarget = priceHistory.some((price) => price < TARGET_PRICE)

document.write('<li>' + IsPriceMoreThanTarget)

// 7. Визначати, чи усі ціни більше за 1000
const everyPriceMoreThanTarget = priceHistory.every(
  (price) => price > TARGET_PRICE,
)

document.write('<li>' + everyPriceMoreThanTarget)

// 8. Підрахувати кількість цін, що більше за 1000
const countMoreThanTarget = priceHistory.reduce(
  (count, price) => (price > TARGET_PRICE ? count + 1 : count),
  0,
)

document.write('<li>' + countMoreThanTarget)

// 9. Підрахувати суму цін, що більше за 1000
const sumOfMoreThanTarget = priceHistory.reduce(
  (sum, price) => (price > TARGET_PRICE ? sum + price : sum),
  0,
)

document.write('<li>' + sumOfMoreThanTarget)

// 10. Знайти першу ціну, що більше за 1000
const firstMoreThanTarget = priceHistory.find((price) => price > TARGET_PRICE)

if (firstMoreThanTarget) document.write('<li>' + firstMoreThanTarget)
else document.write('<li>Такої ціни немає')

// 11. Знайти індекс першої ціни, що більше за 1000
const firstIndexMoreThanTarget = priceHistory.findIndex(
  (price) => price > TARGET_PRICE,
)

if (firstIndexMoreThanTarget !== -1)
  document.write('<li>' + firstIndexMoreThanTarget)
else document.write('<li>Такої ціни немає')

// 12. Знайти останню ціну, що більше за 1000
const lastMoreThanTarget = priceHistory.findLast(
  (price) => price > TARGET_PRICE,
)

if (lastMoreThanTarget) document.write('<li>' + lastMoreThanTarget)
else document.write('<li>Такої ціни немає')

// 13. Знайти індекс останньої ціни, що більше за 1000
const lastIndexMoreThanTarget = priceHistory.findLastIndex(
  (price) => price > TARGET_PRICE,
)

if (lastIndexMoreThanTarget !== -1)
  document.write('<li>' + lastIndexMoreThanTarget)
else document.write('<li>Такої ціни немає')
