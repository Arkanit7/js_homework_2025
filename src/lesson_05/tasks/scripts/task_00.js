/*
## Алгоритм
ввести кількість кнопок BUTTONS_AMOUNT

повторювати BUTTONS_AMOUNT разів
  - вивести HTML кнопку з текстом "Hello"
*/

const BUTTONS_AMOUNT = 8

for (let i = 0; i < BUTTONS_AMOUNT; i++) {
  document.write('<button type="button">Hello</button>')
}
