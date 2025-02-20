/**
 * Calc average for positive numbers
 *
 * @param {...[number]} temperatures
 * @returns {number}
 */
function calcPositiveAverage(...temperatures) {
  let positiveCount = 0,
    positiveSum = 0

  for (const temperature of temperatures) {
    if (temperature < 0) continue

    positiveCount++
    positiveSum += temperature
  }

  return positiveSum / positiveCount
}

const t1 = 5,
  t2 = -8,
  t3 = -20,
  t4 = 7,
  t5 = 30,
  t6 = -1
const positiveAverage = calcPositiveAverage(t1, t2, t3, t4, t5, t6)

document.write(`<p>Числа = ${t1}, ${t2}, ${t3}, ${t4}, ${t5}, ${t6};`)
document.write(
  `<p>Середнє значення для додатних показів температури = ${positiveAverage.toFixed(2)}.`,
)
