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
   * Cipher nice name to a number.
   * @param {number} tile - original name
   * @returns {string} - ciphered code
   * @throws If couldn't recognize – get en error.
   */
  function cipherTile(tile) {
    let cipher

    switch (tile) {
      case 'water':
        cipher = 0
        break
      case 'ship':
        cipher = 1
        break
      case 'lifeboat':
        cipher = 2
        break
      case 'destroyed':
        cipher = 3
        break
      case 'shot':
        cipher = 4
        break
      default:
        throw new Error("Unknown tile's name!")
    }

    return cipher
  }

  /**
   * Recognize the number and get a fancy name.
   * @param {number} tile - ciphered name
   * @returns {string} - original name
   * @throws If couldn't recognize – get en error.
   */
  function decipherTile(tile) {
    let decipher

    switch (tile) {
      case 0:
        decipher = 'water'
        break
      case 1:
        decipher = 'ship'
        break
      case 2:
        decipher = 'lifeboat'
        break
      case 3:
        decipher = 'destroyed'
        break
      case 4:
        decipher = 'shot'
        break
      default:
        throw new Error("Unknown tile's cipher!")
    }

    return decipher
  }

  /**
   * Creates a game field with a specified size and number of ships.
   * The game field itself consist of numbers that represent tile names.
   * Numbers are preferred over names 'cause they use less memory.
   * @param {number} size The size of the game field.
   * @param {number} shipsAmount The number of ships to place on the field.
   * @returns {string[]} The game field with ships placed.
   */
  function createBattleField(size, shipsAmount) {
    const field = []

    // create the field
    for (let i = 0; i < shipsAmount; i++) field.push(cipherTile('ship'))
    for (let i = shipsAmount; i < size; i++) field.push(cipherTile('water'))

    return fisherShuffle(field)
  }

  /**
   * Renders the game field using emojis.
   *
   * @param {string[]} gameField The game field to render.
   * @returns {string} The rendered game field as a string.
   * @throws If couldn't render – get en error.
   */
  function getRenderedField(gameField) {
    let render = ''

    for (let i = 0; i < gameField.length; i++) {
      const tile = decipherTile(gameField[i])

      switch (tile) {
        case 'water':
        case 'ship':
          render += '🌊'
          break
        case 'shot':
          render += '💥'
          break
        case 'lifeboat':
          render += '🚣‍♂️'
          break
        case 'destroyed':
          render += '🔥'
          break
        default:
          throw new Error("Can't render the game filed.")
      }
    }

    return render
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
   * Fire shot at the given position and see what've happened :D
   * @param {number} shotPosition - Integer representing one of the game field indexes
   * @param {number[]} gameField - Game field itself
   * @param {number} shipsAmount - Amount of the ships before the shot
   * @returns {number} Amount of the ships after the shot
   * @throws If you can't aim – get en error.
   */
  function fireShot(shotPosition, gameField, shipsAmount) {
    const shotLandedAt = decipherTile(gameField[shotPosition])

    switch (shotLandedAt) {
      case 'ship':
        gameField[shotPosition] = cipherTile('lifeboat')
        shipsAmount--
        alert(`Корабель знищено! 🔥\nЗалишилося кораблів ${shipsAmount}🚢.`)
        break
      case 'lifeboat':
        gameField[shotPosition] = cipherTile('destroyed')
        alert('Рятувального човна знищено...')
        break
      case 'water':
      case 'destroyed':
      case 'shot':
        gameField[shotPosition] = cipherTile('shot')
        alert('Промах! 🌊')
        break
      default:
        throw new Error('Invalid shot position')
    }

    return shipsAmount
  }

  /**
   * Show the battlefield to a user and ask where to hit next.
   * @param {number[]} gameField
   * @returns {number} Shot position
   */
  function fancyAksShotPosition(gameField) {
    const fieldRender = getRenderedField(gameField)
    let message = `Введіть позицію пострілу 🚀 (1-${gameField.length})`

    message += '\n' + fieldRender

    return parseInt(prompt(message, '1')) - 1
  }

  /**
   * Simulates a battleship game.
   */
  function playBattleShip() {
    alert('⚓ Морський бій ⚓')

    let [fieldLength, shipsAmount] = initBattleShip()
    const gameField = createBattleField(fieldLength, shipsAmount)

    while (shipsAmount) {
      const shotPosition = fancyAksShotPosition(gameField)
      // check what we've hit
      shipsAmount = fireShot(shotPosition, gameField, shipsAmount)
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
