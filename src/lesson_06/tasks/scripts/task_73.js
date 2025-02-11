if (confirm('Почати тестування?')) {
  let minNumberOne = Infinity,
    minNumberTwo = Infinity
  let priorUserNumber,
    currentUserNumber = Infinity

  do {
    priorUserNumber = currentUserNumber
    currentUserNumber = parseFloat(prompt('Введіть число', ''))

    if (currentUserNumber < minNumberOne) {
      minNumberTwo = minNumberOne
      minNumberOne = currentUserNumber
    } else if (currentUserNumber < minNumberTwo)
      minNumberTwo = currentUserNumber
  } while (Math.abs(currentUserNumber - priorUserNumber) > 5)

  document.write(`Два найменші числа: ${minNumberOne} та ${minNumberTwo}.`)
}
