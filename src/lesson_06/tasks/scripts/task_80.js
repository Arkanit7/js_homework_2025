// # Задача 1
// ## Варіант 1
// Скористатися правилом, що наступний елемент - це сума попереднього елемента та його діагоналі
// {
//   const SIZE = 4
//   const diagonalAmount = SIZE * 2 - 1
//   let currentNumber, previousNumber

//   document.write(`
//   <div class="c-matrix" style="grid-template-columns: repeat(${SIZE}, auto);">`)

//   for (let i = 0; i < SIZE ** 2; i++) {
//     const col = i % SIZE
//     const row = Math.floor(i / SIZE)

//     let diagonal = row + col

//     // Якщо досягнув діагоналі другої половини
//     if (diagonal > diagonalAmount / 2) diagonal = diagonalAmount - diagonal

//     // Обчислити перше число у рядку, за допомогою формули трикутних чисел
//     if (col === 0) currentNumber = ((row + 1) * (row + 2)) / 2
//     else currentNumber = previousNumber + diagonal

//     previousNumber = currentNumber

//     document.write(`
//       <div>${currentNumber}</div>`)
//   }

//   document.write('</div>')
// }

// ## Варіант 2
// Розбиває матрицю на діагоналі та для кожної з них наповнює числами
{
  document.write(`<div class="c-matrix">`)

  const SIZE = 4
  const diagonalSIZE = SIZE * 2 - 1

  for (let diagonal = 1, i = 1; diagonal <= diagonalSIZE; diagonal++) {
    for (let col = diagonal, row = 1; col >= 1 && row <= SIZE; col--, row++) {
      // Не виводить числа, які опиняються поза матрицею
      if (col > SIZE) continue

      document.write(
        `<div style="grid-row: ${row}; grid-column: ${col};">${i++}</div>`,
      )
    }
  }

  document.write(`</div>`)
}

// # Задача 2
// Розбиває матрицю на діагоналі та для кожної з них наповнює числами
{
  document.write(`<div class="c-matrix">`)

  const SIZE = 4
  const diagonalSIZE = SIZE * 2 - 1

  for (let diagonal = 1, i = 1; diagonal <= diagonalSIZE; diagonal++) {
    for (let col = diagonal, row = 1; col >= 1 && row <= SIZE; col--, row++) {
      // Не виводить числа, які опиняються поза матрицею
      if (col > SIZE) continue

      // Для непарних діагоналей міняє місцями номер колонки з номером рядка
      document.write(
        `<div style="grid-row: ${diagonal % 2 ? col : row}; grid-column: ${diagonal % 2 ? row : col};">${i++}</div>`,
      )
    }
  }

  document.write(`</div>`)
}
