if (confirm('Почати тестування?')) {
  const SIZE = 10
  let ammo = parseInt(prompt('Кількість патронів 🖍️:', '5🖍️'))
  let shotsCount = 0
  let hasWon = false
  let shotX,
    rabbitX = Math.floor(Math.random() * (SIZE - 1))

  while (shotsCount < ammo) {
    let field = `🎯Тир🎯
Патрони: ${ammo - shotsCount}🖍️
──────────────────────
🎯 1   2   3   4   5   6   7   8   9  10 🎯
🌳`

    for (let col = 0; col < SIZE; col++) {
      if (col === rabbitX) field += '🐇'
      else field += '🥦'
    }

    field += '🌳\n──────────────────────'

    shotX = parseInt(prompt(`${field}\nПозиція пострілу (1-${SIZE}):`, '5')) - 1

    shotsCount++

    rabbitX += -3 + Math.floor(Math.random() * 7)

    // Заєць не може вистрибнути з поля
    if (rabbitX > SIZE - 1) rabbitX = SIZE - 1 - Math.floor(Math.random() * 4)
    if (rabbitX < 0) rabbitX = Math.floor(Math.random() * 4)

    if (shotX === rabbitX) {
      hasWon = true
      break
    }
  }

  if (hasWon)
    alert(`В яблучко 🐰! Загальна кількість пострілів: ${shotsCount}🖍️.`)
  else alert("Заєць накивав п'ятами!🐾🐾🐾")
}
