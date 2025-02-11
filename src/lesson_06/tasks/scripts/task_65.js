if (confirm('Почати тестування?')) {
  const MENU = `
1.Ініціалізація (сума=0)
2.Додати 2
3.Додати 3
4.Відняти 2
5.Відняти 3.
6.Вивести суму
7.Вихід.
`
  const targetNumber = parseInt(prompt('Введіть цільове число', '7'))
  let sum = 0

  loop: while (true) {
    const userChoice = parseInt(
      prompt(`Цільове число: ${targetNumber}` + MENU, '1'),
    )

    switch (userChoice) {
      case 1:
        sum = 0
        break
      case 2:
        sum += 2
        break
      case 3:
        sum += 3
        break
      case 4:
        sum -= 2
        break
      case 5:
        sum -= 3
        break
      case 6:
        alert(sum)
        break
      case 7:
        break loop
      default:
        alert('Невірний вибір!')
        break
    }

    if (sum === targetNumber) {
      alert(`Вітаю, вам вдалося досягнути ваше число ${targetNumber}!`)
      break
    }
  }
}
