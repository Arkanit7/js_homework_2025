if (confirm('Почати тестування?')) {
  // ## Варіант 1

  // do {
  //   const userNumber = parseFloat(
  //     prompt('Введіть число, яке буде піднесено до квадрата 🔳', '17'),
  //   )

  //   alert(`${userNumber} у 🔳 = ${userNumber ** 2}`)
  // } while (confirm('Ще 🔳🔳🔳?'))

  // ## Варіант 2

  // let toContinue

  // do {
  //   const userNumber = parseFloat(
  //     prompt('Введіть число, яке буде піднесено до квадрата 🔳', '17'),
  //   )

  //   toContinue = confirm(
  //     `${userNumber} у 🔳 = ${userNumber ** 2}\nПродовжити обчислення?`,
  //   )
  // } while (toContinue)

  // ## Варіант 3 (за підказкою)

  while (true) {
    const userNumber = prompt(
      'Введіть число, яке буде піднесено до квадрата 🔳',
      '17',
    )

    // виходимо, якщо користувач натиснув "Cancel"
    if (userNumber === null) break

    alert(`${userNumber} у 🔳 = ${parseFloat(userNumber) ** 2}`)
  }
}
