/*
## Алгоритм
ввести максимальну кількість сумацій MAX_ADDITIONS
ввести поточну кількість сумацій additions
ввести мінімальне число minNumber
ввести максимальне число maxNumber
ввести суму непарних чисел totalSum

для чисел між minNumber та maxNumber
  - якщо число сумацій additions досягло ліміту MAX_ADDITIONS
    то
      - перериваємо цикл
  - перевірити чи число є непарним
    то
      - сумувати його з totalSum

вивести totalSum
*/

if (confirm('Почати тестування?')) {
  const MAX_ADDITIONS = 5
  let additions = 0
  let totalSum = 0
  const minNumber = parseInt(prompt('Введіть найменше число', '-5'))
  const maxNumber = parseInt(
    prompt(`Введіть число більше за ${minNumber}`, '99'),
  )

  for (let i = minNumber + 1; i < maxNumber; i++) {
    if (additions === MAX_ADDITIONS) break

    if (i % 2 !== 0) {
      totalSum += i
      additions++
    }
  }

  document.write(
    `Сума максимум п'яти непарних чисел на інтервалі (${minNumber}, ${maxNumber}) = ${totalSum}`,
  )
}
