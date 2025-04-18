'use strict'

class Calculator {
  static operators = ['*', '%', '/', '+', '-', '**']

  /**
   * @param {HTMLElement} primaryDisplayEl
   * @param {HTMLElement} secondaryDisplayEl
   */
  constructor(primaryDisplayEl, secondaryDisplayEl) {
    if (
      !(
        primaryDisplayEl instanceof HTMLElement &&
        secondaryDisplayEl instanceof HTMLElement
      )
    )
      throw new TypeError(
        `Invalid display elements passed to the ${Calculator.constructor.name}`,
      )

    this.primaryDisplayEl = primaryDisplayEl
    this.secondaryDisplayEl = secondaryDisplayEl
  }

  /**
   * @returns {string} The text content of the primary display element.
   */
  get primaryExpression() {
    return this.primaryDisplayEl.innerText
  }

  /** @param {string} newExpression */
  set primaryExpression(newExpression) {
    this.primaryDisplayEl.innerText = newExpression
  }

  /** @param {string} newExpression */
  set secondaryExpression(newExpression) {
    this.secondaryDisplayEl.innerText = newExpression
  }

  /**
   * @param {string} character
   */
  isOperator(character) {
    return Calculator.operators.includes(character)
  }

  /**
   * @param {string} character
   */
  isDoubleOperator(character) {
    const lastCharacter = this.primaryExpression.at(-1)

    if (this.isOperator(lastCharacter) && this.isOperator(character))
      return true

    return false
  }

  /**
   * @param {string} character
   */
  appendCharacter(character) {
    if (this.isDoubleOperator(character)) this.removeCharacter()

    this.primaryExpression += character
  }

  removeCharacter() {
    this.primaryExpression = this.primaryExpression.slice(0, -1)
  }

  clear() {
    this.primaryExpression = ''
    this.secondaryExpression = ''
  }

  compute() {
    if (!this.primaryExpression) return

    this.secondaryExpression = this.primaryExpression

    try {
      this.primaryExpression = eval(this.primaryExpression)
    } catch (error) {
      this.primaryExpression = 'Error'
      console.error(error)
    }
  }
}

// =============================================================================

try {
  const primaryDisplayEl = document.querySelector('.js-primary-display')
  const secondaryDisplayEl = document.querySelector('.js-secondary-display')
  const calculator = new Calculator(primaryDisplayEl, secondaryDisplayEl)

  const digitBtns = document.querySelectorAll('[data-char]')
  digitBtns?.forEach((btn) =>
    btn.addEventListener('click', () =>
      calculator.appendCharacter(btn.dataset.char),
    ),
  )

  const delBtn = document.querySelector('[data-del]')
  delBtn?.addEventListener('click', () => calculator.removeCharacter())

  const clearBtn = document.querySelector('[data-clear]')
  clearBtn?.addEventListener('click', () => calculator.clear())

  const equalBtn = document.querySelector('[data-equal]')
  equalBtn?.addEventListener('click', () => calculator.compute())
} catch (error) {
  console.error(error)
}
