if (confirm('Почати тестування?')) {
  let previousDirection = null,
    currentDirection = null
  let previousNumber = null,
    currentNumber = null

  do {
    previousNumber = currentNumber
    currentNumber = parseFloat(prompt('Введіть число', ''))

    document.write(`<p>${currentNumber}`)

    // Якщо число вводять перший раз - то у нас недостатньо даних для перевірок
    if (previousNumber === null) continue

    // Якщо послідовність стала - перервати
    if (previousNumber === currentNumber) break

    previousDirection = currentDirection

    currentDirection = currentNumber - previousNumber > 0

    // Якщо ще визначено напрям для порівняння, то їдемо далі
  } while (previousDirection === currentDirection || previousDirection === null)
}
