'use strict'

const WISH_LIST = [
  'Справедливий мир',
  'Подорож до Італії',
  'Вивчити JS фреймворк',
  'Новий ноутбук',
  'Власний будинок',
  'До кінця року, прочитати 10 книг',
  'Навчитися ефективно працювати',
  'Навчитися швидко навчатися',
]

/**
 * @param {string} wish
 */
function createWish(wish) {
  const itemEl = document.createElement('li')

  itemEl.innerText = wish

  return itemEl
}

/**
 * @param {string[]} wishList
 */
function createWishList(wishList, amount = 3) {
  if (typeof amount !== 'number') throw new TypeError('Amount must be number.')
  if (amount <= 0) throw new RangeError('Amount must be positive.')
  if (amount > wishList.length)
    throw new RangeError('Amount must be less than wishes amount.')

  const listEl = document.createElement('ul')

  for (let i = 0; i < amount; i++) {
    listEl.append(createWish(wishList[i]))
  }

  return listEl
}

/**
 * @param {string[]} wishList
 * @param {string} title
 */
function createWishBlock(wishList, title, amount = 3) {
  const blockEl = document.createElement('div')
  const headerEL = document.createElement('h3')
  const listEl = createWishList(wishList, amount)

  blockEl.className = 'u-rounded-lg u-p-400 u-flow-400 u-border'

  headerEL.innerText = title
  blockEl.append(headerEL)
  blockEl.append(listEl)

  return blockEl
}

/**
 * @param {string} selector
 */
function renderWishes(selector, amount = 3) {
  const whereEl = document.querySelector(selector)
  const blockEl = createWishBlock(WISH_LIST, 'Мій список бажань', amount)

  if (!whereEl)
    throw new Error(
      `Can't find an element by the query selector "${selector}".`,
    )

  whereEl.append(blockEl)
}

// =============================================================================

WISH_LIST.sort(() => Math.random() - 0.5)
window.addEventListener('DOMContentLoaded', () => renderWishes('.js-app'))
