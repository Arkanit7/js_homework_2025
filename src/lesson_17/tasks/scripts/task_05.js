'use strict'

/**
 * @typedef {'*' | '/' | '**' | '%' | '+' | '-'} operator
 */

/**
 * @param {number} min
 * @param {number} max
 */
function getRandomNum(min = 1, max = 9) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

/** Provides math test objects. */
class MathQuestion {
  /** @type {Object<string, (a: number, b: number) => number>} */
  static operations = {
    '+': (a, b) => a + b,
    '*': (a, b) => a * b,
    '%': (a, b) => a % b,
    '-': (a, b) => a - b,
    '/': (a, b) => a / b,
    '**': (a, b) => a ** b,
  }

  /**
   * @param {operator} operator
   */
  constructor(operator) {
    this.firstNum = getRandomNum()
    this.secondNum = getRandomNum()
    this.operation = operator
    this.correctAnswer = MathQuestion.operations[operator](
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

  toString() {
    return this.entries.map((entry) => String(entry)).join('\n')
  }
}

/** Creates an instance of a mathematical operation task. */
class TestData {
  /**
   * @param {Object} params - The parameters for the task.
   * @param {number} params.firstNum - The first number in the operation.
   * @param {number} params.secondNum - The second number in the operation.
   * @param {string} params.operation - The mathematical operation (e.g., "+", "-", "*", "/").
   * @param {string} params.userAnswer - The answer provided by the user.
   * @param {number} params.correctAnswer - The correct answer to the operation.
   */
  constructor({firstNum, secondNum, operation, userAnswer, correctAnswer}) {
    this.firstNum = firstNum
    this.secondNum = secondNum
    this.operation = operation
    this.userAnswer = userAnswer
    this.correctAnswer = correctAnswer
  }

  /** Use Number instead of parseInt to enforce strict answers */
  isCorrect() {
    return this.correctAnswer === Number(this.userAnswer)
  }

  toString() {
    return `${this.firstNum} ${this.operation} ${this.secondNum} = ${this.correctAnswer}. ${this.isCorrect() ? '✅' : '❌'} Ваша відповідь: ${this.userAnswer}.`
  }
}

/** Handles mathematical question and saves them to memory. Only one instance may be created due to a singleton pattern. */
class TestManager {
  /** @type {TestManager} */
  static #instance

  static get instance() {
    return this.#instance
  }

  /**
   * @param {string} selector - An CSS selector to identify where to render the statistics.
   * @param {operator[]} operators - An array of JS operators to use in tests.
   */
  constructor(selector, operators = ['*', '%', '+', '-', '/', '**']) {
    if (TestManager.instance) return TestManager.instance

    /** @type {HistoryManager} */
    this.history = new HistoryManager()
    this.outputElement = document.querySelector(selector)
    this.operators = operators
    TestManager.#instance = this
  }

  /** @param {operator} operation */
  askQuestion(operation) {
    const question = new MathQuestion(operation)
    const userAnswer = prompt(String(question)) ?? '-'

    this.history.save(new TestData({...question, userAnswer}))
  }

  getRandomOperation() {
    const index = getRandomNum(0, this.operators.length - 1)

    return this.operators[index]
  }

  /** @param {number} times */
  start(times, intervalSeconds = 1) {
    this.askQuestion(this.getRandomOperation())

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
          ${this.history.entries.map((entry) => `<li>${String(entry)}</li>`).join('')}
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
  const mathColloquium = new TestManager('#output', ['*', '%', '+', '-'])

  mathColloquium.start(4)
}
