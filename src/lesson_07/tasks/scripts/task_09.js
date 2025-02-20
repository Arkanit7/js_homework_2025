/**
 * Count negative numbers
 *
 * @param {...[number]} temperatures
 * @returns {number}
 */
function calcNegative(...temperatures) {
  let negativeCount = 0

  for (let index = 0; index < temperatures.length; index++) {
    if (temperatures[index] < 0) negativeCount++
  }

  return negativeCount
}

const t1 = 5,
  t2 = -8,
  t3 = -20,
  t4 = 7,
  t5 = 30,
  t6 = -1
const negativeCount = calcNegative(t1, t2, t3, t4, t5, t6)

document.write(`<p>Числа = ${t1}, ${t2}, ${t3}, ${t4}, ${t5}, ${t6};`)
document.write(`<p>Кількість від'ємних показів температури = ${negativeCount}.`)
