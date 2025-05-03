'use strict'

/**
 * @param {number} hour
 */
function timeLeft(hour) {
  const date = new Date()

  return hour - date.getHours()
}

document
  .querySelector('.js-app')
  ?.append(`До кінця робочого дня залишилося ${timeLeft(17)} годин(и).`)
