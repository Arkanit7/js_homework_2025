/*
## Алгоритм
ввести кількість рядків ROW_AMOUNT
ввести кількість стовпців COL_AMOUNT
відчинити тег table
повторювати ROW_AMOUNT разів
  - відчинити тег tr
  повторювати COL_AMOUNT разів
    - записати номер стовпця всередині тегу td 
  зачинити тег tr
зачинити тег table
*/

const ROW_AMOUNT = 7
const COL_AMOUNT = 7

document.write('<table>')

for (let i = 1; i <= ROW_AMOUNT; i++) {
  document.write('<tr>')

  for (let j = 1; j <= COL_AMOUNT; j++) {
    document.write(`<td>${j}</td>`)
  }

  document.write('</tr>')
}

document.write('</table>')
