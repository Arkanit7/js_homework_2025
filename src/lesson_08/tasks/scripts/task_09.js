if (confirm('Почати тестування?')) {
  /**
   * Shuffles an array using the Fisher-Yates algorithm.
   *
   * @param {string[]} array The array to shuffle.
   * @returns {string[]} The shuffled array.
   */
  function fisherShuffle(array) {
    // const array = [...array]

    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = array[i]

      array[i] = array[j]
      array[j] = temp
    }

    return array
  }

  /**
   * Creates a game field with a specified size and number of ships.
   *
   * @param {number} size The size of the game field.
   * @param {number} shipsAmount The number of ships to place on the field.
   * @returns {string[]} The game field with ships placed.
   */
  function createBattleField(size, shipsAmount) {
    const field = []

    // create the field
    for (let i = 0; i < shipsAmount; i++) field.push('ship')
    for (let i = shipsAmount; i < size; i++) field.push('water')

    return fisherShuffle(field)
  }

  /**
   * Prompts the user to set the game values.
   *
   * @returns {[number, number]} The field length and ships amount.
   * @throws Will throw an error if the input values are not valid.
   */
  function initBattleShip() {
    const fieldLength = parseInt(
      prompt('Введіть розмір ігрового поля 🌊', '10'),
    )

    if (!isFinite(fieldLength) || fieldLength < 1)
      throw new Error('Field length must be a natural number')

    const shipsAmount = parseInt(
      prompt(`Введіть кількість ворожих кораблів (0-${fieldLength}) 🚢`, '4'),
    )

    if (!isFinite(shipsAmount) || shipsAmount < 1 || shipsAmount > fieldLength)
      throw new Error('Incorrect ships amount')

    return [fieldLength, shipsAmount]
  }

  /**
   * Renders the game field using emojis.
   *
   * @param {string[]} gameField The game field to render.
   * @returns {string} The rendered game field as a string.
   */
  function getRenderedField(gameField) {
    let render = ''

    for (let i = 0; i < gameField.length; i++) {
      const tile = gameField[i]

      if (tile === 'shot') render += '💥'
      else if (tile === 'lifeboat') render += '🚣‍♂️'
      else if (tile === 'destroyed') render += '🔥'
      else render += '🌊'
    }

    return render
  }

  /**
   * Simulates a battleship game.
   */
  function playBattleShip() {
    alert('⚓ Морський бій ⚓')

    let [fieldLength, shipsAmount] = initBattleShip()
    const gameField = createBattleField(fieldLength, shipsAmount)

    while (shipsAmount) {
      const fieldRender = getRenderedField(gameField)
      let message = `Введіть позицію пострілу 🚀 (1-${fieldLength})`

      message += '\n' + fieldRender

      const shotPosition = parseInt(prompt(message, '1')) - 1

      // check what we've hit
      switch (gameField[shotPosition]) {
        case 'ship':
          gameField[shotPosition] = 'lifeboat'
          shipsAmount--
          alert(`Корабель знищено! 🔥\nЗалишилося кораблів ${shipsAmount}🚢.`)
          break

        case 'lifeboat':
          gameField[shotPosition] = 'destroyed'
          alert('Рятувального човна знищено...')
          break
        case 'water':
        case 'destroyed':
        case 'shot':
          gameField[shotPosition] = 'shot'
          alert('Промах! 🌊')
          break
        default:
          throw new Error('Invalid shot position')
      }
    }

    alert('Вітаємо! Всі кораблі потоплені! 🔱')
  }

  try {
    playBattleShip()
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}
