if (confirm('Почати тестування?')) {
  let sum = -1
  let userNumber = 1

  while (userNumber !== 0) {
    sum += userNumber
    userNumber = parseFloat(prompt('Введіть число\nЩоб вийти введіть "0"', '5'))
    document.write(userNumber + ' ')
  }

  document.write(`<p>Сума чисел = ${sum}`)
}
