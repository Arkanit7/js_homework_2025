'use strict'

/**
 * @param {number} from
 * @param {number} to
 */
function getRandomInteger(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

function getRandomCharacter() {
  const characters = '1234567890abcdefghijklmnopqrstuvwxyz'
  const randomIndex = getRandomInteger(0, characters.length - 1)

  return characters[randomIndex]
}

function getRandomId(size = 10) {
  let id = ''

  for (let i = 0; i < size; i++) {
    id += getRandomCharacter()
  }

  return id
}

/**
 * Calculate total sum of all values in a given form element.
 *
 * @param {SubmitEvent} e
 */
function handleSubmit(e) {
  e.preventDefault()

  const formEl = e.target
  if (!(formEl instanceof HTMLFormElement)) return

  const outputEl = formEl.elements['total-cost']
  if (!outputEl) return

  const checkedFields = formEl.querySelectorAll(':checked')
  const totalCost = [].reduce.call(
    checkedFields,
    (sum, {value}) => sum + Number(value),
    0,
  )

  outputEl.innerText = '$' + totalCost
}

class Service {
  #price

  /**
   * @param {Object} props
   * @param {string} props.label
   * @param {number} props.price
   */
  constructor({label, price}) {
    this.label = label
    this.price = price
  }

  get price() {
    return this.#price
  }

  set price(newPrice) {
    if (typeof newPrice !== 'number')
      throw new TypeError('Price must be a number.')
    if (newPrice < 0) throw new RangeError("Price can't be negative.")

    this.#price = newPrice
  }
}

class Milestone {
  /** @type {HTMLTemplateElement | null} */
  static templateEl = document.querySelector('template.js-template-milestone')

  constructor({title, transportList, cateringList, guideList}) {
    if (!Milestone.templateEl)
      throw TypeError("Can't find an HTML template to begin with.")

    this.title = title
    this.transportList = transportList
    this.cateringList = cateringList
    this.guideList = guideList
    this.milestoneEl = Milestone.templateEl.content.cloneNode(true)

    this.init()
  }

  createTransportEl({label, price}) {
    const optionEl = document.createElement('option')

    optionEl.innerText = `${label} - $${price}`
    optionEl.value = price

    return optionEl
  }

  renderTransportEl() {
    const targetEl = this.milestoneEl.querySelector('.js-select')

    for (const transport of this.transportList) {
      const transportEl = this.createTransportEl(transport)

      targetEl.append(transportEl)
    }
  }

  createCateringEl({label, price}) {
    const listEl = document.createElement('li')
    const labelEl = document.createElement('label')
    const checkboxEl = document.createElement('input')

    checkboxEl.type = 'checkbox'
    checkboxEl.value = price

    labelEl.className = 'u-flex u-gap-100'
    labelEl.append(checkboxEl, `${label} - $${price}`)

    listEl.append(labelEl)

    return listEl
  }

  renderCateringEl() {
    const targetEl = this.milestoneEl.querySelector('.js-checkbox-list')

    for (const catering of this.cateringList) {
      const cateringEl = this.createCateringEl(catering)

      targetEl.append(cateringEl)
    }
  }

  createGuideEl({label, price}, name) {
    const listEl = document.createElement('li')
    const labelEl = document.createElement('label')
    const radioEl = document.createElement('input')

    radioEl.type = 'radio'
    radioEl.value = price
    radioEl.name = name

    labelEl.className = 'u-flex u-gap-100'
    labelEl.append(radioEl, `${label} - $${price}`)

    listEl.append(labelEl)

    return listEl
  }

  renderGuideEl() {
    const targetEl = this.milestoneEl.querySelector('.js-radio-list')
    const bindingName = getRandomId()

    for (const catering of this.guideList) {
      targetEl.append(this.createGuideEl(catering, bindingName))
    }
  }

  init() {
    this.milestoneEl.querySelector('.js-title').innerText = this.title
    this.renderTransportEl()
    this.renderCateringEl()
    this.renderGuideEl()
  }

  render() {
    return this.milestoneEl
  }
}

// =============================================================================

const firstMilestone = {
  title: 'Етап №1',
  transportList: [
    new Service({label: 'Пароплав', price: 200}),
    new Service({label: 'Літак', price: 300}),
  ],
  cateringList: [
    new Service({label: 'Сніданок', price: 100}),
    new Service({label: 'Обід', price: 250}),
    new Service({label: 'Вечеря', price: 200}),
  ],
  guideList: [
    new Service({label: 'Світлана', price: 400}),
    new Service({label: 'Оксана', price: 300}),
    new Service({label: 'Іван', price: 200}),
  ],
}
const secondMilestone = {
  title: 'Етап №2',
  transportList: [
    new Service({label: 'Авто', price: 140}),
    new Service({label: 'Автобус', price: 100}),
    new Service({label: 'Літак', price: 200}),
  ],
  cateringList: [
    new Service({label: 'Сніданок', price: 200}),
    new Service({label: 'Обід', price: 120}),
    new Service({label: 'Вечеря', price: 240}),
  ],
  guideList: [
    new Service({label: 'Тарас', price: 200}),
    new Service({label: 'Петро', price: 350}),
    new Service({label: 'Христина', price: 400}),
  ],
}
const thirdMilestone = {
  title: 'Етап №3',
  transportList: [
    new Service({label: 'Авто', price: 140}),
    new Service({label: 'Потяг', price: 100}),
    new Service({label: 'Літак', price: 500}),
  ],
  cateringList: [
    new Service({label: 'Сніданок', price: 300}),
    new Service({label: 'Обід', price: 120}),
    new Service({label: 'Вечеря', price: 100}),
  ],
  guideList: [
    new Service({label: 'Злата', price: 310}),
    new Service({label: 'Марина', price: 280}),
    new Service({label: 'Богдан', price: 300}),
  ],
}

const milestones = [
  new Milestone(firstMilestone),
  new Milestone(secondMilestone),
  new Milestone(thirdMilestone),
]
const milestonesContainer = document.querySelector('.js-container-milestone')

for (const milestone of milestones) {
  milestonesContainer?.append(milestone.render())
}

// ---

const costForm = document.querySelector('.js-cost-form')

if (costForm instanceof HTMLFormElement)
  costForm.addEventListener('submit', handleSubmit)
