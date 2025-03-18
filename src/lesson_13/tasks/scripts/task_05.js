/** @type {(value: number, min: number, max: number) => boolean} */
function isInRange(value, min, max) {
  return value >= min && value <= max
}

/**
 * Creates an iterator function that cycles through a range of numbers.
 *
 * @param {number} initial - The initial value to start the iteration from.
 * @param {number} min - The minimum value in the range.
 * @param {number} max - The maximum value in the range.
 * @returns {() => number} A function that returns the next number in the range each time it is called.
 * @throws {Error} If the initial value is not within the specified range.
 */
function createIterator(initial, min, max) {
  if (!isInRange(initial, min, max))
    throw new Error(`Initial value must be in between ${min} & ${max}.`)

  let iteration = initial

  /** @type {() => number} */
  function getNextIteration() {
    if (iteration > max) iteration = min

    return iteration++
  }

  return getNextIteration
}

const months = [
  'Січень',
  'Лютий',
  'Березень',
  'Квітень',
  'Травень',
  'Червень',
  'Липень',
  'Серпень',
  'Вересень',
  'Жовтень',
  'Листопад',
  'Грудень',
]
const monthsIterator = createIterator(4, 0, 11)
let i = 18

while (i--) {
  const monthName = months[monthsIterator()]

  document.writeln(monthName)
}
