if (confirm('Почати тестування?')) {
  const FIELD_SIZE = 10

  const ammo = parseInt(prompt('Кількість снарядів 🖍️:', '20🖍️'))
  let shotsCount = 0

  let playerLife = 100
  let tankLife = 100

  let shotX,
    tankX = Math.floor(Math.random() * (FIELD_SIZE - 1))

  for (; shotsCount < ammo && playerLife > 0 && tankLife > 0; shotsCount++) {
    // Заголовок та ігрове табло
    let field = '🧱Танчики🧱\n'
    field += `Снаряди: ${ammo - shotsCount}🖍️\n`
    field += `Ваше життя: ${playerLife}❤️\n`
    field += `Т-90: ${tankLife}🚜\n`
    field += '──────────────────────\n'
    field += '🧱 1   2   3   4   5   6   7   8   9  10 🧱\n'
    field += '🧱'

    // Побудова ігрового поля
    for (let col = 0; col < FIELD_SIZE; col++) {
      if (col === tankX) field += '🚜'
      else field += '🟫'
    }

    field += '🧱🔫\n──────────────────────'

    shotX =
      parseInt(prompt(`${field}\nПозиція пострілу (1-${FIELD_SIZE}):`, '5')) - 1
    tankX += -1 + Math.floor(Math.random() * 3)

    // Танк не може виїхати з поля
    if (tankX > FIELD_SIZE - 1)
      tankX = FIELD_SIZE - 1 - Math.floor(Math.random() * 2)
    if (tankX < 0) tankX = Math.floor(Math.random() * 2)

    // Життя танка
    if (shotX === tankX) tankLife -= 30

    // Ймовірність попадання у гармату гравця (25%)
    const tankShotX = 0 + Math.floor(Math.random() * 4)

    if (tankShotX === 0) playerLife -= 30
  }

  if (tankLife < 0)
    alert(
      `🎖️Ворожий Т-90 знищено!🎖️ 🔥🚜🔥\nЗагальна кількість пострілів: ${shotsCount}🖍️.`,
    )
  else if (playerLife < 0) alert('💥Вашу гармату знищено! 🔥🔫🔥')
  else alert('🪓 У вас закінчилися снаряди 🖍️!')
}
