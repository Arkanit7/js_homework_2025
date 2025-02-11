if (confirm('Почати тестування?')) {
  let product = 1
  let userNumber = 1

  while (userNumber !== 0) {
    product *= userNumber
    userNumber = parseFloat(prompt('Введіть число\nЩоб вийти введіть "0"', '5'))
    document.write(userNumber + ' ')
  }

  document.write(`<p>Добуток чисел = ${product}`)
}
