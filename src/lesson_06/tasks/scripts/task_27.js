// ## Алгоритм Евкліда
// НСД не змінюється, якщо від більшого числа відняти менше

if (confirm('Почати тестування?')) {
  let firstInteger = parseInt(prompt('Введіть перше число', '105'))
  let secondInteger = parseInt(prompt('Введіть друге число', '252'))

  document.write(`НСД для ${firstInteger} та ${secondInteger} = `)

  while (secondInteger && firstInteger) {
    if (firstInteger > secondInteger) {
      firstInteger %= secondInteger
    } else {
      secondInteger %= firstInteger
    }
  }

  document.write(firstInteger || secondInteger)
}
