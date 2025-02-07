/*
## Алгоритм
ввести кількість випадкових чисел numbersAmount
ввести мінімальне випадкове число MIN_RANDOM_NUMBER
ввести максимальне випадкове число MAX_RANDOM_NUMBER
вивести початок списку ul

повторювати numbersAmount разів
  - згенерувати випадкове число randomNumber
  - вивести randomNumber як елемент списку

вивести кінець списку ul
*/

const MIN_RANDOM_NUMBER = 1
const MAX_RANDOM_NUMBER = 100
const numbersAmount = parseInt(
  prompt('Введіть кількість випадкових чисел', '10'),
)

document.write('<ul>')

for (let i = 0; i < numbersAmount; i++) {
  const randomNumber =
    MIN_RANDOM_NUMBER +
    Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))

  document.write(`<li>${randomNumber}</li>`)
}

document.write('</ul>')
