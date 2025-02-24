/**
 * Returns an array filled with random numbers
 *
 * @param {number} length
 * @param {number} [minNumber=1]
 * @param {number} [maxNumber=5]
 * @returns {number[]}
 */
function getRandomNumbersArray(length, minNumber = 1, maxNumber = 5) {
  const randomNumbersArray = []

  for (let i = 0; i < length; i++) {
    const randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    randomNumbersArray.push(randomNumber)
  }

  return randomNumbersArray
}

/**
 * @param {number[]} array
 * @param {number} from natural number
 * @param {number} to natural number
 * @param {number} step natural number
 * @returns {number}
 */
function getSequentialSum(array, from, to, step = 1) {
  let sum = 0

  for (let i = from; i < to; i += step) {
    sum += array[i]
  }

  return sum
}

const annualBills = getRandomNumbersArray(12, 600, 3000)
const totalSum = getSequentialSum(annualBills, 0, 12)
const firstHalfSum = getSequentialSum(annualBills, 0, 6)
const secondHalfSum = getSequentialSum(annualBills, 6, 12)
const summerSum = getSequentialSum(annualBills, 5, 8)
const secondQuarterSum = getSequentialSum(annualBills, 3, 6)
const evenMonthsSum = getSequentialSum(annualBills, 1, 12, 2)
const seasonStartSum = getSequentialSum(annualBills, 2, 12, 3)

document.write(`Платіжки за рік: ${annualBills};`)
document.write('<ol>')
document.write(`<li>${totalSum} грн;`)
document.write(`<li>${firstHalfSum} грн;`)
document.write(`<li>${secondHalfSum} грн;`)
document.write(`<li>${summerSum} грн;`)
document.write(`<li>${secondQuarterSum} грн;`)
document.write(`<li>${evenMonthsSum} грн;`)
document.write(`<li>${seasonStartSum} грн.`)
document.write('</ol>')
