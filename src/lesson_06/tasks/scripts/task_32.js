if (confirm('Почати тестування?')) {
  let redBacteria = parseInt(prompt('Введіть кількість червоних бактерій', '1'))
  let greenBacteria = 0
  const duration = parseInt(prompt('Введіть кількість одиниць часу', '30'))

  for (let time = 1; time <= duration; time++) {
    greenBacteria += redBacteria
    redBacteria = greenBacteria - redBacteria
  }

  document.write(`Усіх бактерій: ${redBacteria + greenBacteria}`)
}
