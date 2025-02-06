/* 
## Алгоритм
ввести початковий місяць START_MONTH
ввести кінцевий місяць END_MONTH

для місяців з номерами від START_MONTH до END_MONTH
  - вивести номер місяця
*/

const START_MONTH = 3
const END_MONTH = 8

for (let i = START_MONTH; i <= END_MONTH; i++) {
  document.write(`${i}<br>`)
}
