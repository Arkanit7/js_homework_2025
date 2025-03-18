//                      []
// a        []                      [a]
// b   []        [b]         [a]          [ab]
// c []  [c]  [b]   [bc]  [a]   [ac]  [ab]    [abc]

/** @type {(list: any[]) => any[][]} */
function generateCombinations(list) {
  if (list.length === 0) return [[]]

  const [firstItem, ...restItems] = list
  const combinationsWithoutFirst = generateCombinations(restItems)
  const combinationsWithFirst = combinationsWithoutFirst.map((combination) => [
    firstItem,
    ...combination,
  ])

  return combinationsWithoutFirst.concat(combinationsWithFirst)
}

const allSubsets = generateCombinations([1, 2, 3])

console.log(allSubsets)
document.write(`<pre>[
${allSubsets.map((subset) => `  [${subset.join(', ')}]`).join(',\n')}
]</pre>`)
