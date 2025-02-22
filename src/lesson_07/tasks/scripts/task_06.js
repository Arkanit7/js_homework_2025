if (confirm('Почати тестування?')) {
  /**
   * Build the table filled with the value
   *
   * @param {string} filling
   * @param {number} [rows=6]
   * @param {number} [columns=4]
   */
  function insertTable(filling, rows = 6, columns = 4) {
    document.write('<table>')

    for (let row = 0; row < rows; row++) {
      document.write('<tr>')

      for (let col = 0; col < columns; col++) {
        document.write(`<td>${filling}</td>`)
      }

      document.write('</tr>')
    }

    document.write('</table>')
  }

  const userMassage = prompt('Чим заповнити таблицю?', 'Кіт')

  insertTable(userMassage)
}
