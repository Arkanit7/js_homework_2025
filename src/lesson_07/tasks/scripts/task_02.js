if (confirm('Почати тестування?')) {
  /**
   * Determine if the day is a weekday
   *
   * @param {number} dayNumber
   * @returns {boolean}
   */
  function isWeekday(dayNumber) {
    let result

    switch (dayNumber) {
      case 6:
      case 7:
        result = false
        break
      default:
        result = true
        break
    }

    return result
  }

  const userDayNumber = parseInt(prompt('Введіть номер дня тижня (1-7)', '7'))
  // Normalize the day number
  const normalizedUserDayNumber = ((userDayNumber - 1) % 7) + 1

  const dayType = isWeekday(normalizedUserDayNumber) ? 'робочий' : 'вихідний'

  document.write(`День №${userDayNumber} – це ${dayType} день.`)
}
