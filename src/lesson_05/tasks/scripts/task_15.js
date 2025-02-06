/*
## Алгоритм
ввести кількість показів measurementAmount
ввести суму температур temperatureSum
повторювати
  - ввести заміри користувача temperature
  - якщо заміри не вірні
    то
      - припинити заміри
  - вивести середню температуру
*/

if (confirm('Почати тестування?')) {
  let measurementAmount = 0
  let temperatureSum = 0

  while (true) {
    const temperature = parseFloat(prompt('Введіть температуру', '-9'))

    if (Number.isNaN(temperature)) break

    measurementAmount++
    temperatureSum += temperature
    const averageTemperature = (temperatureSum / measurementAmount).toFixed(2)

    alert(`Середня температура: ${averageTemperature}`)
  }
}
