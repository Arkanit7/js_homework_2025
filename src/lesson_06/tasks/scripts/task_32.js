if (confirm('Почати тестування?')) {
  let redBacteria = parseInt(prompt('Введіть кількість червоних бактерій', '1'))
  let greenBacteria = 0
  const duration = parseInt(prompt('Введіть кількість одиниць часу', '40'))

  for (let time = 1; time <= duration; time++) {
    const newGreenBacteria = greenBacteria + redBacteria
    const newRedBacteria = greenBacteria

    greenBacteria = newGreenBacteria
    redBacteria = newRedBacteria
  }

  document.write(`Усіх бактерій: ${redBacteria + greenBacteria}`)
}
