'use strict'

/**
 * @param {Event} e
 */
function moveToChosen({target}) {
  const athleteBtn = target.closest('.js-athlete-move')

  if (!athleteBtn) return

  athleteBtn.classList.remove('u-text-green-500')
  athleteBtn.classList.add('u-text-red-500', 'u-flip')

  const chosenListEl = document.querySelector('.js-chosen-athletes')
  const athleteEl = target.closest('.js-athlete')

  chosenListEl?.append(athleteEl)
}

/**
 * @param {Event} e
 */
function moveToGeneral({target}) {
  const athleteBtn = target.closest('.js-athlete-move')

  if (!athleteBtn) return

  athleteBtn.classList.remove('u-text-red-500', 'u-flip')
  athleteBtn.classList.add('u-text-green-500')

  const chosenListEl = document.querySelector('.js-general-athletes')
  const athleteEl = target.closest('.js-athlete')

  chosenListEl?.append(athleteEl)
}

const generalAthletesList = document.querySelector('.js-general-athletes')
generalAthletesList?.addEventListener('click', moveToChosen)

const chosenAthletesList = document.querySelector('.js-chosen-athletes')
chosenAthletesList?.addEventListener('click', moveToGeneral)

// =============================================================================

/**
 * @param {string} name
 */
function createAthlete(name) {
  const template = document.querySelector('.js-athlete-template')

  if (!template) throw new ReferenceError("Can't find athlete template.")

  const athleteEl = template.content.firstElementChild.cloneNode(true)

  const nameEl = athleteEl.querySelector('.js-athlete-name')
  nameEl.textContent = name

  return athleteEl
}

const athletes = [
  'Білостоцький Ростислав',
  'Ковальчук Анастасія',
  'Коб Тетяна',
  'Власенко Ілля',
  'Баланюк Владислав',
  'Ковтун Ігор',
  'Огородник Андрій',
  'Корець Вероніка',
]

for (const athlete of athletes) {
  generalAthletesList?.append(createAthlete(athlete))
}
