if (confirm('Почати тестування?')) {
  let maxNumberOne = -Infinity,
    maxNumberTwo = -Infinity
  let priorUserNumber,
    currentUserNumber = -Infinity

  do {
    priorUserNumber = currentUserNumber
    currentUserNumber = parseFloat(prompt('Введіть число', ''))

    if (currentUserNumber > maxNumberOne) {
      maxNumberTwo = maxNumberOne
      maxNumberOne = currentUserNumber
    } else if (currentUserNumber > maxNumberTwo)
      maxNumberTwo = currentUserNumber
  } while (Math.abs(currentUserNumber - priorUserNumber) > 5)

  document.write(`Два найбільші числа: ${maxNumberOne} та ${maxNumberTwo}.`)
}
