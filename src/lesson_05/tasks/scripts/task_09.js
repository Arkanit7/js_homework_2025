/*
## Алгоритм
ввести мінімальне число MIN_RANDOM_NUMBER
ввести максимальне число MAX_RANDOM_NUMBER
оголосити випадкове число rightGuess

робити
  - згенерувати випадкове число randomNumber
доки комп'ютер не вгадає 

вивести повідомлення message
*/

if (confirm('Почати тестування?')) {
  const MIN_RANDOM_NUMBER = 0,
    MAX_RANDOM_NUMBER = 5
  let randomNumber

  alert(`Загадайте число від ${MIN_RANDOM_NUMBER} до ${MAX_RANDOM_NUMBER}`)

  do {
    randomNumber =
      MIN_RANDOM_NUMBER +
      Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))
  } while (!confirm(`Чи ваше число це – ${randomNumber}?`))

  document.write(`Я вгадав ваше число! Це - ${randomNumber}!`)
}
