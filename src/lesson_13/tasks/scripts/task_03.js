/** @type {(board: string[][], result?: string[][][]) => string[][][]} */
function getAllTicTacToeCases(board, result = []) {
  for (let curRow = 0; curRow < board.length; curRow++) {
    for (let curCol = 0; curCol < board[curRow].length; curCol++) {
      if (board[curRow][curCol] === ' ') {
        // Explore an option with 'X'
        board[curRow][curCol] = 'X'
        getAllTicTacToeCases(board, result)

        // Explore an option with 'O'
        board[curRow][curCol] = 'O'
        getAllTicTacToeCases(board, result)

        // Backtrack to the initial option
        board[curRow][curCol] = ' '

        return result
      }
    }
  }

  result.push(structuredClone(board))

  return result
}

/** @type {(board: string[][]) => boolean} */
function isValidBoard(board) {
  let [x, o] = [0, 0]

  for (const row of board) {
    for (const col of row) {
      if (col === 'X') x++
      else if (col === 'O') o++
    }
  }

  if (x !== o && o + 1 !== x) return false

  return true
}

/** @type {(board: string[][]) => string} */
function createMarkupBoard(board) {
  let markup = '<div class="c-board">'

  for (const row of board) {
    for (const col of row) {
      let sign, color

      switch (col) {
        case 'X':
          ;[sign, color] = ['✗', 'pink']
          break
        case 'O':
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
  [' ', ' ', 'O'],
  ['O', ' ', ' '],
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
