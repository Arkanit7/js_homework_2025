if (confirm('Почати тестування?')) {
  const numbersAmount = parseInt(prompt('На скільки чисел очікувати?', '4'))
  let positiveCount = 0,
    negativeCount = 0,
    neutralCount = 0

  for (let count = 1; count <= numbersAmount; count++) {
    const userNumber = parseFloat(
      prompt(`Введіть число ${count} з ${numbersAmount}`, ''),
    )

    if (userNumber > 0) positiveCount++
    else if (userNumber < 0) negativeCount++
    else neutralCount++
  }

  document.write(`<p>Кількість додатних чисел: ${positiveCount}`)
  document.write(`<p>Кількість від'ємних чисел: ${negativeCount}`)
  document.write(`<p>Кількість нулів: ${neutralCount}`)
}
