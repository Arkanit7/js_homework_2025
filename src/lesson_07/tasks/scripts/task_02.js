if (confirm('Почати тестування?')) {
  /**
   * Determine if the day is a weekday
   *
   * @param {number} dayNumber
   * @returns {boolean}
   */
  function isWeekday(dayNumber) {
    return dayNumber !== 6 && dayNumber !== 7
  }

  const userDayNumber = parseInt(prompt('Введіть номер дня тижня (1-7)', '7'))
  // Normalize the day number
  const normalizedUserDayNumber = ((userDayNumber - 1) % 7) + 1

  const dayType = isWeekday(normalizedUserDayNumber) ? 'робочий' : 'вихідний'

  document.write(`День №${userDayNumber} – це ${dayType} день.`)
}
