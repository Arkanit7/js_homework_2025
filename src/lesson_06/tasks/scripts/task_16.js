if (confirm('Почати тестування?')) {
  let previousDirection, currentDirection
  let previousNumber, currentNumber

  do {
    previousNumber = currentNumber
    currentNumber = parseFloat(prompt('Введіть число', ''))

    document.write('<p>' + currentNumber)

    // Якщо число вводять перший раз - то у нас недостатньо даних для перевірок
    if (previousNumber === undefined) continue

    // Якщо послідовність стала - перервати
    if (previousNumber === currentNumber) break

    previousDirection = currentDirection
    currentDirection = currentNumber > previousNumber

    // Якщо ще не визначено напрям для порівняння (undefined), то їдемо далі
  } while (
    previousDirection === currentDirection ||
    previousDirection === undefined
  )
}
