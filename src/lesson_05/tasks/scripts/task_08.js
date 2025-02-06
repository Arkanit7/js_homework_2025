/*
## Алгоритм
ввести кількість спроб комп'ютера ATTEMPTS
ввести мінімальне число MIN_RANDOM_NUMBER
ввести максимальне число MAX_RANDOM_NUMBER
оголосити чи користувач вгадав rightGuess 

повторювати для ATTEMPTS
  - ввести випадкове число randomNumber
  - запитати користувача чи вгадав rightGuess
  - якщо відповідь вірна
    то
      - припинити цикл

якщо rightGuess
  то
    - переможне повідомлення
  інакше
    - невтішне повідомлення
*/

if (confirm('Почати тестування?')) {
  const ATTEMPTS = 3
  const MIN_RANDOM_NUMBER = 0,
    MAX_RANDOM_NUMBER = 5
  let rightGuess

  alert(`Загадайте число від ${MIN_RANDOM_NUMBER} до ${MAX_RANDOM_NUMBER}`)

  for (let i = 0; i < ATTEMPTS; i++) {
    const randomNumber =
      MIN_RANDOM_NUMBER +
      Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))
    rightGuess = confirm(`Чи ваше число це – ${randomNumber}?`)

    if (rightGuess) break
  }

  if (rightGuess) document.write(`Я вгадав ваше число!`)
  else document.write(`Мені не вдалося вгадати ваше число.`)
}
