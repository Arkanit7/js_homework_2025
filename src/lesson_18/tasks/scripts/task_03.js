'use strict'

/**
 * @param {number} from
 * @param {number} to
 */
function getRandomNumber(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

function getRandomCharacter() {
  const characters = '1234567890abcdefghijklmnopqrstuvwxyz'
  const randomIndex = getRandomNumber(0, characters.length - 1)

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
 * Create element using an HTML string, that represent it.
 *
 * @param {string} markup
 */
function createElementFromMarkup(markup) {
  const template = document.createElement('template')

  template.innerHTML = markup

  return template.content.firstElementChild
}

// =============================================================================

class AgeWidget {
  #outputEl
  #widgetEl

  /**
   * @param {string} cssSelector
   */
  constructor(cssSelector) {
    this.#outputEl = document.querySelector(cssSelector)

    if (!this.#outputEl)
      throw new Error("Can't find the HTML element to output to.")

    this.#init()
  }

  #getMarkup() {
    const id = getRandomId()

    return `
      <form class="u-p-400 u-rounded-lg u-border u-border-zinc-700 u-flow-400">
        <h3 class="u-text-400 u-font-bolder">Обчислення віку</h3>
        <ul class="u-flow-300">
          <li class="u-grid u-gap-100">
            <label class="u-font-bolder" for="${id}">Рік народження</label>
            <input class="c-input" id="${id}" type="date" min="1900-01-01" name="year">
          </li>
          <li class="u-grid u-gap-100">
            <span class="u-font-bolder">Вік</span>
            <output for="${id}" name="age">0</output>
          </li>
        </ul>
      </form>
    `
  }

  #buildUI() {
    this.#widgetEl = createElementFromMarkup(this.#getMarkup())
  }

  /**
   * @param {Date} birthDate
   */
  #calculateAge(birthDate) {
    const today = new Date()

    if (Number.isNaN(Number(birthDate))) return 0

    let age = today.getFullYear() - birthDate.getFullYear()

    // Check if birthday hasn't occurred yet this year
    const birthDateThisYear = structuredClone(birthDate)

    birthDateThisYear.setFullYear(today.getFullYear())

    if (birthDateThisYear > today) age--

    return age
  }

  #attachEventListener() {
    const inputEl = this.#widgetEl.elements.year
    const outputEl = this.#widgetEl.elements.age

    inputEl.addEventListener('input', () => {
      const birthDate = new Date(inputEl.value)

      outputEl.innerText = this.#calculateAge(birthDate)
    })
  }

  #appendUI() {
    this.#outputEl.append(this.#widgetEl)
  }

  #init() {
    this.#buildUI()
    this.#attachEventListener()
    this.#appendUI()
  }
}

// =============================================================================

function createAddWidget() {
  const markup = `
  <div 
    class="
      u-p-400
      u-rounded-lg
      u-border
      u-border-zinc-700
      u-flow-400
      js-add-widget
      u-grid
      u-place-items-center
    "
  >
    <button
      class="u-text-800 u-font-bolder u-leading-none"
      type="button"
    >
      +
    </button>
  </div>
`

  const addWidget = createElementFromMarkup(markup)
  const addWidgetBtn = addWidget.querySelector('button')
  const widgetsContainer = document.querySelector('.js-widgets')

  addWidgetBtn.addEventListener('click', () => {
    new AgeWidget('.js-widgets')
    widgetsContainer.append(addWidget)
  })

  return addWidget
}

// =============================================================================

try {
  const widgetsContainer = document.querySelector('.js-widgets')
  const addWidget = createAddWidget()

  new AgeWidget('.js-widgets')
  widgetsContainer.append(addWidget)
} catch (error) {
  console.error(error)
}
