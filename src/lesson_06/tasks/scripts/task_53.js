// let count = 0
// let sum = 0

// do {
//   sum += parseFloat(prompt('Введіть число', '40'))
//   count++
// } while (sum <= 100)

// document.write(`Ви ввели ${count} чисел, аж доки не досягли ${sum} у сумі.`)

let count = 0

for (let sum = 0; sum <= 100; count++) {
  sum += parseFloat(prompt('Введіть число', '40'))
}

document.write(`Ви ввели ${count} чисел, поки не перевищили 100 у сумі.`)
