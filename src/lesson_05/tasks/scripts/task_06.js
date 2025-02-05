/*
## Алгоритм
ввести кількість таблиць TABLES_AMOUNT
ввести кількість рядків ROW_AMOUNT
ввести кількість стовпців COL_AMOUNT
для кожної таблиці TABLES_AMOUNT
  - відчинити тег table
  - повторювати ROW_AMOUNT разів
    - відчинити тег tr
    повторювати COL_AMOUNT разів
      - ввести номер комірки cellNumber
      - записати номер комірки cellNumber всередині тегу td 
    зачинити тег tr
  - зачинити тег table
*/

const TABLE_AMOUNT = 3
const ROW_AMOUNT = 3
const COL_AMOUNT = 3

for (let i = 0; i < TABLE_AMOUNT; i++) {
  document.write('<table>')

  for (let j = 0; j < ROW_AMOUNT; j++) {
    document.write('<tr>')

    for (let k = 1; k <= COL_AMOUNT; k++) {
      const cellNumber = i * ROW_AMOUNT * COL_AMOUNT + j * COL_AMOUNT + k
      document.write(`<td>${cellNumber}</td>`)
    }

    document.write('</tr>')
  }

  document.write('</table>')
}
