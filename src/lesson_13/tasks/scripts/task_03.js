/** @type {(board: any[][]) => any[][][]} */
function getAllTicTacToeCases(board) {
  for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
    for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
      if (board[rowIndex][colIndex] === ' ') {
        const boardClone = structuredClone(board)

        board[rowIndex][colIndex] = 0
        boardClone[rowIndex][colIndex] = 'X'

        const oBoards = getAllTicTacToeCases(board)
        const xBoards = getAllTicTacToeCases(boardClone)

        return [...oBoards, ...xBoards]
      }
    }
  }

  return [board]
}

/** @type {(board: any[][]) => boolean} */
function isValidBoard(board) {
  let [exes, zeroes] = [0, 0]
  const [exesThreshold, zeroesThreshold] = [5, 4]

  for (const row of board) {
    for (const col of row) {
      if (col === 'X') exes++
      else if (col === 0) zeroes++

      if (exes > exesThreshold || zeroes > zeroesThreshold) return false
    }
  }

  // if (exes !== zeroes && zeroes + 1 !== exes) return false

  return true
}

/** @type {(board: any[][]) => string} */
function createMarkupBoard(board) {
  let markup = '<div class="c-board">'

  for (const row of board) {
    for (const col of row) {
      let sign, color

      switch (col) {
        case 'X':
          ;[sign, color] = ['✗', 'pink']
          break
        case 0:
          ;[sign, color] = ['○', 'blue']
          break
        default:
          ;[sign, color] = [' ', 'white']
          break
      }

      markup += `
        <div class="c-board__cell">
          <span class="u-text-${color}-500">
            ${sign}
          </span>
        </div>`
    }
  }

  return (markup += '</div>')
}

const ticTacToeCase = [
  [' ', ' ', 'X'],
  [' ', ' ', 0],
  [0, 'X', ' '],
]
document.write('<p>Початкова таблиця:')
document.write(createMarkupBoard(ticTacToeCase))

const allValidBoards = getAllTicTacToeCases(ticTacToeCase).filter(isValidBoard)
console.log(allValidBoards)
document.write('<p>Можливі варіанти:')

document.write('<div class="u-flex u-flex-wrap u-gap-400">')

for (const board of allValidBoards) {
  document.write(createMarkupBoard(board))
}

document.write('</div>')
