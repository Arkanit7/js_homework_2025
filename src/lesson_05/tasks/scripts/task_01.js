/*
## Алгоритм
ввести кількість випадкових чисел NUMBERS_AMOUNT
ввести мінімальне випадкове число MIN_RANDOM_NUMBER
ввести максимальне випадкове число MAX_RANDOM_NUMBER
вивести початок списку ol
повторювати NUMBERS_AMOUNT разів
  - згенерувати випадкове число randomNumber
  - вивести randomNumber як елемент списку
вивести кінець списку ol
*/
const MIN_RANDOM_NUMBER = 1
const MAX_RANDOM_NUMBER = 100
const NUMBERS_AMOUNT = parseInt(
  prompt('Введіть кількість випадкових чисел', '10'),
)

document.write('<ol>')

for (let i = 0; i < NUMBERS_AMOUNT; i++) {
  const randomNumber =
    MIN_RANDOM_NUMBER +
    Math.floor(Math.random() * (MAX_RANDOM_NUMBER - MIN_RANDOM_NUMBER + 1))

  document.write(`<li>${randomNumber}</li>`)
}

document.write('</ol>')
