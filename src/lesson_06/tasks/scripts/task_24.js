if (confirm('Почати тестування?')) {
  let capital = parseFloat(prompt('Стартовий капітал:', '180000'))
  const increaseRate = parseFloat(prompt('Щомісячний відсоток, %:', '4%')) / 100
  const targetMoney = parseFloat(
    prompt('Цільова сума (на купівлю магазина):', '3696000'),
  )
  let monthCount = 1

  document.write(`<p>Стартовий капітал: ${capital}`)
  document.write(`<p>Місячний інтерес: ${increaseRate}`)
  document.write(`<p>Цільова сума: ${targetMoney}`)

  while (capital < targetMoney) {
    capital *= 1 + increaseRate
    monthCount++
  }

  document.write(`<p>Вам знадобиться місяців: ${monthCount};`)
  document.write(`<p>Прогнозована сума: ${capital.toFixed(2)}.`)
}
