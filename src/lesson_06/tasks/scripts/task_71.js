if (confirm('Почати тестування?')) {
  const MIN_NUMBER = 1
  const MAX_NUMBER = 10
  let attempt = 0
  const number1 =
    MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1))
  const number2 =
    MIN_NUMBER + Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1))

  document.write(`<p>Перше число: ${number1}`)
  document.write(`<p>Друге число: ${number2}`)

  alert(`Відгадайте два числа від ${MIN_NUMBER} до ${MAX_NUMBER}`)

  // спочатку обидва числа приховані hidden = true
  for (
    let number1Hidden = true, number2Hidden = true;
    number1Hidden || number2Hidden;
    attempt++
  ) {
    const userGuess = parseInt(
      prompt(`Введіть число від ${MIN_NUMBER} до ${MAX_NUMBER}`, ''),
    )

    // якщо число приховане, а ми його знайшли
    if (number1Hidden && userGuess === number1) {
      number1Hidden = false // то воно більше неприховане :D
      alert(`Ви вгадали число ${number1}!`)
    }

    // якщо число приховане, а ми його знайшли
    if (number2Hidden && userGuess === number2) {
      number2Hidden = false // то воно більше неприховане :D
      alert(`Ви вгадали число ${number2}!`)
    }
  }

  document.write(`<p>Спроб знадобилося: ${attempt}.`)
}
