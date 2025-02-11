if (confirm('Почати тестування?')) {
  const NUMBERS_AMOUNT = 5
  let sum = 0

  for (let numberCount = 1; numberCount <= NUMBERS_AMOUNT; numberCount++) {
    sum += parseFloat(prompt('Введіть число', '6'))
  }

  document.write(`Сума ${NUMBERS_AMOUNT} чисел = ${sum}`)
}
