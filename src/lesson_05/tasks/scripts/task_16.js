/*
## Алгоритм
ввести кількість робочих тижнів магазину WEEKS_AMOUNT
ввести кількість робочих днів на тиждень WORK_DAYS
оголосити прибуток totalProfit

повторити WEEKS_AMOUNT разів
  - оголосити прибуток за тиждень weekProfit
  повторювати WORK_DAYS разів
    - ввести прибуток за день dayProfit
    - збільшити тижневий прибуток weekProfit на dayProfit
  - збільшити загальний прибуток totalProfit на weekProfit
  - вивести величину прибутку weekProfit за тиждень

вивести загальний прибуток totalProfit
*/

if (confirm('Почати тестування?')) {
  const WEEKS_AMOUNT = 3
  const WORK_DAYS = 2
  let totalProfit = 0

  for (let i = 1; i <= WEEKS_AMOUNT; i++) {
    let weekProfit = 0

    for (let j = 1; j <= WORK_DAYS; j++) {
      const dayProfit = parseFloat(
        prompt(`Введіть прибуток за день №${j} тижня ${i}`, '100'),
      )
      weekProfit += dayProfit
    }

    totalProfit += weekProfit

    document.write(`<p>Прибуток за тиждень №${i} : ${weekProfit}</p>`)
  }

  document.write(`<p>Прибуток за усі тижні : ${totalProfit}</p>`)
}
