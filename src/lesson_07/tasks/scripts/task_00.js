if (confirm('Почати тестування?')) {
  /**
   * Determine the season by the number of the month
   *
   * @param {number} monthNumber integer (1 - 12)
   * @returns {string} the name of the month
   */
  function getSeasonName(monthNumber) {
    let seasonName

    if (monthNumber <= 2 || monthNumber === 12) seasonName = 'зима'
    else if (monthNumber <= 5) seasonName = 'весна'
    else if (monthNumber <= 8) seasonName = 'літо'
    else seasonName = 'осінь'

    return seasonName
  }

  const userMonthNumber = parseInt(prompt('Введіть номер місяця (1-12)', '12'))
  // Normalize the month number
  const normalizedUserNumber = ((userMonthNumber - 1) % 12) + 1

  document.write(
    `Місяць за номером ${userMonthNumber} — це ${getSeasonName(normalizedUserNumber)}.`,
  )
}
