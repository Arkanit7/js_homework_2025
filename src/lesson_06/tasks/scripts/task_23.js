if (confirm('Почати тестування?')) {
  const visitorsCount = parseInt(
    prompt('Скільки людей відвідали спортзал?', '3'),
  )
  let youngestAge = Infinity
  let oldestAge = -Infinity
  let totalAge = 0

  for (let visitorNumber = 1; visitorNumber <= visitorsCount; visitorNumber++) {
    const visitorAge = parseInt(
      prompt(`Введіть вік відвідувача №${visitorNumber}`, `${visitorNumber}`),
    )

    if (visitorAge > oldestAge) oldestAge = visitorAge
    if (visitorAge < youngestAge) youngestAge = visitorAge

    totalAge += visitorAge
  }

  document.write(`<p>Вік найстаршого відвідувача: ${oldestAge}`)
  document.write(`<p>Вік наймолодшого відвідувача: ${youngestAge}`)
  document.write(
    `<p>Середній вік відвідувачів: ${(totalAge / visitorsCount).toFixed(2)}`,
  )
}
