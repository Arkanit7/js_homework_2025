if (confirm('Почати тестування?')) {
  /**
   * Get the name of the month by it's number
   *
   * @param {number} monthNumber integer (1 - 12)
   * @returns {string} name of the month
   */
  function getMonthName(monthNumber) {
    let monthName

    switch (monthNumber) {
      case 1:
        monthName = 'Січень'
        break
      case 2:
        monthName = 'Лютий'
        break
      case 3:
        monthName = 'Березень'
        break
      case 4:
        monthName = 'Квітень'
        break
      case 5:
        monthName = 'Травень'
        break
      case 6:
        monthName = 'Червень'
        break
      case 7:
        monthName = 'Липень'
        break
      case 8:
        monthName = 'Серпень'
        break
      case 9:
        monthName = 'Вересень'
        break
      case 10:
        monthName = 'Жовтень'
        break
      case 11:
        monthName = 'Листопад'
        break
      case 12:
        monthName = 'Грудень'
        break
    }

    return monthName
  }

  const userMonthNumber = parseInt(prompt('Введіть номер місяця (1-12)', '12'))
  // Normalize the month number
  const normalizedUserNumber = ((userMonthNumber - 1) % 12) + 1

  document.write(
    `Місяць за номером ${userMonthNumber} — це ${getMonthName(normalizedUserNumber)}.`,
  )
}
