/** @type {(list: any[]) => any[]} */
function fisherShuffle(list) {
  for (let i = list.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))

    ;[list[i], list[randomIndex]] = [list[randomIndex], list[i]]
  }

  return list
}

/**
 * @param {string} word - The word to start the iteration on.
 * @returns {() => string | null} A function that returns next word letter.
 */
function useWordIterator(word) {
  if (!word.length) throw new Error('The word is empty.')

  let index = 0

  return () => (index >= word.length ? null : word[index++])
}

/** @type {(correctCount: number, word: string, userLetters: string[]) => void} */
function showInfo(correctCount, word, userLetters) {
  const stats =
    correctCount === word.length
      ? '💯 Молодець, 100% вірно!'
      : `Ви вгадали ${correctCount} літер(и) з ${word.length}.`

  alert(
    `Коректне слово: ${word}\nВаше слово: ${userLetters.join('')}\n${stats}`,
  )
}

/** @type {(word: string, description: string) => number[] | null} */
function playTranslateRound(word, description) {
  const wordIterator = useWordIterator(word)
  let correctCount = 0
  const userLetters = new Array(word.length).fill('_')

  for (let i = 0; i < word.length; i++) {
    const currentLetter = wordIterator()
    const userInput = prompt(
      `🌍 Введіть наступну літеру англійською:\n💡 Опис: "${description}"\n${userLetters.join(' ')}`,
    )

    if (!userInput) return null

    const userLetter = userInput[0].toLowerCase()

    userLetters[i] = userLetter

    if (currentLetter === userLetter) correctCount++
  }

  showInfo(correctCount, word, userLetters)

  return [correctCount, word.length]
}

/** @type {(questions: string[][]) => void} */
function playTranslate(questions) {
  alert('🌎 Перекладач 🌍')

  let correctCount = 0
  let totalCount = 0

  for (const question of questions) {
    const stats = playTranslateRound(...question)

    if (!stats) break

    const [answerCorrect, answerTotal] = stats

    correctCount += answerCorrect
    totalCount += answerTotal
  }

  const successRate = totalCount === 0 ? 0 : (correctCount / totalCount) * 100

  alert(
    `𝒊 Статистика 𝒊\nВірні літери ${correctCount} з ${totalCount}\n${successRate.toFixed(2)}%`,
  )
}

const QUIZ_QUESTIONS = [
  ['apple', 'Фрукт, який зазвичай червоного або зеленого кольору.'],
  ['banana', 'Довгий жовтий фрукт, який росте на пальмі.'],
  ['car', 'Транспортний засіб з чотирма колесами.'],
  ['dog', 'Домашня тварина, найкращий друг людини.'],
  ['sun', 'Зірка, що освітлює нашу планету.'],
  ['water', 'Прозора рідина, необхідна для життя.'],
  ['book', 'Збірник друкованих або написаних сторінок з інформацією.'],
  ['computer', 'Електронний пристрій для обробки даних і програмування.'],
  ['moon', 'Небесне тіло, що обертається навколо Землі.'],
  [
    'bicycle',
    'Транспортний засіб з двома колесами, який рухається за допомогою педалей.',
  ],
  ['school', 'Місце, де діти вчаться і отримують знання.'],
  ['river', 'Великий природний потік води, що тече до океану або озера.'],
  ['coffee', 'Популярний гарячий напій, що містить кофеїн.'],
  ['chair', 'Предмет меблів, на якому можна сидіти.'],
  ['phone', 'Пристрій для здійснення дзвінків і передачі повідомлень.'],
]

if (confirm('Почати тестування?')) {
  fisherShuffle(QUIZ_QUESTIONS)
  playTranslate(QUIZ_QUESTIONS)
}
