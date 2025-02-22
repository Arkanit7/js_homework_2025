/*
## Алгоритм
ввести ширину поля fieldColumns
ввести висоту поля fieldRows
ввести кількість снарядів shotsLeft
згенерувати випадковий номер рядка корабля shipX
згенерувати випадковий номер стовпця корабля shipY

повторювати shotsLeft разів
  - запитувати користувача у яку колонку shotX стрілятимемо
  - запитувати користувача у яких ряд shotY стрілятимемо
  - якщо постріл рівний позиції корабля
      то
        - вводимо вітальне повідомлення
        - припиняємо цикл
*/

if (confirm('Почати тестування?')) {
  const fieldRows = parseInt(prompt('Кількість рядків поля:', '2'))
  const fieldColumns = parseInt(prompt('Кількість стовпців поля:', '2'))
  const shotsLeft = parseInt(prompt('Введіть кількість снарядів', '4'))
  const shipX = 1 + Math.floor(Math.random() * (fieldColumns - 1 + 1))
  const shipY = 1 + Math.floor(Math.random() * (fieldRows - 1 + 1))

  for (let i = shotsLeft; i > 0; i--) {
    const shotX = parseInt(
      prompt(`В яку колонку стрілятимемо? [1, ${fieldColumns}]`, '1'),
    )
    const shotY = parseInt(
      prompt(`В який ряд стрілятимемо? [1, ${fieldRows}]`, '1'),
    )

    if (shotX === shipX && shotY === shipY) {
      alert('Ви поцілили у корабель!')
      break
    }

    alert('Промах!')
  }
}
