'use strict'

class Counter {
  inputClicks = 0
  buttonClicks = 0
  inputCounterEl
  buttonCounterEl

  /**
   * @param {string} inputCounterSelector
   * @param {string} buttonCounterSelectorEl
   */
  constructor(inputCounterSelector, buttonCounterSelectorEl) {
    this.inputCounterEl = document.querySelector(inputCounterSelector)
    this.buttonCounterEl = document.querySelector(buttonCounterSelectorEl)

    if (!this.inputCounterEl || !this.buttonCounterEl)
      throw new ReferenceError("Can't find counter HTML elements.")

    this.updateCounters()
  }

  updateCounters() {
    this.inputCounterEl.textContent = String(this.inputClicks)
    this.buttonCounterEl.textContent = String(this.buttonClicks)
  }

  /**
   * @param {Event} e
   */
  handleInteractions({target}) {
    if (target.closest('button')) this.buttonClicks++
    else if (target.closest('input')) this.inputClicks++

    this.updateCounters()
  }
}

try {
  const counter = new Counter('.js-input-counter', '.js-button-counter')
  const container = document.querySelector('.js-app')

  container.addEventListener('click', counter.handleInteractions.bind(counter))
} catch (error) {
  console.error(error)
}
