'use strict'

/**
 * @param {number[]} tempList
 * @return {Map<number, number>}
 */
function getEntries(tempList) {
  //? тут нема потреби у Map, можна використати звичайний об'єкт
  //? але оскільки урок про Map та Set – використаю Map
  const entries = new Map()

  for (const temp of tempList) {
    entries.set(temp, (entries.get(temp) ?? 0) + 1)
  }

  return entries
}

/** @param {number[]} tempList */
function getCeiledEntriesSize(tempList) {
  return new Set(tempList.map(Math.ceil)).size
}

// =============================================================================

const temperatures = [12.4, 24.9, 10.6, 12.4, 24.9, 12.4, 10.6, 11.9]

const tempEntries = getEntries(temperatures)

console.group('Входження кожної температури')
for (const [temp, amount] of tempEntries) {
  console.log(temp, '-', amount)
}
console.groupEnd()

console.log('Кількість різних показів:', getCeiledEntriesSize(temperatures))
