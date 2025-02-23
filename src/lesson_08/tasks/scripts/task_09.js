if (confirm('Почати тестування?')) {
  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   *
   * @param {number[]} array The array to shuffle.
   * @returns {number[]} The shuffled array.
   */
  function fisherShuffle(array) {
    const arrayCopy = [...array]

    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = arrayCopy[i]

      arrayCopy[i] = arrayCopy[j]
      arrayCopy[j] = temp
    }

    return arrayCopy
  }

  /**
   * Creates a game field with a specified size and number of ships.
   *
   * @param {number} size The size of the game field.
   * @param {number} shipsAmount The number of ships to place on the field.
   * @returns {number[]} The game field with ships placed.
   */
  function createGameField(size, shipsAmount) {
    const field = []

    // create the field
    for (let i = 0; i < shipsAmount; i++) field.push(1)
    for (let i = shipsAmount; i < size; i++) field.push(0)

    return fisherShuffle(field)
  }

  /**
   * Checks if the input is a valid number within the specified range.
   *
   * @param {number} input The input to check.
   * @param {number} min The minimum valid value.
   * @param {number} max The maximum valid value.
   * @throws Will throw an error if the input is not valid.
   */
  function checkInput(input, min, max) {
    if (!isFinite(input) || input < min || input >= max)
      throw new Error('Invalid shot position')
  }

  /**
   * Simulates a battleship game.
   *
   * @param {number[]} field The game field.
   * @param {number} shipsAmount The number of ships to destroy.
   */
  function battleShip(field, shipsAmount) {
    const fieldLength = field.length

    while (shipsAmount) {
      const shotPosition =
        parseInt(prompt(`Введіть позицію пострілу (1-${fieldLength})`, '')) - 1

      checkInput(shotPosition, 0, fieldLength)

      if (field[shotPosition]) {
        field[shotPosition] = 0
        shipsAmount--
        alert(`Корабель знищено! Залишилося кораблів ${shipsAmount}`)
      } else {
        alert('Промах!')
      }
    }
  }

  try {
    alert('Морський бій')

    const fieldLength = parseInt(prompt('Введіть розмір ігрового поля', '10'))

    if (!isFinite(fieldLength) || fieldLength < 1)
      throw new Error('Field length must be a natural number')

    const shipsAmount = parseInt(
      prompt(`Введіть кількість ворожих кораблів (0-${fieldLength})`, '4'),
    )

    if (!isFinite(shipsAmount) || shipsAmount < 1 || shipsAmount > fieldLength)
      throw new Error('Incorrect ships amount')

    const field = createGameField(fieldLength, shipsAmount)

    battleShip(field, shipsAmount)
    alert('Перемога!')
  } catch (error) {
    alert(error)
    console.log(error)
    document.write('На жаль, трапилася помилка!')
  }
}
