'use strict'

function checkIsThisWeek(then) {
  const now = new Date()
  now.setHours(0, 0, 0, 0) // reset time

  const dayWeekUS = now.getDay() // count from 0 for Sunday
  const dayWeekUA = (dayWeekUS + 6) % 7 // count from 0 for Monday

  now.setDate(now.getDate() - dayWeekUA)
  const lastMonday = now.getTime()

  now.setDate(now.getDate() + 7)
  const nextMonday = now.getTime()

  return then.getTime() >= lastMonday && then.getTime() < nextMonday
}

/**
 * @param {SubmitEvent} e
 */
function handleIsThisWeek(e) {
  e.preventDefault()

  const dateEl = document.querySelector('.js-date')
  const date = new Date(dateEl.value)

  const outputEl = document.querySelector('.js-output')
  const isThisWeek = checkIsThisWeek(date)
  outputEl.textContent = `Дата ${isThisWeek ? 'належить' : 'не належить'} поточному тижню`
}

const formEl = document.querySelector('.js-form')
formEl?.addEventListener('submit', handleIsThisWeek)
