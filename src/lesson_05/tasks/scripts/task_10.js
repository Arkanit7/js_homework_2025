/*
## Алгоритм
ввести мінімальне число minNumber
ввести максимальне число maxNumber
ввести суму непарних чисел totalSum

для чисел між minNumber та maxNumber
  - якщо число є непарним
    то
      - сумувати його з totalSum

вивести totalSum
*/

if (confirm('Почати тестування?')) {
  const minNumber = parseInt(prompt('Введіть найменше число', '-5'))
  const maxNumber = parseInt(
    prompt(`Введіть число більше за ${minNumber}`, '99'),
  )
  let totalSum = 0

  for (let i = minNumber + 1; i < maxNumber; i++) if (i % 2 !== 0) totalSum += i

  document.write(
    `Сума непарних чисел на інтервалі (${minNumber}, ${maxNumber}) = ${totalSum}`,
  )
}
