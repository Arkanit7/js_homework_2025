'use strict'

/**
 * @param {number} from
 * @param {number} to
 * @return {number}
 */
function getRandomNumber(from, to) {
  if (typeof from !== 'number' || typeof to !== 'number')
    throw new TypeError('Range must be set in numbers.')

  return from + Math.floor(Math.random() * (to - from + 1))
}

/**
 * @param {number} amount
 * @param {number} [from]
 * @param {number} [to]
 */
function* generateRandomEvenNumbers(
  amount,
  from = Number.MIN_SAFE_INTEGER,
  to = Number.MAX_SAFE_INTEGER,
) {
  if (typeof amount !== 'number')
    throw new TypeError('Amount must be a number.')
  if (amount <= 0) throw new RangeError('Amount must be positive.')

  for (let i = 0; i < amount; i++) {
    const number = getRandomNumber(from, to)

    yield number - (number % 2)
  }
}

// =============================================================================

const container = document.querySelector('.js-app')
const randomEvenNumberGenerator = generateRandomEvenNumbers(40, -1e3, 1e3)

for (const number of randomEvenNumberGenerator) {
  container?.append(`${number}; `)
}
