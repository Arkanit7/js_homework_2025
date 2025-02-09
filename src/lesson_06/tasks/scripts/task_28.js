if (confirm('Почати тестування?')) {
  const dayStartHour = parseInt(
    prompt('О котрій годині починається навчальний день? (0 - 23)', '8'),
  )
  const dayStartMinute = parseInt(
    prompt(`О ${dayStartHour} годині та скільки хвилин? (0-59)`, '30'),
  )
  const lessonDurationMinutes = parseInt(
    prompt('Яка тривалість уроку, у хвилинах?', '45'),
  )
  const recessDurationMinutes = parseInt(
    prompt('А тривалість перерви, у хвилинах?', '15'),
  )
  const lessonAmount = parseInt(prompt('Кількість уроків?', '6'))

  let currentHour = dayStartHour
  let currentMinute = dayStartMinute

  for (let lessonCount = 1; lessonCount <= lessonAmount; lessonCount++) {
    document.write(
      `<p>Урок №${lessonCount} ${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')} - `,
    )
    currentMinute += lessonDurationMinutes
    currentHour += Math.floor(currentMinute / 60)
    currentHour %= 24
    currentMinute %= 60

    document.write(
      `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
    )

    currentMinute += recessDurationMinutes
    currentHour += Math.floor(currentMinute / 60)
    currentHour %= 24
    currentMinute %= 60
  }
}
