// /** @type {(list: any[]) => any[][]} */
// function getAllPermutations(list) {
//   if (list.length === 0) return [[]]

//   const [firstItem, ...restItems] = list
//   const permutationsNoFirstItem = getAllPermutations(restItems)
//   /** @type {any[][]} */
//   const allPermutations = []

//   for (const perm of permutationsNoFirstItem) {
//     for (let i = 0; i <= perm.length; i++) {
//       allPermutations.push(perm.toSpliced(i, 0, firstItem))
//     }
//   }

//   return allPermutations
// }

/** @type {(list: any[], currentList: any[]) => any[][]} */
function getAllPermutations(originList, currentList = []) {
  if (originList.length <= currentList.length) return [currentList]

  const permutations = []

  for (const item of originList) {
    if (currentList.includes(item)) continue

    permutations.push(...getAllPermutations(originList, [item, ...currentList]))
  }

  return permutations
}

/** @type {(table: any[][]) => string} */
function createTableResults(table) {
  let markup = '<table><tr>'

  for (let i = 0; i < table[0].length; i++) {
    markup += `<th>${i + 1} місце</th>`
  }

  markup += '</tr>'

  for (const row of table) {
    markup += '<tr>'

    for (const col of row) {
      markup += `<td>${col}</td>`
    }

    markup += '</tr>'
  }

  return markup + '</table>'
}

const sportsmen = [
  'Іван',
  'Галина',
  'Світлана',
  'Тетяна',
  // 'Анжела',
  // 'Богдан',
  // 'Христина',
  // 'Злата',
  // 'Анна',
]
const allPositions = getAllPermutations(sportsmen)

console.table(allPositions)
document.write(`<p>Спортсмени: ${sportsmen.join(', ')}`)
document.write(createTableResults(allPositions))

// document.write(prettyString.join(''))

// getAllPermutations([]) // [[]]

// getAllPermutations(['Світлана']) // [['Світлана']]

// getAllPermutations(['Світлана', 'Галя'])
// [
//   ['Світлана', 'Галя'],
//   ['Галя', 'Світлана'],
// ]

// getAllPermutations(['Світлана', 'Галя', 'Христина'])
// [
//   ['Світлана', 'Галя', 'Христина'],
//   ['Світлана', 'Христина', 'Галя'],
//   ['Галя', 'Світлана', 'Христина'],
//   ['Галя', 'Христина', 'Світлана'],
//   ['Христина', 'Світлана', 'Галя'],
//   ['Христина', 'Галя', 'Світлана'],
// ]
