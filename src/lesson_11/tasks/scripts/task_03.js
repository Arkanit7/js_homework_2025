// @ts-check
'use strict'

/**
 * Names for the game field tiles.
 * @typedef {'water' | 'ship' | 'shot' | 'hit' | 'island' | 'whale'} Tile
 */

const DIGITS_EMOJI = [
  '🅞',
  '❶',
  '❷',
  '❸',
  '❹',
  '❺',
  '❻',
  '❼',
  '❽',
  '❾',
  '❿',
  '⑪',
  '⑫',
  '⑬',
  '⑭',
  '⑮',
  '⑯',
  '⑰',
  '⑱',
  '⑲',
  '⑳',
]

/**
 * @param {number} [minNumber]
 * @param {number} [maxNumber]
 * @returns {number}
 */
function generateRandomNumber(minNumber = 0, maxNumber = 10) {
  return Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber)
}

/**
 * Deciphers a numeric code into a corresponding tile name.
 *
 * @param {number} code - The numeric code representing a tile.
 * @returns {Tile} The deciphered tile name.
 * @throws {Error} Throws an error if the code is not recognized.
 */
function decipherTile(code) {
  /** @type {Tile} */
  let decipher

  switch (code) {
    case 0:
      decipher = 'water'
      break
    case 1:
      decipher = 'ship'
      break
    case 2:
      decipher = 'shot'
      break
    case 3:
      decipher = 'hit'
      break
    case 4:
      decipher = 'island'
      break
    case 5:
      decipher = 'whale'
      break
    default:
      throw new Error(`Can't recognize "${code}" as a code for the tile.`)
  }

  return decipher
}

/**
 * The opposite for the decipherTile function.
 *
 * @param {Tile} name - The name representing a tile.
 * @returns {number} The ciphered tile code.
 * @throws {Error} Throws an error if the name is not recognized.
 */
function cipherTile(name) {
  let cipher

  switch (name) {
    case 'water':
      cipher = 0
      break
    case 'ship':
      cipher = 1
      break
    case 'shot':
      cipher = 2
      break
    case 'hit':
      cipher = 3
      break
    case 'island':
      cipher = 4
      break
    case 'whale':
      cipher = 5
      break
    default:
      throw new Error(`Can't recognize "${name}" as a name for the tile.`)
  }

  return cipher
}

/**
 * Renders a visual representation of a game tile.
 *
 * @param {Tile} tile - The type of the game tile.
 * @returns {string} The visual representation of the game tile.
 * @throws {Error} Throws an error if the tile type is not recognized.
 */
function renderTile(tile) {
  let render

  switch (tile) {
    case 'water':
    case 'ship':
      render = '🌊'
      break
    case 'shot':
      render = '💥'
      break
    case 'hit':
      render = '♨️'
      break
    case 'island':
      render = '🏝️'
      break
    case 'whale':
      render = '🐋'
      break
    default:
      throw new Error(`Can't render game tile "${tile}".`)
  }

  return render
}

/**
 * Creates a game field with the specified number of rows and columns.
 * Each cell in the field is initialized with a 'water' tile.
 *
 * @param {number} [rows=6] - The number of rows in the game field.
 * @param {number} [columns=6] - The number of columns in the game field.
 * @returns {number[][]} A 2D array representing the game field.
 */
function createGameField(rows = 6, columns = 6) {
  return Array.from({length: rows}, () =>
    new Array(columns).fill(cipherTile('water')),
  )
}

/**
 * Fills the game field with a specified amount of tiles.
 *
 * @param {Tile} tile - The name of the game tile to put.
 * @param {number[][]} gameField - The game field represented as a 2D array.
 * @param {number} [amount=5] - The number of tiles to place on the game field.
 */
function fillGameFieldWithObjects(tile, gameField, amount = 5) {
  const rows = gameField.length - 1
  const cols = gameField[0].length - 1

  while (amount) {
    const row = generateRandomNumber(0, rows)
    const col = generateRandomNumber(0, cols)

    if (gameField[row][col] !== cipherTile('water')) continue

    gameField[row][col] = cipherTile(tile)
    amount--
  }
}

/**
 * Generates a string of emojis representing a numbered row.
 *
 * @param {number} length - The number of emojis to include in the row.
 * @returns {string} The generated string of emojis.
 */
function renderMarkupRow(length) {
  let render = '⚓'

  for (let i = 1; i <= length; i++) {
    render += DIGITS_EMOJI[i] ?? '🔢'
  }

  return render
}

/**
 * Renders the game field as a string.
 *
 * @param {number[][]} gameField - A 2D array representing the game field.
 * @returns {string} The rendered game field as a string.
 */
function renderGameField(gameField) {
  const cols = gameField[0].length

  let render = renderMarkupRow(cols) + '\n'

  gameField.forEach((row, i) => {
    render += DIGITS_EMOJI[i + 1] ?? '🔢'

    row.forEach((col) => {
      render += renderTile(decipherTile(col))
    })

    render += '\n'
  })

  return render
}

/**
 * Renders the statistics of ships and shots.
 *
 * @param {number} shipsAmount - The number of ships.
 * @param {number} shotsAmount - The number of shots.
 * @returns {string} A string displaying the number of ships and shots with corresponding emojis.
 */
function renderStats(shipsAmount, shotsAmount) {
  return `Снаряди: ${shotsAmount}🖍️ Кораблі: ${shipsAmount}🛳️`
}

/**
 * Renders the game screen by combining the game field and statistics.
 *
 * @param {number[][]} gameField - A 2D array representing the game field.
 * @param {number} shipsAmount - The number of ships remaining.
 * @param {number} shotsAmount - The number of shots taken.
 * @returns {string} The rendered game screen as a string.
 */
function renderScreen(gameField, shipsAmount, shotsAmount) {
  let render = ''

  render += renderGameField(gameField)
  render += renderStats(shipsAmount, shotsAmount)

  return render
}

/**
 * Handles a shot in the game by updating the field and checking for hits.
 *
 * @param {number} row - The row index of the shot.
 * @param {number} col - The column index of the shot.
 * @param {number[][]} field - The game field represented as a 2D array.
 * @param {number} shipsAmount - The current number of ships remaining.
 * @returns {number} - The updated number of ships remaining.
 * @throws {Error} - Throws an error if the shot coordinates are not valid.
 */
function handleShot(row, col, field, shipsAmount) {
  if (
    row < 0 ||
    col < 0 ||
    Number.isNaN(row) ||
    Number.isNaN(col) ||
    row >= field.length ||
    col >= field[row].length
  )
    throw new Error(`${row} & ${col} are not valid shot coordinates.`)

  if (field[row][col] === cipherTile('ship')) {
    shipsAmount--
    field[row][col] = cipherTile('hit')
    alert('🚀 Попадання!')
  } else {
    field[row][col] = cipherTile('shot')
  }

  return shipsAmount
}

/**
 * Prompts the user to input coordinates for a shot in the game.
 *
 * @param {number[][]} gameField - The current state of the game field.
 * @param {number} shipsAmount - The total number of ships in the game.
 * @param {number} shotsAmount - The total number of shots taken so far.
 * @returns {[number, number] | null} An array containing the X and Y coordinates of the shot.
 */
function renderScreenGetShotPosition(gameField, shipsAmount, shotsAmount) {
  const screen = renderScreen(gameField, shipsAmount, shotsAmount)
  const shotY = prompt(`${screen}\n🔭 Введіть координати ряду: 🎯`, '1')

  if (shotY === null) return null

  const shotX = prompt(`${screen}\n🔭 Введіть координати колонки: 🎯`, '1')

  if (shotX === null) return null

  return [parseInt(shotY) - 1, parseInt(shotX) - 1]
}

/**
 * Simulates a game of Sea Battle.
 *
 * @param {number} rows - The number of rows in the game field.
 * @param {number} cols - The number of columns in the game field.
 * @param {number} shipsAmount - The initial number of ships in the game.
 * @param {number} shotsAmount - The initial number of shots available to the player.
 */
function playSeaBattle(rows, cols, shipsAmount, shotsAmount) {
  const gameField = createGameField(rows, cols)

  fillGameFieldWithObjects('whale', gameField, 2)
  fillGameFieldWithObjects('island', gameField, 10)
  fillGameFieldWithObjects('ship', gameField, shipsAmount)

  alert('⚔️ Морський Бій V3.0 ⚔️')

  while (shipsAmount && shotsAmount >= shipsAmount) {
    const shotPosition = renderScreenGetShotPosition(
      gameField,
      shipsAmount,
      shotsAmount,
    )

    // exit the game if the user press 'cancel'
    if (shotPosition === null) return

    shipsAmount = handleShot(...shotPosition, gameField, shipsAmount)
    shotsAmount--
  }

  if (shipsAmount) alert('🖍️ Поразка. У вас недостатньо снарядів... 🖍️')
  else alert('🎖️ Перемога! 🎖️')
}

try {
  if (confirm('Почати тестування?')) {
    playSeaBattle(6, 6, 5, 20)
  }
} catch (error) {
  console.log(error)
  alert('❌ Критична помилка!')
}
