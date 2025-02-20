/**
 * Count even numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns {number}
 */
function getEvenCount(num1, num2, num3) {
  let counter = 0

  if (num1 % 2 === 0) counter++

  if (num2 % 2 === 0) counter++

  if (num3 % 2 === 0) counter++

  return counter
}

/**
 * Count positive numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns {number}
 */
function getPositiveCount(num1, num2, num3) {
  let counter = 0

  if (num1 > 0) counter++

  if (num2 > 0) counter++

  if (num3 > 0) counter++

  return counter
}

/**
 * Count numbers, greater than 100
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns {number}
 */
function getGreaterThanHundred(num1, num2, num3) {
  let counter = 0

  if (num1 > 100) counter++

  if (num2 > 100) counter++

  if (num3 > 100) counter++

  return counter
}

/**
 * Evaluate: even, positive, greater than 100 numbers count
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @returns {string}
 */
function getNumberStats(num1, num2, num3) {
  let output = ''
  const evenCount = getEvenCount(num1, num2, num3)
  const positiveCount = getPositiveCount(num1, num2, num3)
  const greaterThanHundredCount = getGreaterThanHundred(num1, num2, num3)

  output += `<p>Кількість парних чисел: ${evenCount};`
  output += `<p>Кількість додатних чисел: ${positiveCount};`
  output += `<p>Кількість чисел більших за 100: ${greaterThanHundredCount}`

  return output
}

const x1 = 21,
  x2 = -2,
  x3 = 400
const numberStats = getNumberStats(x1, x2, x3)

document.write(`<p>Числа: ${x1}, ${x2}, ${x3};`)
document.write(numberStats)
