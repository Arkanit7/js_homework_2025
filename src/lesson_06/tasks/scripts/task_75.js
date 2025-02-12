if (confirm('Почати тестування?')) {
  const SIZE = 5
  let shotsCount = 0
  let shotX, shotY
  const shipX = Math.floor(Math.random() * SIZE)
  const shipY = Math.floor(Math.random() * SIZE)

  let row0 = 100000
  let row1 = 100000
  let row2 = 100000
  let row3 = 100000
  let row4 = 100000

  for (; shotX !== shipX || shotY !== shipY; shotsCount++) {
    let battlefield = `⚓Морський бій⚓
───────────
⚔️1  2   3   4   5
1`

    for (let col = 0; col < SIZE; col++) {
      const currentDigit = Math.floor(row0 / 10 ** col) % 10

      if (currentDigit === 0) battlefield += '🌊'
      else battlefield += '💥'
    }

    battlefield += '\n2 '

    for (let col = 0; col < SIZE; col++) {
      const currentDigit = Math.floor(row1 / 10 ** col) % 10

      if (currentDigit === 0) battlefield += '🌊'
      else battlefield += '💥'
    }

    battlefield += '\n3 '

    for (let col = 0; col < SIZE; col++) {
      const currentDigit = Math.floor(row2 / 10 ** col) % 10

      if (currentDigit === 0) battlefield += '🌊'
      else battlefield += '💥'
    }

    battlefield += '\n4 '

    for (let col = 0; col < SIZE; col++) {
      const currentDigit = Math.floor(row3 / 10 ** col) % 10

      if (currentDigit === 0) battlefield += '🌊'
      else battlefield += '💥'
    }

    battlefield += '\n5 '

    for (let col = 0; col < SIZE; col++) {
      const currentDigit = Math.floor(row4 / 10 ** col) % 10

      if (currentDigit === 0) battlefield += '🌊'
      else battlefield += '💥'
    }

    shotX =
      parseInt(prompt(`${battlefield}\nПозиція пострілу X (1-${SIZE})`, '1')) -
      1
    shotY =
      parseInt(prompt(`${battlefield}\nПозиція пострілу Y (1-${SIZE})`, '1')) -
      1

    switch (shotY) {
      case 0:
        row0 += 10 ** shotX
        break
      case 1:
        row1 += 10 ** shotX
        break
      case 2:
        row2 += 10 ** shotX
        break
      case 3:
        row3 += 10 ** shotX
        break
      case 4:
        row4 += 10 ** shotX
        break
    }
  }

  alert(`В яблучко! Загальна кількість пострілів: ${shotsCount} 💣.`)
}
