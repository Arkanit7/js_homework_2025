if (confirm('Почати тестування?')) {
  const dayStartAt = parseFloat(
    prompt('Коли починається навальний день, у годинах?', '8.5'),
  )
  const lessonDuration =
    parseFloat(prompt('Яка тривалість уроку, у хвилинах?', 45)) / 60
  const lessonAmount = parseFloat(prompt('Кількість уроків?', '6'))

  let time = dayStartAt

  for (let lessonCount = 1; lessonCount < lessonAmount; lessonCount++) {
    document.write(`<p>Урок №${lessonCount} ${time.toFixed(2)} - `)
    time += lessonDuration
    document.write(`${time.toFixed(2)}`)
  }

  document.write(`<p>Вчимося без жодних перерв! :D`)
}
