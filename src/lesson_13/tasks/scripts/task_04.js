/** @type {(table: string[][]) => string} */
function createDancePairsTable(pairs) {
  if (!pairs.length) return '<p>❌ Немає можливих пар</p>'

  let markup = `
    <table>
      <thead>
        <tr><th>Хлопець 🕺</th><th>Дівчина 💃</th></tr>
      </thead>
      <tbody>`

  for (const pair of pairs) {
    markup += '<tr>'

    for (const person of pair) {
      markup += `<td>${person}</td>`
    }

    markup += '</tr>'
  }

  return (markup += '</tbody></table>')
}

/** @type {(boys: string[], girls: string[]) => string[][]} */
function getAllDancePairsLoop(boys, girls) {
  const allPairs = []

  for (const boy of boys) {
    for (const girl of girls) {
      allPairs.push([boy, girl])
    }
  }

  return allPairs
}

/** @type {(boys: string[], girls: string[]) => string[][]} */
function getAllDancePairsRecursive(boys, girls) {
  if (boys.length === 0 || girls.length === 0) return []

  const [boy, ...restBoys] = boys
  const pairsWithoutTheBoy = getAllDancePairsRecursive(restBoys, girls)
  const pairsWithTheBoy = girls.map((girl) => [boy, girl])

  return [...pairsWithTheBoy, ...pairsWithoutTheBoy]
}

const girls = ['Галина', 'Світлана', 'Тетяна', 'Анна']
const boys = ['Іван', 'Богдан', 'Андрій']

const allPairsLoop = getAllDancePairsLoop(boys, girls)
console.table(allPairsLoop)

const allPairsRecursive = getAllDancePairsRecursive(boys, girls)
console.table(allPairsRecursive)

const table = createDancePairsTable(allPairsRecursive)
document.write('<p>Хлопці: ' + boys.join(', '))
document.write('<p>Дівчата: ' + girls.join(', '))
document.write(table)
