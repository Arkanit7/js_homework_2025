/*
## Алгоритм
ввести кількість показів measurementAmount
ввести суму температур temperatureSum
повторювати
  - ввести заміри користувача temperature
  - вивести середню температуру
*/

if (confirm('Почати тестування?')) {
  let measurementAmount = 0
  let temperatureSum = 0

  while (true) {
    const temperature = parseFloat(prompt('Введіть температуру', '-9'))
    measurementAmount++
    temperatureSum += temperature
    const averageTemperature = (temperatureSum / measurementAmount).toFixed(2)

    alert(`Середня температура: ${averageTemperature}`)
  }
}
