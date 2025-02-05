/*
## Алгоритм
мінімальне число MIN_RANDOM_NUMBER
максимальне число MAX_RANDOM_NUMBER
чи вгадав rightGuess

робити
  - ввести випадкове число randomNumber
  - записати у змінну відповідь користувача
доки комп'ютер не вгадає rightGuess 

вивести повідомлення message
*/

if (confirm('Почати тестування?')) {
  const MIN_RANDOM_NUMBER = 0,
    MAX_RANDOM_NUMBER = 5
  let rightGuess

  alert(`Загадайте число від ${MIN_RANDOM_NUMBER} до ${MAX_RANDOM_NUMBER}`)

  do {
    const randomNumber =
      MIN_RANDOM_NUMBER +
      Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))
    rightGuess = confirm(`Чи ваше число це – ${randomNumber}?`)
  } while (!rightGuess)

  document.write(`Я вгадав ваше число!`)
}
