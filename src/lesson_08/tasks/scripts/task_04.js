// ## Варіант №1
// /**
//  * Get count of: plates that start with an "A",
//  * symmetric plates, length more than 5
//  *
//  * @param {string[]} carPlatesArray
//  * @returns {number[]}
//  */
// function parseCarPlates(carPlatesArray) {
//   let startsWithA = 0,
//     symmetricEdges = 0,
//     lengthMoreThanFive = 0

//   for (let i = 0; i < carPlatesArray.length; i++) {
//     const plate = carPlatesArray[i]

//     if (plate[0] === 'A') startsWithA++
//     if (plate[0] === plate[plate.length - 1]) symmetricEdges++
//     if (plate.length > 5) lengthMoreThanFive++
//   }

//   return [startsWithA, symmetricEdges, lengthMoreThanFive]
// }

// const carsPlates = [
//   'A123BC',
//   'B456AB',
//   'C789CC',
//   'A555AA',
//   'X1X',
//   'AA999AA',
//   'M1234M',
//   'A77A',
// ]
// const parsedCarPlates = parseCarPlates(carsPlates)

// document.write(`<p>Номери машин: ${carsPlates};`)
// document.write(
//   `<p>Кількість номерів, які починаються на букву "А": ${parsedCarPlates[0]};`,
// )
// document.write(
//   `<p>Кількість номерів, у яких перша і остання літери збігаються: ${parsedCarPlates[1]};`,
// )
// document.write(
//   `<p>Кількість номерів, які складаються з більше ніш 5 символів: ${parsedCarPlates[2]}.`,
// )

// ================================================================================

// ## Варіант №2

/**
 * Count array elements that starts with the specified string
 *
 * @param {string[]} array
 * @param {string} startsWith
 * @returns {number}
 */
function countArrayElementsThatStartsWith(array, startsWith) {
  let counter = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i][0] === startsWith) counter++
  }

  return counter
}

/**
 * Count array elements that starts and ends with the same character
 *
 * @param {string[]} array
 * @returns {number}
 */
function countSymmetricEdges(array) {
  let counter = 0

  for (let i = 0; i < array.length; i++) {
    const plate = array[i]

    if (plate[0] === plate[plate.length - 1]) counter++
  }

  return counter
}

/**
 * Count array elements that has more symbols than specified length
 *
 * @param {string[]} array
 * @param {number} moreThan
 * @returns {number}
 */
function countLengthMoreThan(array, moreThan) {
  let counter = 0

  for (let i = 0; i < array.length; i++) {
    if (array[i].length > moreThan) counter++
  }

  return counter
}

const carNumbers = [
  'A123BC',
  'B456AB',
  'C789CA',
  'A555AA',
  'X1X',
  'AA999AB',
  'M1234M',
  'A77A',
]

document.write(`<p>Номери машин: ${carNumbers};`)
document.write(
  `<p>Кількість номерів, які починаються на букву "А": ${countArrayElementsThatStartsWith(carNumbers, 'A')};`,
)
document.write(
  `<p>Кількість номерів, у яких перша і остання літери збігаються: ${countSymmetricEdges(carNumbers)};`,
)
document.write(
  `<p>Кількість номерів, які складаються з більше ніш 5 символів: ${countLengthMoreThan(carNumbers, 5)}.`,
)
