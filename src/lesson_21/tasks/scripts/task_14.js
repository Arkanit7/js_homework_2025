'use strict'

/**
 * @param {Date} startDate
 * @param {number} durationDays
 */
function getVacationInfo(startDate, durationDays) {
  const endDate = structuredClone(startDate) // we don't want to mutate the passed date
  endDate.setDate(endDate.getDate() + durationDays)
  const nowDate = new Date()

  return {
    isActive: endDate - nowDate > 0 && nowDate - startDate >= 0,
    hasEnded: nowDate - endDate >= 0,
  }
}

/**
 * @param {SubmitEvent} e
 */
function handleVacation(e) {
  e.preventDefault()

  const dateEl = document.querySelector('.js-date')
  const date = new Date(dateEl.value)

  const inputEl = document.querySelector('.js-duration')
  const durationDays = Number(inputEl.value)

  const {isActive, hasEnded} = getVacationInfo(date, durationDays)
  const outputEl = document.querySelector('.js-output')
  outputEl.innerText = `Триває: ${isActive ? 'так' : 'ні'}\nЗакінчилася: ${hasEnded ? 'так' : 'ні'}`
}

const formEl = document.querySelector('.js-form')
formEl?.addEventListener('submit', handleVacation)
