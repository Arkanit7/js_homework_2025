'use strict'

/**
 * The Reminder class represents a singleton pattern.
 * It ensures that only one instance of the class is created and reused.
 */
class Reminder {
  /** @type {Reminder} */
  static #instance

  static get instance() {
    return Reminder.#instance
  }

  /** @type {ReturnType<typeof setInterval> | null} */
  #intervalId
  /** @type {number} */
  #intervalMilliseconds
  #times = 0
  /** @type {string} */
  #note

  /**
   * @param {string} note - A note to remind of.
   * @param {number} intervalSeconds - An interval between remainders.
   */
  constructor(note, intervalSeconds = 1) {
    if (Reminder.instance) return Reminder.instance

    this.note = note
    this.intervalSeconds = intervalSeconds
    Reminder.#instance = this
  }

  /** @param {number} newIntervalSeconds */
  set intervalSeconds(newIntervalSeconds) {
    if (newIntervalSeconds < 1)
      throw new Error('Мінімальний інтервал - 1 секунда.')

    this.#intervalMilliseconds = newIntervalSeconds * 1000
  }

  /** @param {string} newNote */
  set note(newNote) {
    if (newNote.trim() === '')
      throw new Error('Нагадування не може бути порожнім.')

    this.#note = newNote
  }

  start() {
    if (this.#intervalId) return

    this.#intervalId = setInterval(() => {
      console.log(`Нагадування №${++this.#times}\n${this.#note}`)
    }, this.#intervalMilliseconds)
  }

  pause() {
    if (!this.#intervalId) return

    clearInterval(this.#intervalId)
    this.#intervalId = null
  }

  stop() {
    this.pause()
    this.#times = 0
  }

  toString() {
    return `Нагадування: ${this.#note}, активне: ${this.#intervalId ? 'так' : 'ні'}.`
  }
}

// ---

new Reminder('Вигуляти собаку 🐶')
const secondNote = new Reminder('Пропилососити', 2) // will return previous instance

secondNote.start()
console.log(String(secondNote))

setTimeout(() => {
  secondNote.note = 'Купити хліба 🍞'
  console.log(String(secondNote))
}, 6e3)

setTimeout(() => {
  secondNote.pause()
  secondNote.intervalSeconds = 2
  secondNote.start()
  secondNote.note = 'Оплатити комуналку 💵'
  console.log(String(secondNote))
}, 1e4)

setTimeout(() => {
  secondNote.stop()
  console.log(String(secondNote))
}, 2e4)
