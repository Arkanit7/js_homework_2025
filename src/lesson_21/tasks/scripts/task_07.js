'use strict'

/**
 * @param {Date} startDate
 * @param {number} durationM
 */
function checkInProgress(startDate, durationM = 30) {
  const differenceM = (Date.now() - startDate.getTime()) / (1e3 * 60)

  return differenceM < durationM && differenceM >= 0
}

/**
 * @param {SubmitEvent} e
 */
function handleCheckInProgress(e) {
  e.preventDefault()

  const dateEl = document.querySelector('.js-date')
  const date = new Date(dateEl.value)

  const inputEl = document.querySelector('.js-duration')
  const durationM = Number(inputEl.value)

  const outputEl = document.querySelector('.js-output')
  const inProgress = checkInProgress(date, durationM)
  outputEl.textContent = inProgress ? 'Триває' : 'Не триває'
}

const formEl = document.querySelector('.js-form')
formEl?.addEventListener('submit', handleCheckInProgress)
