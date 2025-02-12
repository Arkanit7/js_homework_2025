if (confirm('Почати тестування?')) {
  const SIZE = 10
  let ammo = parseInt(prompt('Кількість снарядів 🖍️:', '50🖍️'))
  let playerLife = 100
  let tankLife = 100
  let shotsCount = 0
  let hasWon = false
  let shotX,
    tankX = Math.floor(Math.random() * (SIZE - 1))

  while (shotsCount < ammo) {
    let field = `🧱Танчики🧱
    Снаряди: ${ammo - shotsCount}🖍️
    Ваше життя: ${playerLife}❤️
Т-90: ${tankLife}🚜
──────────────────────
🧱 1   2   3   4   5   6   7   8   9  10 🧱
🧱`

    for (let col = 0; col < SIZE; col++) {
      if (col === tankX) field += '🚜'
      else field += '〰️'
    }

    field += '🧱🔫\n──────────────────────'

    shotX = parseInt(prompt(`${field}\nПозиція пострілу (1-${SIZE}):`, '5')) - 1

    shotsCount++

    tankX += -1 + Math.floor(Math.random() * 3)

    // Танк не може виїхати з поля
    if (tankX > SIZE - 1) tankX = SIZE - 1 - Math.floor(Math.random() * 2)
    if (tankX < 0) tankX = Math.floor(Math.random() * 2)

    if (shotX === tankX) tankLife -= 30
    if (tankLife < 0) {
      hasWon = true
      break
    }

    const tankShotX = 0 + Math.floor(Math.random() * 4)

    if (tankShotX === 0) playerLife -= 30
    if (playerLife < 0) {
      break
    }
  }

  if (hasWon)
    alert(
      `Ворожий Т-90 знищено! Загальна кількість пострілів: ${shotsCount}🖍️.`,
    )
  else alert('Танк прорвався!')
}
