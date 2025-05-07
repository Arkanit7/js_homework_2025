'use strict'

/**
 * @param {any[]} arr
 */
function createListFromArray(arr) {
  const listEl = document.createElement('UL')

  for (const item of arr) {
    const liEl = document.createElement('LI')
    liEl.textContent = item
    listEl.append(liEl)
  }

  return listEl
}

/**
 * @param {any[]} arr
 * @param {string} title
 */
function createSection(arr, title) {
  const titleEl = document.createElement('H3')
  titleEl.textContent = title

  const listEl = createListFromArray(arr)

  const sectionEl = document.createElement('SECTION')
  sectionEl.className = 'u-flow-200 u-max-is-3xs'
  sectionEl.append(titleEl, listEl)

  return sectionEl
}

/**
 * @param {string} cssSelector
 * @param {any[]} arr
 * @param {string} title
 */
function appendSection(cssSelector, arr, title) {
  document.querySelector(cssSelector).append(createSection(arr, title))
}

// =============================================================================

const stringList = [
  'hello123',
  'sky',
  'brrr',
  'flight45',
  'rhythm',
  'test1',
  'dry3',
  'APPLE',
  'zzz',
  'moon',
  'number7',
  'CRWN',
]
appendSection('.js-app', stringList, 'Дано:')

// '1. Дано масив рядків. Вивести ті, у яких є цифри (використати метод test та регулярні вирази).'
const withDigits = stringList.filter((s) => /\d/.test(s))
appendSection('.js-app', withDigits, 'Містять цифри:')

// 2. Дано масив рядків. Вивести ті, у яких немає цифр.
const noDigits = stringList.filter((s) => !/\d/.test(s))
appendSection('.js-app', noDigits, 'Не містять цифри:')

// 3. Дано масив рядків. Вивести ті, у яких є голосні літери.
const withVowels = stringList.filter((s) => /[aeiou]/i.test(s))
appendSection('.js-app', withVowels, 'Містять голосні літери:')

// 4. Дано масив рядків. Вивести ті, у яких немає голосних літер.
const noVowels = stringList.filter((s) => !/[aeiou]/i.test(s))
appendSection('.js-app', noVowels, 'Не містять голосних літер:')

// 5. Дано масив рядків. Вивести ті, у яких є або цифра 1 або цифра 3.
const oneOrThree = stringList.filter((s) => /1|3/.test(s))
appendSection('.js-app', oneOrThree, 'Містять цифру 1 або 3:')
