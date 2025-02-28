/**
 * Create a new array filled with random numbers.
 * Generates a random number between minNumber and maxNumber (inclusive).
 * @param {number} length
 * @param {number} minNumber
 * @param {number} maxNumber
 * @returns {number[]}
 * @throws Gen an error if the input consist of not finite numbers
 */
function createRandomNumbersArray(length, minNumber, maxNumber) {
  if (!isFinite(length) || !isFinite(minNumber) || !isFinite(maxNumber))
    throw new Error('Incorrect arguments.')

  const randomNumbersArray = []

  for (let i = 0; i < length; i++) {
    const randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    randomNumbersArray.push(randomNumber)
  }

  return randomNumbersArray
}

// =============================================================================

// ## Option 1
const numbersArray = createRandomNumbersArray(10, 0, 20)
const firstNumber = numbersArray[0]

document.write(`<p>Оригінальний масив: ${numbersArray};`)

numbersArray.forEach((number, index, array) => {
  if (number > firstNumber) array[index] *= 2
})

document.write(`<p>Новий масив: ${numbersArray};`)

// ## Option 2
// const numbersArray = createRandomNumbersArray(10, 0, 20)

// const transformedArray = numbersArray.map((number, i, array) =>
//   number > array[0] ? (number *= 2) : number,
// )

// document.write(`<p>Оригінальний масив: ${numbersArray};`)
// document.write(`<p>Новий масив: ${transformedArray};`)
