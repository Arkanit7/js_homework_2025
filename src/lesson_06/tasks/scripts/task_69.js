if (confirm('Почати тестування?')) {
  const productPrice = parseFloat(prompt('Вартість кросівок', '3299грн'))
  let bought = false

  while (true) {
    const clientMoney = parseFloat(
      prompt(
        `Кросівки коштують ${productPrice}грн\nСкільки заплатити?`,
        '2000грн',
      ) ?? 0,
    )

    if (clientMoney >= productPrice) {
      bought = true
      break
    }

    const tryAgain = confirm(
      `${clientMoney}грн замало!\nВи дійсно хочете нові кросівки?`,
    )

    if (!tryAgain) break
  }

  if (bought) document.write(`Нові кросівки ваші!`)
  else document.write(`Схоже, що нові кросівки, не дуже вам то й потрібні...`)
}
