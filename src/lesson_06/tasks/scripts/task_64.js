if (confirm('Почати тестування?')) {
  const MENU = `
  1. Сказати «Привіт». 
  2. Сказати «Зачекай». 
  3. Сказати «До побачення». 
  4. Вихід.`

  loop: while (true) {
    const userChoice = parseInt(prompt(MENU, '1'))

    switch (userChoice) {
      case 1:
        alert('Привіт')
        break
      case 2:
        alert('Зачекай')
        break
      case 3:
        alert('До побачення')
        break
      case 4:
        break loop
      default:
        alert('Невірний вибір!')
        break
    }
  }
}
