/**
 * @param {any[]} array
 * @param {any} toMatch
 * @returns {number}
 */
function countMatchesInArray(array, toMatch) {
  let i = array.length,
    matchesCount = 0

  while (i--) {
    if (array[i] === toMatch) matchesCount++
  }

  return matchesCount
}

const learnersNames = [
  'Іван',
  'Галина',
  'Богдан',
  'Світлана',
  'Тетяна',
  'Іван',
  'Анжела',
  'Петро',
  'Христина',
  'Іван',
  'Злата',
  'Василь',
  'Анна',
]
const ivanCount = countMatchesInArray(learnersNames, 'Іван')

document.write(`<p>Учні: ${learnersNames};`)
document.write(`<p>Кількість Іванів: ${ivanCount}.`)
