'use strict'

/**
 * @typedef {'*' | '/' | '**' | '%' | '+' | '-'} operation
 */

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomNum(min = 1, max = 9) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/** Provides math test objects. */
class MathChecker {
  /** @type {Object<string, (a: number, b: number) => number>} */
  static operators = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '%': (a, b) => a % b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b,
  }

  /**
   * @param {operation} operation
   */
  constructor(operation) {
    this.firstNum = getRandomNum()
    this.secondNum = getRandomNum()
    this.operation = operation
    this.correctAnswer = MathChecker.operators[operation](
      this.firstNum,
      this.secondNum,
    )
  }

  toString() {
    return `${this.firstNum} ${this.operation} ${this.secondNum} = ?`
  }
}

/** Handles history */
class HistoryManager {
  /** @type {any[]} */
  #history = []

  get entries() {
    return this.#history
  }

  clear() {
    this.#history = []
  }

  /** @param {any} value */
  save(value) {
    this.#history.push(value)
  }

  /** @param {any} value */
  delete(value) {
    const indexOfValue = this.#history.indexOf(value)

    if (indexOfValue !== -1) this.#history.splice(indexOfValue, 1)
  }
}

/** Creates an instance of a mathematical operation task. */
class TestData {
  /**
   * @param {Object} params - The parameters for the task.
   * @param {number} params.firstNum - The first number in the operation.
   * @param {number} params.secondNum - The second number in the operation.
   * @param {string} params.operation - The mathematical operation (e.g., "+", "-", "*", "/").
   * @param {number} params.userAnswer - The answer provided by the user.
   * @param {number} params.correctAnswer - The correct answer to the operation.
   */
  constructor({firstNum, secondNum, operation, userAnswer, correctAnswer}) {
    this.firstNum = firstNum
    this.secondNum = secondNum
    this.operation = operation
    this.userAnswer = userAnswer
    this.correctAnswer = correctAnswer
  }

  isCorrect() {
    return this.correctAnswer === this.userAnswer
  }

  toString() {
    return `${this.firstNum} ${this.operation} ${this.secondNum} = ${this.correctAnswer}. ${this.isCorrect() ? '✅' : '❌'} Ваша відповідь: ${this.userAnswer}.`
  }
}

/** Handles mathematical question and saves them to memory. Only one instance may be created due to a singleton pattern. */
class TestManager {
  /** @type {TestManager} */
  static #instance
  /** @type {operation[]} */
  static #operations = ['*', '%', '+', '-']

  static get instance() {
    return this.#instance
  }

  /**
   * @param {string} selector - An CSS selector to identify where to render the statistics.
   */
  constructor(selector) {
    if (TestManager.instance) return TestManager.instance

    /** @type {HistoryManager} */
    this.history = new HistoryManager()
    this.outputElement = document.querySelector(selector)
    TestManager.#instance = this
  }

  /** @param {operation} operation */
  askQuestion(operation) {
    const question = new MathChecker(operation)
    const userAnswer = parseInt(prompt(String(question)) ?? '')

    this.history.save(new TestData({...question, userAnswer}))
  }

  askRandomQuestion() {
    const randomOperationIndex = getRandomNum(
      0,
      TestManager.#operations.length - 1,
    )
    const randomOperation = TestManager.#operations[randomOperationIndex]

    this.askQuestion(randomOperation)
  }

  /** @param {number} times */
  start(times, intervalSeconds = 1) {
    this.askRandomQuestion()

    if (times <= 1) {
      this.renderStatsMarkup()

      return
    }

    setTimeout(() => {
      this.start(times - 1, intervalSeconds)
    }, intervalSeconds * 1000)
  }

  getStatsMarkup() {
    return `
      <div class="u-p-200 u-border u-rounded-lg u-flow-200">
        <h3>Приклади 📊</h3>
        <ol>
          ${this.history.entries.map((entry) => `<li>${entry}</li>`).join('')}
        </ol>
      </div>
    `
  }

  renderStatsMarkup() {
    if (!this.outputElement)
      throw new Error("Can't find an HTML container to insert statistics.")

    this.outputElement.innerHTML = this.getStatsMarkup()
  }
}

// ---

if (confirm('Почати тестування?')) {
  const mathColloquium = new TestManager('#output')

  mathColloquium.start(4)
}
