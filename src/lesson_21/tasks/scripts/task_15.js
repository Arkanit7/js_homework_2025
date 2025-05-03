'use strict'

/**
 * @param {Date} productionDate
 * @param {number} freshnessDays
 */
function hasExpired(productionDate, freshnessDays) {
  const expirationDate = structuredClone(productionDate) // we don't want to mutate the passed date
  expirationDate.setDate(expirationDate.getDate() + freshnessDays)
  const nowDate = new Date()

  return expirationDate - nowDate > 0
}

/**
 * @param {SubmitEvent} e
 */
function handleHasExpired(e) {
  e.preventDefault()

  const dateEl = document.querySelector('.js-date')
  const productionDays = new Date(dateEl.value)

  const inputEl = document.querySelector('.js-duration')
  const freshnessDays = Number(inputEl.value)

  const outputEl = document.querySelector('.js-output')

  outputEl.textContent = `Придатний: ${hasExpired(productionDays, freshnessDays) ? 'так' : 'ні'}`
}

const formEl = document.querySelector('.js-form')
formEl?.addEventListener('submit', handleHasExpired)
