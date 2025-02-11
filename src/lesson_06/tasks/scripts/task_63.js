if (confirm('Почати тестування?')) {
  let numberN = parseFloat(prompt('Введіть число N', '-9'))
  let numberM = parseFloat(prompt('Введіть число M', '17'))

  while (numberN <= numberM) {
    document.write(`<p>${numberN++} --- ${numberM--}`)
  }
}
