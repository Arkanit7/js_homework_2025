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

// =============================================================================

function countDivisible(array, divisor) {
  return array.reduce((count, item) => (item % divisor ? count : count + 1), 0)
}

const randomNumbers = createRandomNumbersArray(14, -21, 21)
const divisibleByFirst = countDivisible(randomNumbers, randomNumbers[0])
const divisibleByLast = countDivisible(randomNumbers, randomNumbers.at(-1))

document.write(`<p>Масив: [${randomNumbers.join(', ')}]</p>`)
document.write(
  `<p>Кількість чисел, що діляться на ${randomNumbers[0]}: ${divisibleByFirst}.`,
)
document.write(
  `<p>Кількість чисел, що діляться на ${randomNumbers.at(-1)}: ${divisibleByLast}.`,
)

if (divisibleByFirst > divisibleByLast) document.write('<p>Перших більше')
else if (divisibleByFirst < divisibleByLast) document.write('<p>Других більше')
else document.write('<p>Порівно')
