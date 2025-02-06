/*
## Алгоритм
кількість спроб комп'ютера ATTEMPTS
мінімальне число MIN_RANDOM_NUMBER
максимальне число MAX_RANDOM_NUMBER
повідомлення до користувача message

повторювати для ATTEMPTS
  - ввести випадкове число randomNumber
  - запитати користувача чи вірне число
  - якщо відповідь вірна
    то
      - записати переможне повідомлення message
      - припинити цикл
    інакше
      - записати невтішне повідомлення message
      
вивести message
*/

if (confirm('Почати тестування?')) {
  const ATTEMPTS = 3
  const MIN_RANDOM_NUMBER = 0,
    MAX_RANDOM_NUMBER = 5
  let message

  alert(`Загадайте число від ${MIN_RANDOM_NUMBER} до ${MAX_RANDOM_NUMBER}`)

  for (let i = 0; i < ATTEMPTS; i++) {
    const randomNumber =
      MIN_RANDOM_NUMBER +
      Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))
    const rightGuess = confirm(`Чи ваше число це – ${randomNumber}?`)

    if (rightGuess) {
      message = `Я вгадав ваше число ${randomNumber}!`
      break
    } else message = `Мені не вдалося вгадати ваше число.`
  }

  document.write(message)
}
