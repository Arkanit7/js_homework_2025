/**
 * Get the sum of 4 numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @param {number} num4
 * @returns {number}
 */
function sumOfFour(num1, num2, num3, num4) {
  return num1 + num2 + num3 + num4
}

/**
 * Get the multiple of 4 numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @param {number} num4
 * @returns {number}
 */
function multipleOfFour(num1, num2, num3, num4) {
  return num1 * num2 * num3 * num4
}

/**
 * Get the average of 4 numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @param {number} num4
 * @returns {number}
 */
function averageFour(num1, num2, num3, num4) {
  return sumOfFour(num1, num2, num3, num4) / 4
}

/**
 * Get the minimal of 4 numbers
 *
 * @param {number} num1
 * @param {number} num2
 * @param {number} num3
 * @param {number} num4
 * @returns {number}
 */
function minOfFour(num1, num2, num3, num4) {
  let min = num1

  if (num2 < min) min = num2
  if (num3 < min) min = num3
  if (num4 < min) min = num4

  return min
}

const x1 = 1,
  x2 = 2,
  x3 = 3,
  x4 = 4

document.write(`<p>Числа: ${x1}, ${x2}, ${x3}, ${x4};`)
document.write(`<ol>`)
document.write(`<li>Сума чисел = ${sumOfFour(x1, x2, x3, x4)};`)
document.write(`<li>Добуток чисел = ${multipleOfFour(x1, x2, x3, x4)};`)
document.write(
  `<li>Середнє арифметичне чисел = ${averageFour(x1, x2, x3, x4)};`,
)
document.write(`<li>Мінімальне значення чисел = ${minOfFour(x1, x2, x3, x4)};`)
document.write(`</ol>`)
