if (confirm('Почати тестування?')) {
  let result = ''

  while (true) {
    const userSymbol = prompt('Введіть символ')

    if (userSymbol === 'a' || userSymbol === 'а') break

    result = userSymbol + result
  }

  document.write(`<p>Рядок символів у зворотному порядку:</p><p>${result}`)
}
