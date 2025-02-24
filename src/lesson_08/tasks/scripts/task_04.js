/**
 * Counts the total evaluations in an array based on a comparison function.
 *
 * @param {any[]} array The array to evaluate.
 * @param {function(): boolean} comparisonFunction The function to compare each element.
 * @returns {number} The count of elements that satisfy the comparison function.
 */
function countEvaluations(array, comparisonFunction) {
  let counter = 0

  for (let i = 0; i < array.length; i++) {
    if (comparisonFunction(array[i])) counter++
  }

  return counter
}

const carPlates = [
  'A123BC',
  'B456AB',
  'C789CA',
  'A555AA',
  'X1X',
  'AA999AB',
  'M1234M',
  'A77A',
]
const startsWithA = countEvaluations(carPlates, (plate) => plate[0] === 'A')
const symmetricEdges = countEvaluations(
  carPlates,
  (plate) => plate[0] === plate[plate.length - 1],
)
const lengthMoreThanFive = countEvaluations(
  carPlates,
  (plate) => plate.length > 5,
)

document.write(`<p>Номери машин: ${carPlates};`)
document.write(
  `<p>Кількість номерів, які починаються на букву "А": ${startsWithA};`,
)
document.write(
  `<p>Кількість номерів, у яких перша і остання літери збігаються: ${symmetricEdges};`,
)
document.write(
  `<p>Кількість номерів, які складаються з більше ніш 5 символів: ${lengthMoreThanFive}.`,
)
