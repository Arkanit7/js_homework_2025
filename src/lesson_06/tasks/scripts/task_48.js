if (confirm('Почати тестування?')) {
  let money = parseFloat(prompt('Скільки грошей у Миколи?', '200'))
  const iceCreamPrice = parseFloat(
    prompt('Скільки коштує морозиво "Ласунка"?', '23'),
  )
  let count = 0

  while (money >= iceCreamPrice) {
    money -= iceCreamPrice
    count++
  }

  document.write(`Микола з'їв ${count} одиниць морозива.`)
}
