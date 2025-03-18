/** @type {(min: number, max: number) => number} */
function generateNumber(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function askQuestion() {
  const num1 = generateNumber(1, 9)
  const num2 = generateNumber(1, 9)
  const correctAnswer = num1 + num2
  const userAnswer = prompt(`Скільки буде ${num1} + ${num2}?`)

  if (userAnswer === null) {
    alert('Ви скасували тренування.')
    return null
  }

  if (parseInt(userAnswer) === correctAnswer) {
    alert('Правильно! Молодець!')
  } else {
    alert(`Неправильно. Правильна відповідь: ${correctAnswer}`)
  }
}

function startAdditionTrainer() {
  if (askQuestion() === null) return

  setTimeout(startAdditionTrainer, 10000)
}

if (confirm('Почати тестування?')) {
  startAdditionTrainer()
}
