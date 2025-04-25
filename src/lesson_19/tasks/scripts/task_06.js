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
 * @param {string} templateSelector
 * @param {string} name
 */
function createAthleteFromTemplate(templateSelector, name) {
  const template = document.querySelector(templateSelector)

  if (!(template instanceof HTMLTemplateElement))
    throw new TypeError("Can't find the template.")

  const athleteEl = template.content.firstElementChild.cloneNode(true)

  const nameEl = athleteEl.querySelector('.js-athlete-name')
  nameEl.textContent = name

  return athleteEl
}

const athletesList = [
  'Білостоцький Ростислав',
  'Ковальчук Анастасія',
  'Коб Тетяна',
  'Власенко Ілля',
  'Баланюк Владислав',
  'Ковтун Ігор',
  'Огородник Андрій',
  'Корець Вероніка',
]

try {
  for (const athlete of athletesList) {
    generalAthletesList.append(
      createAthleteFromTemplate('.js-athlete-template', athlete),
    )
  }
} catch (error) {
  console.error(error)
}
