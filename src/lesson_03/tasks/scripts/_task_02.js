// Крок 0. Позначення величин
// productPrice - ціна товару : number
// money - доступні гроші : number
// wantToGamble - взяти участь у лотереї : boolean
// gamblePrice - ціна участі в лотереї : number

// Крок 1. Введення даних
const gamblePrice = 4
const money = parseFloat(prompt('Введіть кількість грошей', '12000'))
const productPrice = parseFloat(prompt('Введіть ціну товару', '10000'))

// Крок 2. Обчислення
if (money < productPrice) {
  document.write('У вас недостатньо коштів!')
} else if (money - productPrice >= gamblePrice) {
  const wantToGamble = confirm(
    'Відмінний вибір! Бажаєте взяти участь в лотереї?',
  )

  if (wantToGamble)
    document.write(
      'Схоже що ви програли усі гроші так і не купивши бажаного товару...',
    )
  else document.write('Ви купили товар!')
} else {
  document.write(
    'Ви купили товар! Та схоже у вас зовсім не залишилось грошей...',
  )
}
