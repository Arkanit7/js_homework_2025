'use strict'

/**
 * @typedef {Object} Options
 * @property {number} [listItemsMinAmount]
 * @property {number} [listItemsMaxAmount]
 * @property {number} [minNumber]
 * @property {number} [maxNumber]
 * */

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomInteger(min, max) {
  if (typeof min !== 'number' || typeof max !== 'number')
    throw new TypeError('Range must be number.')

  return min + Math.floor(Math.random() * (max - min + 1))
}

/**
 * @param {number} itemsAmount
 * @param {number} minNumber
 * @param {number} maxNumber
 */
function createRandomOrderedList(itemsAmount, minNumber, maxNumber) {
  if (typeof itemsAmount !== 'number')
    throw new TypeError('Amount of items must be a number.')

  const listEl = document.createElement('OL')

  for (let i = 0; i < itemsAmount; i++) {
    const liEl = document.createElement('LI')

    liEl.textContent = getRandomInteger(minNumber, maxNumber)
    listEl.append(liEl)
  }

  return listEl
}

/**
 * @param {number} listsAmount
 * @param {Options} options
 */
function createListsFragment(listsAmount, options = {}) {
  if (typeof listsAmount !== 'number')
    throw new TypeError('Amount of lists must be a number.')

  const {
    listItemsMinAmount = 1,
    listItemsMaxAmount = 10,
    minNumber = 1,
    maxNumber = 100,
  } = options

  const fragment = new DocumentFragment()

  for (let i = 0; i < listsAmount; i++) {
    const itemsAmount = getRandomInteger(listItemsMinAmount, listItemsMaxAmount)
    const listEl = createRandomOrderedList(itemsAmount, minNumber, maxNumber)

    fragment.append(listEl)
  }

  return fragment
}

// =============================================================================

/** @param {Event} e */
function paintLists({target, currentTarget}) {
  const paintBtn = target.closest('.js-paint-lists')

  if (!paintBtn) return

  const lists = currentTarget.querySelectorAll('ul, ol')

  for (const list of lists) {
    const color = list.childElementCount % 2 === 0 ? 'green' : 'red'

    for (const child of list.children) {
      child.style.color = color
    }

    // list.style.color = color // простіший варіант
  }
}

/** @param {Event} e */
function resetLists({target}) {
  const resetBtn = target.closest('.js-reset-lists')

  if (!resetBtn) return

  const wrapper = resetBtn.closest('.js-lists-wrapper')
  const container = wrapper?.querySelector('.js-lists-container')

  container.innerHTML = ''
  container.append(createListsFragment(5))
}

// =============================================================================

try {
  const container = document.querySelector('.js-lists-container')
  const listsFragment = createListsFragment(5)

  container.append(listsFragment)

  const listsWrapper = document.querySelector('.js-lists-wrapper')

  listsWrapper.addEventListener('click', paintLists)
  listsWrapper.addEventListener('click', resetLists)
} catch (error) {
  console.error(error)
}
