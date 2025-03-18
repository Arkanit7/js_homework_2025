/** @type {(table: any[][]) => string} */
function createTable(table) {
  let markup = '<table>'

  for (const row of table) {
    markup += '<tr>'

    for (const col of row) {
      markup += `<td>${col}</td>`
    }

    markup += '</tr>'
  }

  return markup + '</table>'
}

/** @type {(boys: string[], girls: string[]) => string[][]} */
function getAllPairsLoop(boys, girls) {
  const allPairs = []

  for (const boy of boys) {
    for (const girl of girls) {
      allPairs.push([boy, girl])
    }
  }

  return allPairs
}

/** @type {(boys: string[], girls: string[]) => string[][]} */
function getAllPairsRecursive(boys, girls) {
  if (boys.length === 0 || girls.length === 0) return [[]]

  const [boy, ...restBoys] = boys
  const pairsWithoutTheBoy = getAllPairsLoop(restBoys, girls)
  const pairsWithTheBoy = girls.map((girl) => [boy, girl])

  return [...pairsWithTheBoy, ...pairsWithoutTheBoy]
}

const girls = ['Галина', 'Світлана', 'Тетяна', 'Анна']
const boys = ['Іван', 'Богдан', 'Андрій']

const allPairsLoop = getAllPairsLoop(boys, girls)
console.table(allPairsLoop)

const allPairsRecursive = getAllPairsRecursive(boys, girls)
console.table(allPairsRecursive)

const table = createTable(allPairsRecursive)
document.write('<p>Хлопці 🕺: ' + boys.join(', '))
document.write('<p>Дівчата 💃: ' + girls.join(', '))
document.write(table)
