if (confirm('Почати тестування?')) {
  const pupilsAmount = parseInt(prompt('Скільки у класі є учнів?', '4'))
  let heightSum = 0

  for (let pupilCount = 1; pupilCount <= pupilsAmount; pupilCount++) {
    heightSum += parseFloat(prompt(`Введіть зріст учня №${pupilCount}`, '160'))
  }

  document.write(
    `Середній зріст ${pupilsAmount} учнів: ${(heightSum / pupilsAmount).toFixed(2)}`,
  )
}
