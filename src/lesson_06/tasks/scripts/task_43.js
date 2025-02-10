// ## Варіант 1

// if (confirm('Почати тестування?')) {
//   const hayMowerAmount = parseInt(prompt('Кількість сінокосарок', '12'))
//   const firstHayMowerTime = parseInt(
//     prompt('Скільки хвилин працювала перша сінокосарка?', '480'),
//   )
//   const ADDITIONAL_MINUTES = 10
//   const totalTimeMinutes =
//     firstHayMowerTime + ADDITIONAL_MINUTES * (hayMowerAmount - 1)

//   document.write(`${Math.floor(totalTimeMinutes / 60)} годин працювала бригада`)
// }

// ## Варіант 2

if (confirm('Почати тестування?')) {
  const hayMowerAmount = parseInt(prompt('Кількість сінокосарок', '12'))
  const firstHayMowerMinutes = parseInt(
    prompt('Скільки хвилин працювала перша сінокосарка?', '30'),
  )
  const ADDITIONAL_MINUTES = 10
  let totalTime = 0

  for (
    let hayMowerCount = 1, currentHayMowerMinutes = firstHayMowerMinutes;
    hayMowerCount <= hayMowerAmount;
    hayMowerCount++, currentHayMowerMinutes += ADDITIONAL_MINUTES
  ) {
    totalTime += currentHayMowerMinutes
  }

  document.write(
    `Загалом ${Math.floor(totalTime / 60)} годин працювала бригада.`,
  )
}
