if (confirm('Почати тестування?')) {
  /**
   * @param {number} userMoney
   * @param {number[]} productsPrices
   * @param {string[]} productsTitles
   * @returns {string[]}
   */
  function getFilteredProductsTitles(
    userMoney,
    productsTitles,
    productsPrices,
  ) {
    const affordableProductTitles = []

    for (let i = 0; i < productsPrices.length; i++) {
      if (productsPrices[i] <= userMoney)
        affordableProductTitles.push(productsTitles[i])
    }

    return affordableProductTitles
  }

  /**
   * @param {string[]} productsTitles
   * @param {number[]} productsPrices
   */
  function writePriceList(productsTitles, productsPrices) {
    document.write('<ul>')

    for (let i = 0; i < productsTitles.length; i++) {
      document.write(`<li>${productsTitles[i]}: ${productsPrices[i]} грн.`)
    }

    document.write('</ul>')
  }

  const productsPrices = [1000, 60, 31, 60, 20000, 60000, 900000]
  const productsTitles = [
    'сир',
    'сік',
    'хліб',
    'масло',
    'телефон',
    "комп'ютер",
    'автомобіль',
  ]

  try {
    const userMoney = parseFloat(prompt('Введіть кількість грошей', '10000'))

    if (!isFinite(userMoney) || userMoney < 0)
      throw new Error('Wrong amount of money')

    const affordableProductTitles = getFilteredProductsTitles(
      userMoney,
      productsTitles,
      productsPrices,
    )

    document.write(`<p>Гроші: ${userMoney} грн.`)
    document.write('<p><b>Ціни:</b>')
    writePriceList(productsTitles, productsPrices)

    if (affordableProductTitles.length)
      document.write(
        `Користувач може собі дозволити: ${affordableProductTitles}`,
      )
    else document.write('На жаль, користувач немає спроможності купити щось.')
  } catch (error) {
    console.log(error)
    document.write('На жаль, трапилася помилка!')
  }
}
