function insertOnes(array, length, from, to) {
  const totalOnes = from + Math.floor(Math.random() * (to - from + 1))
  let onesCount = totalOnes

  while (onesCount) {
    const randomIndex = Math.floor(Math.random() * length)

    if (array[randomIndex] === 1) continue

    array[randomIndex] = 1
    onesCount--
  }
}

/**
 * Creates an array of a specified length filled with random numbers between
 * minNumber and maxNumber, ensuring that there are exactly 3 to 5 ones, and
 * more twos than threes.
 *
 * @param {number} length - The length of the array to be created.
 * @param {number} minNumber - The minimum value for the random numbers.
 * @param {number} maxNumber - The maximum value for the random numbers.
 * @returns {number[]} - The generated array with the specified properties.
 */
function createSpecificArray(length, minNumber, maxNumber) {
  const array = Array.from({length})

  insertOnes(array, length, 3, 5)

  // fill the rest of the array & count 2 and 3
  let twosCount = 0,
    threesCount = 0

  array.forEach((item, i, arr) => {
    if (item === 1) return

    const randomNumber =
      minNumber + Math.floor(Math.random() * (maxNumber - minNumber + 1))

    arr[i] = randomNumber

    if (randomNumber === 2) twosCount++
    else if (randomNumber === 3) threesCount++
  })

  // makes sure that there are more numbers 2 than numbers 3
  while (twosCount <= threesCount) {
    const indexOfThree = array.indexOf(3)

    if (indexOfThree === -1) {
      let randomIndex

      do {
        randomIndex = Math.floor(Math.random() * length)
      } while (array[randomIndex] === 1)

      array[randomIndex] = 2
      twosCount++
    } else {
      array[indexOfThree] = 2
      threesCount--
      twosCount++
    }
  }

  return array
}

document.write(createSpecificArray(10, 0, 9).join(', '))
