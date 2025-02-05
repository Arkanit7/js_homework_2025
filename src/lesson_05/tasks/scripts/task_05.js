/*
## Алгоритм
ввести кількість рядків ROW_AMOUNT
ввести кількість стовпців COL_AMOUNT
відчинити тег table
повторювати ROW_AMOUNT разів
  - відчинити тег tr
  повторювати COL_AMOUNT разів
    - ввести номер комірки cellNumber
    - записати номер комірки cellNumber всередині тегу td 
  зачинити тег tr
зачинити тег table
*/

const ROW_AMOUNT = 3
const COL_AMOUNT = 3

document.write('<table>')

for (let i = 0; i < ROW_AMOUNT; i++) {
  document.write('<tr>')

  for (let j = 1; j <= COL_AMOUNT; j++) {
    const cellNumber = i * COL_AMOUNT + j
    document.write(`<td>${cellNumber}</td>`)
  }

  document.write('</tr>')
}

document.write('</table>')
