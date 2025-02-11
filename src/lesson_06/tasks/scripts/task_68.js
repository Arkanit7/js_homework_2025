if (confirm('Почати тестування?')) {
  let userInput

  do {
    userInput = prompt(
      'Введіть пароль:\nПідказка: Кількість карт у колоді Таро',
    )
  } while (userInput !== '78')

  alert('Доступ надано.')
}
