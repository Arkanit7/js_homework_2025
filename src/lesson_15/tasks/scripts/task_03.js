'use strict'

/** @type {(from: number, to: number) => number} */
function generateIntegerInRange(from, to) {
  return from + Math.floor(Math.random() * (to - from + 1))
}

/**
 * A class for conducting multiplication quizzes. It generates multiplication
 * questions, checks user answers, and provides statistics on performance.
 */
class MultChecker {
  /** @param {number} primaryNumber - A number to conduct quizzes with. */
  constructor(primaryNumber) {
    this.primaryNumber = primaryNumber
    this.correctAnswers = 0
    this.incorrectAnswers = 0
  }

  /**
   * Generates a multiplication question and its correct answer.
   *
   * @param {number} [from=1] - The min value for the second number.
   * @param {number} [to=9] - The max value for the second number.
   * @returns {{ question: string, answer: number }} An object containing the
   * question as a string and the correct answer as a number.
   */
  getQuestion(from = 1, to = 9) {
    const secondaryNumber = generateIntegerInRange(from, to)

    return {
      question: `Скільки буде ${this.primaryNumber} x ${secondaryNumber}?`,
      answer: this.primaryNumber * secondaryNumber,
    }
  }

  /** @type {(userAnswer: number, correctAnswer: number) => void } */
  checkAnswer(userAnswer, correctAnswer) {
    if (userAnswer === correctAnswer) {
      this.correctAnswers++
      alert('Вірно!')
    } else {
      this.incorrectAnswers++
      alert(`Ні, це буде ${correctAnswer}.`)
    }
  }

  /**
   * Executes a quiz session specified number of times.
   * After, it renders statistics.
   *
   * @param {number} times - The number of questions to ask in the quiz session.
   */
  makeQuiz(times) {
    for (let i = 0; i < times; i++) {
      const { question, answer } = this.getQuestion()
      const userAnswer = parseInt(prompt(question) ?? '0')

      this.checkAnswer(userAnswer, answer)
    }

    this.render()
  }

  render() {
    document.write(`
      <div class="u-p-200 u-border u-rounded-lg u-flow-200">
        <h3>Статистика</h3>
        <ul>
          <li>📊 Усього прикладів: ${this.correctAnswers + this.incorrectAnswers}</li>
          <li>✅ Правильних відповідей: ${this.correctAnswers}</li>
          <li>❌ Неправильних відповідей: ${this.incorrectAnswers}</li>
        </ul>
      </div>
    `)
  }
}

if (confirm('Почати тестування?')) {
  const hardMultiplicationQuiz = new MultChecker(9)

  hardMultiplicationQuiz.makeQuiz(3)
}
