// const SIZE = 4
// let i = 1

// {
//   for (let col = 1; col <= SIZE; col++) {
//     // перевести i у координати row та col
//     // let row = Math.floor((i - 1) / SIZE) + 1
//     // let col = ((i - 1) % SIZE) + 1

//     for (
//       let currentCol = col, currentRow = 1;
//       currentCol >= 1 && currentRow <= SIZE;
//       currentCol--, currentRow++, i++
//     ) {
//       document.write(
//         `<div style="grid-row: ${currentRow}; grid-column: ${currentCol};">${i}</div>`,
//         `<div style="grid-row: ${SIZE + 1 - currentRow}; grid-column: ${SIZE + 1 - currentCol};">${SIZE ** 2 - i + 1}</div>`,
//       )
//     }
//   }
// }

// ## Варіант 2
document.write(`<div class="c-matrix">`)

{
  const SIZE = 4
  const diagonalSIZE = SIZE * 2 - 1

  for (let diagonal = 1, i = 1; diagonal <= diagonalSIZE; diagonal++) {
    for (let col = diagonal, row = 1; col >= 1 && row <= SIZE; col--, row++) {
      if (col > SIZE) continue

      document.write(
        `<div style="grid-row: ${row}; grid-column: ${col};">${i++}</div>`,
      )
    }
  }
}
document.write(`</div>`)

// ## Задача 2
document.write(`<div class="c-matrix u-mis-800">`)
{
  const SIZE = 4
  const diagonalSIZE = SIZE * 2 - 1

  for (let diagonal = 1, i = 1; diagonal <= diagonalSIZE; diagonal++) {
    for (let col = diagonal, row = 1; col >= 1 && row <= SIZE; col--, row++) {
      if (col > SIZE) continue

      document.write(
        `<div style="grid-row: ${diagonal % 2 ? col : row}; grid-column: ${diagonal % 2 ? row : col};">${i++}</div>`,
      )
    }
  }
}
document.write(`</div>`)
