if (confirm('Почати тестування?')) {
  const MIN_NUMBER = 1
  const MAX_NUMBER = 10
  let attempt = 0
  const generatedNumber =
    MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1))

  alert(`Відгадайте число від ${MIN_NUMBER} до ${MAX_NUMBER}`)

  for (let userGuess; userGuess !== generatedNumber; attempt++) {
    userGuess = parseInt(
      prompt(`Введіть число від ${MIN_NUMBER} до ${MAX_NUMBER}`, ''),
    )
  }

  document.write(`Спроб знадобилося: ${attempt}.`)
}
