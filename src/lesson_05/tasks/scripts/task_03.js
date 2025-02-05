/*
## Алгоритм
ввести кількість стовпців COL_AMOUNT
відчинити тег table
відчинити тег tr
повторювати COL_AMOUNT разів
  - записати номер стовпця всередині тегу td 
зачинити тег tr
зачинити тег table
*/

const COL_AMOUNT = 7
document.write('<table>')
document.write('<tr>')

for (let i = 1; i <= COL_AMOUNT; i++) {
  document.write(`<td>${i}</td>`)
}

document.write('</tr>')
document.write('</table>')
