/**
 * Create a new array filled with random numbers.
 * Excludes some numbers from the generation.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length - Length of the new array
 * @param {number} minNumber - Minimal random number
 * @param {number} maxNumber - Maximal random number
 * @param {...number} exclude - Numbers to exclude from the generation
 * @returns {number[]} Random numbers array
 * @throws Throws an error if the input consists of non-finite numbers
 */
function createRandomNumbersArray(
  length,
  minNumber = -99,
  maxNumber = 99,
  ...exclude
) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Arguments must be finite numbers.')

  return Array.from({length}, () => {
    let randomNumber

    do {
      randomNumber =
        minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))
    } while (exclude.includes(randomNumber))

    return randomNumber
  })
}

function createArrayWithExactTwoNumbers(
  length,
  exactNumber,
  minNumber,
  maxNumber,
) {
  const randomNumbers = createRandomNumbersArray(
    length,
    minNumber,
    maxNumber,
    exactNumber,
  )

  const firstIndex = Math.floor(Math.random() * (length + 1))
  let secondIndex

  do {
    secondIndex = Math.floor(Math.random() * (length + 1))
  } while (firstIndex === secondIndex)

  randomNumbers[firstIndex] = randomNumbers[secondIndex] = exactNumber

  return randomNumbers
}

document.write(createArrayWithExactTwoNumbers(15, 1, -5, 5).join(', '))
