'use strict'

/**
 * @typedef {Object} Markup
 * @property {HTMLElement} container
 * @property {HTMLButtonElement} startButton
 * @property {HTMLButtonElement} stopButton
 * @property {HTMLButtonElement} clearButton
 */

/**
 * The Reminder class represents a singleton pattern.
 * It ensures that only one instance of the class is created and reused.
 */
class Reminder {
  /** @type {Reminder} */
  static previousReminder

  /** @type {ReturnType<typeof setInterval> | null} */
  #intervalId = null
  /** @type {number} */
  #intervalMilliseconds
  #times = 0
  #note
  #selector
  #markup = {}

  /**
   * @param {string} label
   */
  #createButton(label) {
    const button = document.createElement('button')

    button.innerText = label
    button.setAttribute('type', 'button')

    return button
  }

  #createMarkup() {
    this.#markup.container = document.querySelector(this.#selector)
    this.#markup.container.classList.add('u-flow-400')

    this.#markup.actions = document.createElement('div')
    this.#markup.actions.classList.add('u-flex', 'u-flex-wrap', 'u-gap-200')

    this.#markup.input = document.createElement('input')
    this.#markup.input.setAttribute('type', 'text')
    this.#markup.input.setAttribute('name', 'note')
    this.#markup.input.setAttribute('value', this.#note)
    this.#markup.input.addEventListener(
      'change',
      (e) => (this.note = e.target.value),
    )

    this.#markup.startButton = this.#createButton('Пуск')
    this.#markup.startButton.addEventListener('click', () => {
      this.run()
      this.#markup.startButton.disabled = true
      this.#markup.stopButton.disabled = false
    })

    this.#markup.stopButton = this.#createButton('Стоп')
    this.#markup.stopButton.disabled = true
    this.#markup.stopButton.addEventListener('click', () => {
      this.stop()
      this.#markup.startButton.disabled = false
      this.#markup.stopButton.disabled = true
    })

    this.#markup.clearButton = this.#createButton('Очистити')
    this.#markup.clearButton.addEventListener(
      'click',
      () => (this.#markup.display.innerText = null),
    )

    this.#markup.display = document.createElement('pre')
    this.#markup.display.classList =
      'u-bs-3200 u-p-200 u-flex u-flex-col-reverse u-border u-rounded-lg u-flow-200 u-overflow-auto'
  }

  #appendMarkup() {
    this.#markup.container.append(this.#markup.input, this.#markup.actions)

    this.#markup.actions.append(
      this.#markup.startButton,
      this.#markup.stopButton,
      this.#markup.clearButton,
    )

    this.#markup.container.append(this.#markup.display)
  }

  #init() {
    this.#createMarkup()
    this.#appendMarkup()
  }

  /**
   * @param {number} intervalSeconds
   * @param {string} selector
   */
  constructor(selector, note = 'Нагадування', intervalSeconds = 2) {
    if (Reminder.previousReminder) return Reminder.previousReminder

    this.#selector = selector
    this.#note = note
    this.#init()
    this.intervalSeconds = intervalSeconds
    Reminder.previousReminder = this
  }

  /**
   * @param {string} newNote
   */
  set note(newNote) {
    if (newNote.trim() === '')
      throw new Error('Нагадування не може бути порожнім.')

    this.#times = 0
    this.#note = newNote
  }

  /**
   * @param {number} newIntervalSeconds
   */
  set intervalSeconds(newIntervalSeconds) {
    if (newIntervalSeconds < 2)
      throw new Error('Мінімальний інтервал - 2 секунди.')

    this.#intervalMilliseconds = newIntervalSeconds * 1000
  }

  run() {
    if (this.#intervalId) return

    this.#intervalId = setInterval(() => {
      this.#markup.display.innerText =
        `Нагадування №${++this.#times}: ${this.#note}\n` +
        this.#markup.display.innerText
    }, this.#intervalMilliseconds)
  }

  stop() {
    if (!this.#intervalId) return

    clearInterval(this.#intervalId)
    this.#intervalId = null
    this.#times = 0
  }
}

new Reminder('#reminder', 'Купити хліба') // Singleton
