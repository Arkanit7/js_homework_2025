/*
## Алгоритм
ввести кількість показів MEASUREMENT_AMOUNT
ввести суму температур temperatureSum

повторювати MEASUREMENT_AMOUNT разів
  - ввести заміри користувача temperature

обчислити середню температуру averageTemperature

вивести середню температуру averageTemperature
*/

if (confirm('Почати тестування?')) {
  const MEASUREMENT_AMOUNT = 12
  let temperatureSum = 0

  for (let i = 1; i <= MEASUREMENT_AMOUNT; i++) {
    const temperature = parseFloat(
      prompt(`Введіть температуру за місяць №${i}`, '9'),
    )
    temperatureSum += temperature
  }

  const averageTemperature = temperatureSum / MEASUREMENT_AMOUNT

  document.write(
    `Середня температура за ${MEASUREMENT_AMOUNT} місяців - ${averageTemperature.toFixed(2)}°C`,
  )
}
