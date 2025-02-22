if (confirm('Почати тестування?')) {
  const SIZE = 10
  const ammo = parseInt(prompt('Кількість снарядів 🖍️:', '8🖍️'))
  let life = 100
  let shotsCount = 1
  let hasWon = false
  let shotX,
    tankX = Math.floor(Math.random() * (SIZE - 1))

  for (; shotsCount <= ammo; shotsCount++) {
    let field = `🧱Танчики🧱
Снаряди: ${ammo - shotsCount + 1}🖍️
Т-90: ${life}❤️
──────────────────────
🧱 1   2   3   4   5   6   7   8   9  10 🧱
🧱`

    for (let col = 0; col < SIZE; col++) {
      if (col === tankX) field += '🚜'
      else field += '🟫'
    }

    field += '🧱\n──────────────────────'

    shotX = parseInt(prompt(`${field}\nПозиція пострілу (1-${SIZE}):`, '5')) - 1

    tankX += -1 + Math.floor(Math.random() * 3)

    // Танк не може виїхати з поля
    if (tankX > SIZE - 1) tankX = SIZE - 1 - Math.floor(Math.random() * 2)
    if (tankX < 0) tankX = Math.floor(Math.random() * 2)

    if (shotX === tankX) life -= 30
    if (life <= 0) {
      hasWon = true
      break
    }
  }

  if (hasWon)
    alert(
      `Ворожий Т-90 знищено! Загальна кількість пострілів: ${shotsCount}🖍️.`,
    )
  else alert('Снаряди закінчилися!')
}
