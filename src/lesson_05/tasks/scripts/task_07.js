/*
## Алгоритм
ввести кількість розділів CHAPTER_AMOUNT
повторювати для кожного CHAPTER_AMOUNT
  - записати номер заголовка
  для кожної ітерації
    - записати номер розділу та параграфа
  вивести горизонтальну лінію
*/

const CHAPTER_AMOUNT = parseInt(prompt('Введіть кількість розділів', '5'))

for (let i = 1; i <= CHAPTER_AMOUNT; i++) {
  document.write(`<h1>Заголовок ${i}</h1>`)

  for (let j = 1; j <= i; j++) {
    document.write(`<p>Розділ ${i}, параграф ${j}</p>`)
  }

  document.write('<hr>')
}
