if (confirm('Почати тестування?')) {
  const SIZE = 10
  let ammo = parseInt(prompt('Кількість снарядів 🖍️:', '5🖍️'))
  let life = 100
  let shotsCount = 0
  let hasWon = false
  let shotX,
    tankX = Math.floor(Math.random() * (SIZE - 1))

  while (shotsCount < ammo) {
    let field = `🧱Танчики🧱
Снаряди: ${ammo - shotsCount}🖍️
Т-90: ${life}❤️
──────────────────────
🧱 1   2   3   4   5   6   7   8   9  10 🧱
🧱`

    for (let col = 0; col < SIZE; col++) {
      if (col === tankX) field += '🚜'
      else field += '〰️'
    }

    field += '🧱\n──────────────────────'

    shotX = parseInt(prompt(`${field}\nПозиція пострілу (1-${SIZE}):`, '5')) - 1

    shotsCount++

    tankX += -1 + Math.floor(Math.random() * 3)

    // Танк не може виїхати з поля
    if (tankX > SIZE - 1) tankX = SIZE - 1 - Math.floor(Math.random() * 2)
    if (tankX < 0) tankX = Math.floor(Math.random() * 2)

    if (shotX === tankX) life -= 30
    if (life < 0) {
      hasWon = true
      break
    }
  }

  if (hasWon)
    alert(
      `Ворожий Т-90 знищено! Загальна кількість пострілів: ${shotsCount}🖍️.`,
    )
  else alert('Танк прорвався!')
}
